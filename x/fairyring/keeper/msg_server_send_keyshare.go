package keeper

import (
	distIBE "DistributedIBE"
	"context"
	"encoding/hex"
	"fairyring/x/fairyring/types"
	"fmt"
	"math"
	"strconv"

	"github.com/drand/kyber"
	bls "github.com/drand/kyber-bls12381"
	"github.com/drand/kyber/pairing"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func parseKeyShareCommitment(
	suite pairing.Suite,
	keyShareHex string,
	commitmentHex string,
	index uint32,
	id string,
) (*distIBE.ExtractedKey, *distIBE.Commitment, error) {
	newByteKey, err := hex.DecodeString(keyShareHex)
	if err != nil {
		return nil, nil, types.ErrDecodingKeyShare.Wrap(err.Error())
	}

	newSharePoint := suite.G2().Point()
	err = newSharePoint.UnmarshalBinary(newByteKey)
	if err != nil {
		return nil, nil, types.ErrUnmarshallingKeyShare.Wrap(err.Error())
	}

	newByteCommitment, err := hex.DecodeString(commitmentHex)
	if err != nil {
		return nil, nil, types.ErrDecodingCommitment.Wrap(err.Error())
	}

	newCommitmentPoint := suite.G1().Point()
	err = newCommitmentPoint.UnmarshalBinary(newByteCommitment)
	if err != nil {
		return nil, nil, types.ErrUnmarshallingCommitment.Wrap(err.Error())
	}

	newExtractedKey := distIBE.ExtractedKey{
		Sk:    newSharePoint,
		Index: index,
	}

	newCommitment := distIBE.Commitment{
		Sp:    newCommitmentPoint,
		Index: index,
	}

	hG2, ok := suite.G2().Point().(kyber.HashablePoint)
	if !ok {
		return nil, nil, types.ErrUnableToVerifyShare
	}

	Qid := hG2.Hash([]byte(id))

	if !distIBE.VerifyShare(suite, newCommitment, newExtractedKey, Qid) {
		return nil, nil, types.ErrInvalidShare
	}

	return &newExtractedKey, &newCommitment, nil
}

func parseToExtractedKey(suite pairing.Suite, keyShareHex string, index uint32) (*distIBE.ExtractedKey, error) {
	newByteKey, err := hex.DecodeString(keyShareHex)
	if err != nil {
		return nil, types.ErrDecodingKeyShare.Wrap(err.Error())
	}

	newSharePoint := suite.G2().Point()
	err = newSharePoint.UnmarshalBinary(newByteKey)
	if err != nil {
		return nil, types.ErrUnmarshallingKeyShare.Wrap(err.Error())
	}

	return &distIBE.ExtractedKey{
		Sk:    newSharePoint,
		Index: index,
	}, nil
}

func parseToHex(key distIBE.ExtractedKey) (string, error) {
	skByte, err := key.Sk.MarshalBinary()
	if err != nil {
		return "", err
	}
	skHex := hex.EncodeToString(skByte)
	return skHex, nil
}

func aggregate(suite pairing.Suite, shares []distIBE.ExtractedKey) kyber.Point {
	shareIndexes := make([]uint32, len(shares))
	processed := make([]kyber.Point, len(shares))
	for i, v := range shares {
		shareIndexes[i] = v.Index
	}
	for i, v := range shares {
		lagrangeCoef := distIBE.LagrangeCoefficient(suite, v.Index, shareIndexes)
		identityKey := v.Sk.Mul(lagrangeCoef, v.Sk)
		processed[i] = identityKey
	}

	aggregatePoint := processed[0]
	for _, v := range processed {
		if v != aggregatePoint {
			aggregatePoint.Add(aggregatePoint, v)
		}
	}

	return aggregatePoint
}

func (k msgServer) SendKeyshare(goCtx context.Context, msg *types.MsgSendKeyshare) (*types.MsgSendKeyshareResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// check if validator is registered
	_, found := k.GetValidatorSet(ctx, msg.Creator)

	if !found {
		return nil, types.ErrValidatorNotRegistered.Wrap(msg.Creator)
	}

	//if msg.BlockHeight < uint64(ctx.BlockHeight()) {
	//	return nil, types.ErrInvalidBlockHeight
	//}

	// Setup
	suite := bls.NewBLS12381Suite()
	ibeID := strconv.FormatUint(msg.BlockHeight, 10)

	// Parse the keyshare & commitment then verify it
	extractedKey, _, err := parseKeyShareCommitment(suite, msg.Message, msg.Commitment, uint32(msg.KeyShareIndex), ibeID)
	if err != nil {
		return nil, err
	}

	keyShare := types.KeyShare{
		Validator:           msg.Creator,
		BlockHeight:         msg.BlockHeight,
		KeyShare:            msg.Message,
		Commitment:          msg.Commitment,
		KeyShareIndex:       msg.KeyShareIndex,
		ReceivedTimestamp:   uint64(ctx.BlockTime().Unix()),
		ReceivedBlockHeight: uint64(ctx.BlockHeight()),
	}

	// Save the new keyshare to state
	k.SetKeyShare(ctx, keyShare)

	// Emit KeyShare Submitted Event
	ctx.EventManager().EmitEvent(
		sdk.NewEvent(types.SendKeyshareEventType,
			sdk.NewAttribute(types.SendKeyshareEventValidator, msg.Creator),
			sdk.NewAttribute(types.SendKeyshareEventKeyshareBlockHeight, strconv.FormatUint(msg.BlockHeight, 10)),
			sdk.NewAttribute(types.SendKeyshareEventReceivedBlockHeight, strconv.FormatInt(ctx.BlockHeight(), 10)),
			sdk.NewAttribute(types.SendKeyshareEventMessage, msg.Message),
			sdk.NewAttribute(types.SendKeyshareEventCommitment, msg.Commitment),
			sdk.NewAttribute(types.SendKeyshareEventIndex, strconv.FormatUint(msg.KeyShareIndex, 10)),
		),
	)

	// Check if there is an aggregated key exists
	_, found = k.GetAggregatedKeyShare(ctx, msg.BlockHeight)
	if found {
		return &types.MsgSendKeyshareResponse{
			Creator:             msg.Creator,
			Keyshare:            msg.Message,
			Commitment:          msg.Commitment,
			KeyshareIndex:       msg.KeyShareIndex,
			ReceivedBlockHeight: uint64(ctx.BlockHeight()),
			BlockHeight:         msg.BlockHeight,
		}, nil
	}

	// Get the latest public key for aggregating
	latestPubKey, found := k.GetLatestPubKey(ctx)
	if !found {
		return nil, types.ErrPubKeyNotFound
	}

	validatorList := k.GetAllValidatorSet(ctx)

	// Get all the keyshares for the provided block height in state
	// Get all the keyshares for the provided block height in state
	var stateKeyShares []types.KeyShare

	for _, eachValidator := range validatorList {
		eachKeyShare, found := k.GetKeyShare(ctx, eachValidator.Validator, msg.BlockHeight)
		if !found {
			continue
		}
		stateKeyShares = append(stateKeyShares, eachKeyShare)
	}

	expectedThreshold := int(math.Ceil(float64(len(validatorList)) * types.KeyAggregationThresholdPercentage))

	// Parse & append all the keyshare for aggregation
	var listOfShares []distIBE.ExtractedKey
	listOfShares = append(listOfShares, *extractedKey)

	tempKey, found := k.GetTempAggKey(ctx, msg.BlockHeight)
	if found && len(tempKey.Data) > 0 {
		tempShare, err := parseToExtractedKey(suite, tempKey.Data, uint32(msg.KeyShareIndex)+1)
		if err != nil {
			k.Logger(ctx).Error(fmt.Sprintf("Error parsing temp key %d: %s", msg.BlockHeight, err.Error()))
			return nil, err
		}
		listOfShares = append(listOfShares, *tempShare)
	}

	// Aggregate key
	SK := aggregate(suite, listOfShares)
	// SK, _ := distIBE.AggregateSK(suite, listOfShares, listOfCommitment, []byte(ibeID))

	newExtractedKey := distIBE.ExtractedKey{
		Sk:    SK,
		Index: uint32(msg.KeyShareIndex),
	}

	skHex, err := parseToHex(newExtractedKey)
	if err != nil {
		k.Logger(ctx).Error(fmt.Sprintf("Error parsing new temp key to hex %d: %s", msg.BlockHeight, err.Error()))
		return nil, err
	}

	if len(stateKeyShares) < expectedThreshold {
		k.SetTempAggKey(ctx, types.TempAggKey{
			Height: msg.BlockHeight,
			Data:   skHex,
		})
		k.Logger(ctx).Info(fmt.Sprintf("Temp Agg for Block %d: %s", msg.BlockHeight, skHex))

		return &types.MsgSendKeyshareResponse{
			Creator:             msg.Creator,
			Keyshare:            msg.Message,
			Commitment:          msg.Commitment,
			KeyshareIndex:       msg.KeyShareIndex,
			ReceivedBlockHeight: uint64(ctx.BlockHeight()),
			BlockHeight:         msg.BlockHeight,
		}, nil
	}

	var listOfShares2 []distIBE.ExtractedKey
	var listOfCommitment2 []distIBE.Commitment

	for _, eachKeyShare := range stateKeyShares {
		_keyShare, _commitment, err := parseKeyShareCommitment(suite, eachKeyShare.KeyShare, eachKeyShare.Commitment, uint32(eachKeyShare.KeyShareIndex), ibeID)
		if err != nil {
			k.Logger(ctx).Error(err.Error())
			continue
		}

		listOfShares2 = append(
			listOfShares2,
			*_keyShare,
		)
		listOfCommitment2 = append(
			listOfCommitment2,
			*_commitment,
		)
	}

	// Aggregate key
	SK2, _ := distIBE.AggregateSK(suite, listOfShares2, listOfCommitment2, []byte(ibeID))
	skByte2, err := SK2.MarshalBinary()
	if err != nil {
		return nil, err
	}
	skHex2 := hex.EncodeToString(skByte2)

	k.SetAggregatedKeyShare(ctx, types.AggregatedKeyShare{
		Height: msg.BlockHeight,
		Data:   skHex,
	})

	k.SetAggregatedKeyShareLength(ctx, k.GetAggregatedKeyShareLength(ctx)+1)

	k.Logger(ctx).Info(fmt.Sprintf("ALl At Once Aggregated Decryption Key for Block %d: %s", msg.BlockHeight, skHex2))
	k.Logger(ctx).Info(fmt.Sprintf("Contiously Aggregated Decryption Key for Block %d: %s", msg.BlockHeight, skHex))

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(types.KeyShareAggregatedEventType,
			sdk.NewAttribute(types.KeyShareAggregatedEventBlockHeight, strconv.FormatUint(msg.BlockHeight, 10)),
			sdk.NewAttribute(types.KeyShareAggregatedEventData, skHex),
			sdk.NewAttribute(types.KeyShareAggregatedEventPubKey, latestPubKey.PublicKey),
		),
	)

	return &types.MsgSendKeyshareResponse{
		Creator:             msg.Creator,
		Keyshare:            msg.Message,
		Commitment:          msg.Commitment,
		KeyshareIndex:       msg.KeyShareIndex,
		ReceivedBlockHeight: uint64(ctx.BlockHeight()),
		BlockHeight:         msg.BlockHeight,
	}, nil
}
