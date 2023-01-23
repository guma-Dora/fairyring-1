package keeper

import (
	"context"

	"fairyring/x/icq/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) HostHeight(goCtx context.Context, req *types.QueryHostHeightRequest) (*types.QueryHostHeightResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	hostInfo, err := k.GetCurrentHostChainInfo(ctx)

	if err != nil {
		return &types.QueryHostHeightResponse{}, err
	}

	return &types.QueryHostHeightResponse{
		Height: hostInfo.Height,
	}, nil
}
