package keeper

import (
	"fairyring/x/fairyring/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetTempAggKey set a specific tempAggKey in the store from its index
func (k Keeper) SetTempAggKey(ctx sdk.Context, tempAggKey types.TempAggKey) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TempAggKeyKeyPrefix))
	b := k.cdc.MustMarshal(&tempAggKey)
	store.Set(types.TempAggKeyKey(
		tempAggKey.Height,
	), b)
}

// GetTempAggKey returns a tempAggKey from its index
func (k Keeper) GetTempAggKey(
	ctx sdk.Context,
	height uint64,

) (val types.TempAggKey, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TempAggKeyKeyPrefix))

	b := store.Get(types.TempAggKeyKey(
		height,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveTempAggKey removes a tempAggKey from the store
func (k Keeper) RemoveTempAggKey(
	ctx sdk.Context,
	height uint64,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TempAggKeyKeyPrefix))
	store.Delete(types.TempAggKeyKey(
		height,
	))
}

// GetAllTempAggKey returns all tempAggKey
func (k Keeper) GetAllTempAggKey(ctx sdk.Context) (list []types.TempAggKey) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TempAggKeyKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.TempAggKey
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
