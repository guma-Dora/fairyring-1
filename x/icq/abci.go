package icq

import (
	"fairyring/x/icq/keeper"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func BeginBlocker(ctx sdk.Context, k keeper.Keeper) {
	k.QueryHostChainInfo(ctx)
}
