package icq

import (
	"fairyring/x/icq/keeper"
	"fairyring/x/icq/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func BeginBlocker(ctx sdk.Context, k keeper.Keeper) {
	k.QueryHostChainInfo(ctx, types.PortID, params.ChannelId)
}
