package keeper_test

import (
	"context"
	"testing"

	keepertest "fairyring/testutil/keeper"
	"fairyring/x/icq/keeper"
	"fairyring/x/icq/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.IcqKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
