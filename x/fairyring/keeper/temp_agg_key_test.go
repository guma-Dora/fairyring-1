package keeper_test

import (
	"strconv"
	"testing"

	keepertest "fairyring/testutil/keeper"
	"fairyring/testutil/nullify"
	"fairyring/x/fairyring/keeper"
	"fairyring/x/fairyring/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNTempAggKey(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.TempAggKey {
	items := make([]types.TempAggKey, n)
	for i := range items {
		items[i].Height = uint64(i)

		keeper.SetTempAggKey(ctx, items[i])
	}
	return items
}

func TestTempAggKeyGet(t *testing.T) {
	keeper, ctx := keepertest.FairyringKeeper(t)
	items := createNTempAggKey(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetTempAggKey(ctx,
			item.Height,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestTempAggKeyRemove(t *testing.T) {
	keeper, ctx := keepertest.FairyringKeeper(t)
	items := createNTempAggKey(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveTempAggKey(ctx,
			item.Height,
		)
		_, found := keeper.GetTempAggKey(ctx,
			item.Height,
		)
		require.False(t, found)
	}
}

func TestTempAggKeyGetAll(t *testing.T) {
	keeper, ctx := keepertest.FairyringKeeper(t)
	items := createNTempAggKey(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllTempAggKey(ctx)),
	)
}
