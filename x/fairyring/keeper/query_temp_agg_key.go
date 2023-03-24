package keeper

import (
	"context"

	"fairyring/x/fairyring/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) TempAggKeyAll(goCtx context.Context, req *types.QueryAllTempAggKeyRequest) (*types.QueryAllTempAggKeyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var tempAggKeys []types.TempAggKey
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	tempAggKeyStore := prefix.NewStore(store, types.KeyPrefix(types.TempAggKeyKeyPrefix))

	pageRes, err := query.Paginate(tempAggKeyStore, req.Pagination, func(key []byte, value []byte) error {
		var tempAggKey types.TempAggKey
		if err := k.cdc.Unmarshal(value, &tempAggKey); err != nil {
			return err
		}

		tempAggKeys = append(tempAggKeys, tempAggKey)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllTempAggKeyResponse{TempAggKey: tempAggKeys, Pagination: pageRes}, nil
}

func (k Keeper) TempAggKey(goCtx context.Context, req *types.QueryGetTempAggKeyRequest) (*types.QueryGetTempAggKeyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)

	val, found := k.GetTempAggKey(
		ctx,
		req.Height,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetTempAggKeyResponse{TempAggKey: val}, nil
}
