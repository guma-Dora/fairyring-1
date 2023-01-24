package keeper

import (
	"errors"
	"fairyring/x/icq/types"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"

	rpctypes "github.com/cosmos/cosmos-sdk/client/grpc/tmservice"
	icqtypes "github.com/cosmos/ibc-go/v5/modules/apps/icq/types"
	clienttypes "github.com/cosmos/ibc-go/v5/modules/core/02-client/types"
	channeltypes "github.com/cosmos/ibc-go/v5/modules/core/04-channel/types"
	host "github.com/cosmos/ibc-go/v5/modules/core/24-host"
	abcitypes "github.com/tendermint/tendermint/abci/types"
)

func (k Keeper) GetCurrentHostChainInfo(ctx sdk.Context) (currentHostInfo types.CurrentHostInfo, err error) {
	store := ctx.KVStore(k.storeKey)
	b := store.Get(types.CurrentHostInfoKey)
	if b == nil {
		err := errors.New("host info not available")
		return types.CurrentHostInfo{}, err
	}

	k.cdc.MustUnmarshal(b, &currentHostInfo)
	return currentHostInfo, nil
}

func (k Keeper) SetCurrentHostChainInfo(ctx sdk.Context, hostInfo types.CurrentHostInfo) {
	store := ctx.KVStore(k.storeKey)
	b := k.cdc.MustMarshal(&hostInfo)
	key := types.CurrentHostInfoKey
	store.Set(key, b)
}

func (k Keeper) QueryHostChainInfo(ctx sdk.Context) (uint64, error) {
	// params := k.GetParams(ctx)

	chanCap, found := k.scopedKeeper.GetCapability(ctx, host.ChannelCapabilityPath(k.GetPort(ctx), types.ChannelID))
	if !found {
		return 0, sdkerrors.Wrap(channeltypes.ErrChannelCapabilityNotFound, "module does not own channel capability")
	}

	sourceChannelEnd, found := k.channelKeeper.GetChannel(ctx, types.PortID, types.ChannelID)
	if !found {
		return 0, sdkerrors.Wrapf(channeltypes.ErrChannelNotFound, "port ID (%s) channel ID (%s)", types.PortID, types.ChannelID)
	}

	q := rpctypes.GetLatestBlockRequest{}

	reqs := []abcitypes.RequestQuery{
		{
			Path: "/cosmos.base.tendermint.v1beta1.Service/GetLatestBlock",
			Data: k.cdc.MustMarshal(&q),
		},
	}

	destinationPort := sourceChannelEnd.GetCounterparty().GetPortID()
	destinationChannel := sourceChannelEnd.GetCounterparty().GetChannelID()

	data, err := icqtypes.SerializeCosmosQuery(reqs)
	if err != nil {
		return 0, sdkerrors.Wrap(err, "could not serialize reqs into cosmos query")
	}
	icqPacketData := icqtypes.InterchainQueryPacketData{
		Data: data,
	}

	return k.createOutgoingPacket(ctx,
		types.PortID,
		types.ChannelID,
		destinationPort,
		destinationChannel,
		chanCap,
		icqPacketData)
}

func (k Keeper) createOutgoingPacket(
	ctx sdk.Context,
	sourcePort,
	sourceChannel,
	destinationPort,
	destinationChannel string,
	chanCap *capabilitytypes.Capability,
	icqPacketData icqtypes.InterchainQueryPacketData,
) (uint64, error) {
	if err := icqPacketData.ValidateBasic(); err != nil {
		return 0, sdkerrors.Wrap(err, "invalid interchain query packet data")
	}

	// get the next sequence
	sequence, found := k.channelKeeper.GetNextSequenceSend(ctx, sourcePort, sourceChannel)
	if !found {
		return 0, sdkerrors.Wrapf(channeltypes.ErrSequenceSendNotFound, "failed to retrieve next sequence send for channel %s on port %s", sourceChannel, sourcePort)
	}

	timeoutTimestamp := ctx.BlockTime().Add(time.Second * 5).UnixNano()
	packet := channeltypes.NewPacket(
		icqPacketData.GetBytes(),
		sequence,
		sourcePort,
		sourceChannel,
		destinationPort,
		destinationChannel,
		clienttypes.ZeroHeight(),
		uint64(timeoutTimestamp),
	)

	if err := k.channelKeeper.SendPacket(ctx, chanCap, packet); err != nil {
		return 0, err
	}

	return sequence, nil
}

func (k Keeper) OnAcknowledgementPacket(
	ctx sdk.Context,
	modulePacket channeltypes.Packet,
	ack channeltypes.Acknowledgement,
) error {
	switch resp := ack.Response.(type) {
	case *channeltypes.Acknowledgement_Result:
		var ackData icqtypes.InterchainQueryPacketAck
		if err := icqtypes.ModuleCdc.UnmarshalJSON(resp.Result, &ackData); err != nil {
			return sdkerrors.Wrap(err, "failed to unmarshal interchain query packet ack")
		}
		resps, err := icqtypes.DeserializeCosmosResponse(ackData.Data)
		if err != nil {
			return sdkerrors.Wrap(err, "could not deserialize data to cosmos response")
		}

		if len(resps) < 1 {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "no responses in interchain query packet ack")
		}

		var r rpctypes.GetLatestBlockResponse
		if err := k.cdc.Unmarshal(resps[0].Value, &r); err != nil {
			return sdkerrors.Wrapf(err, "failed to unmarshal interchain query response to type %T", resp)
		}

		latestHostBlock := r.GetBlock()
		k.SetCurrentHostChainInfo(ctx, types.CurrentHostInfo{Height: uint64(latestHostBlock.Header.Height)})

		ctx.EventManager().EmitEvent(
			sdk.NewEvent(
				"query_result",
				sdk.NewAttribute(types.AttributeKeyAckSuccess, string(resp.Result)),
			),
		)

		k.Logger(ctx).Info("interchain query response", "sequence", modulePacket.Sequence, "response", r)
	case *channeltypes.Acknowledgement_Error:
		ctx.EventManager().EmitEvent(
			sdk.NewEvent(
				"query_result",
				sdk.NewAttribute(types.AttributeKeyAckError, resp.Error),
			),
		)

		k.Logger(ctx).Error("interchain query response", "sequence", modulePacket.Sequence, "error", resp.Error)
	}
	return nil
}
