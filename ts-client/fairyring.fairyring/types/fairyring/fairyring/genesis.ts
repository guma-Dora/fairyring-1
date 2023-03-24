/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { AggregatedKeyShare } from "./aggregated_key_share";
import { KeyShare } from "./key_share";
import { LatestPubKey } from "./latest_pub_key";
import { Params } from "./params";
import { TempAggKey } from "./temp_agg_key";
import { ValidatorSet } from "./validator_set";

export const protobufPackage = "fairyring.fairyring";

/** GenesisState defines the fairyring module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  validatorSetList: ValidatorSet[];
  keyShareList: KeyShare[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  aggregatedKeyShareList: AggregatedKeyShare[];
  LatestPubKey: LatestPubKey | undefined;
  tempAggKeyList: TempAggKey[];
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    validatorSetList: [],
    keyShareList: [],
    aggregatedKeyShareList: [],
    LatestPubKey: undefined,
    tempAggKeyList: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.validatorSetList) {
      ValidatorSet.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.keyShareList) {
      KeyShare.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.aggregatedKeyShareList) {
      AggregatedKeyShare.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.LatestPubKey !== undefined) {
      LatestPubKey.encode(message.LatestPubKey, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.tempAggKeyList) {
      TempAggKey.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.validatorSetList.push(ValidatorSet.decode(reader, reader.uint32()));
          break;
        case 3:
          message.keyShareList.push(KeyShare.decode(reader, reader.uint32()));
          break;
        case 4:
          message.aggregatedKeyShareList.push(AggregatedKeyShare.decode(reader, reader.uint32()));
          break;
        case 5:
          message.LatestPubKey = LatestPubKey.decode(reader, reader.uint32());
          break;
        case 6:
          message.tempAggKeyList.push(TempAggKey.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      validatorSetList: Array.isArray(object?.validatorSetList)
        ? object.validatorSetList.map((e: any) => ValidatorSet.fromJSON(e))
        : [],
      keyShareList: Array.isArray(object?.keyShareList)
        ? object.keyShareList.map((e: any) => KeyShare.fromJSON(e))
        : [],
      aggregatedKeyShareList: Array.isArray(object?.aggregatedKeyShareList)
        ? object.aggregatedKeyShareList.map((e: any) => AggregatedKeyShare.fromJSON(e))
        : [],
      LatestPubKey: isSet(object.LatestPubKey) ? LatestPubKey.fromJSON(object.LatestPubKey) : undefined,
      tempAggKeyList: Array.isArray(object?.tempAggKeyList)
        ? object.tempAggKeyList.map((e: any) => TempAggKey.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.validatorSetList) {
      obj.validatorSetList = message.validatorSetList.map((e) => e ? ValidatorSet.toJSON(e) : undefined);
    } else {
      obj.validatorSetList = [];
    }
    if (message.keyShareList) {
      obj.keyShareList = message.keyShareList.map((e) => e ? KeyShare.toJSON(e) : undefined);
    } else {
      obj.keyShareList = [];
    }
    if (message.aggregatedKeyShareList) {
      obj.aggregatedKeyShareList = message.aggregatedKeyShareList.map((e) =>
        e ? AggregatedKeyShare.toJSON(e) : undefined
      );
    } else {
      obj.aggregatedKeyShareList = [];
    }
    message.LatestPubKey !== undefined
      && (obj.LatestPubKey = message.LatestPubKey ? LatestPubKey.toJSON(message.LatestPubKey) : undefined);
    if (message.tempAggKeyList) {
      obj.tempAggKeyList = message.tempAggKeyList.map((e) => e ? TempAggKey.toJSON(e) : undefined);
    } else {
      obj.tempAggKeyList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.validatorSetList = object.validatorSetList?.map((e) => ValidatorSet.fromPartial(e)) || [];
    message.keyShareList = object.keyShareList?.map((e) => KeyShare.fromPartial(e)) || [];
    message.aggregatedKeyShareList = object.aggregatedKeyShareList?.map((e) => AggregatedKeyShare.fromPartial(e)) || [];
    message.LatestPubKey = (object.LatestPubKey !== undefined && object.LatestPubKey !== null)
      ? LatestPubKey.fromPartial(object.LatestPubKey)
      : undefined;
    message.tempAggKeyList = object.tempAggKeyList?.map((e) => TempAggKey.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
