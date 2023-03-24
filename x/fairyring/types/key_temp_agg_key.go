package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// TempAggKeyKeyPrefix is the prefix to retrieve all TempAggKey
	TempAggKeyKeyPrefix = "TempAggKey/value/"
)

// TempAggKeyKey returns the store key to retrieve a TempAggKey from the index fields
func TempAggKeyKey(
	height uint64,
) []byte {
	var key []byte

	heightBytes := make([]byte, 8)
	binary.BigEndian.PutUint64(heightBytes, height)
	key = append(key, heightBytes...)
	key = append(key, []byte("/")...)

	return key
}
