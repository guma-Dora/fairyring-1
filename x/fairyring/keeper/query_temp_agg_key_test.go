package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "fairyring/testutil/keeper"
	"fairyring/testutil/nullify"
	"fairyring/x/fairyring/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestTempAggKeyQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.FairyringKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNTempAggKey(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetTempAggKeyRequest
		response *types.QueryGetTempAggKeyResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetTempAggKeyRequest{
				Height: msgs[0].Height,
			},
			response: &types.QueryGetTempAggKeyResponse{TempAggKey: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetTempAggKeyRequest{
				Height: msgs[1].Height,
			},
			response: &types.QueryGetTempAggKeyResponse{TempAggKey: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetTempAggKeyRequest{
				Height: 100000,
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.TempAggKey(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}

func TestTempAggKeyQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.FairyringKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNTempAggKey(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllTempAggKeyRequest {
		return &types.QueryAllTempAggKeyRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.TempAggKeyAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.TempAggKey), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.TempAggKey),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.TempAggKeyAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.TempAggKey), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.TempAggKey),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.TempAggKeyAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.TempAggKey),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.TempAggKeyAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
