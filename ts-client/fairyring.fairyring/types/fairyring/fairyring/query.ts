/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { AggregatedKeyShare } from "./aggregated_key_share";
import { KeyShare } from "./key_share";
import { LatestPubKey } from "./latest_pub_key";
import { Params } from "./params";
import { TempAggKey } from "./temp_agg_key";
import { ValidatorSet } from "./validator_set";

export const protobufPackage = "fairyring.fairyring";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetValidatorSetRequest {
  index: string;
}

export interface QueryGetValidatorSetResponse {
  validatorSet: ValidatorSet | undefined;
}

export interface QueryAllValidatorSetRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllValidatorSetResponse {
  validatorSet: ValidatorSet[];
  pagination: PageResponse | undefined;
}

export interface QueryGetKeyShareRequest {
  validator: string;
  blockHeight: number;
}

export interface QueryGetKeyShareResponse {
  keyShare: KeyShare | undefined;
}

export interface QueryAllKeyShareRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllKeyShareResponse {
  keyShare: KeyShare[];
  pagination: PageResponse | undefined;
}

/** this line is used by starport scaffolding # 3 */
export interface QueryGetAggregatedKeyShareRequest {
  height: number;
}

export interface QueryGetAggregatedKeyShareResponse {
  aggregatedKeyShare: AggregatedKeyShare | undefined;
}

export interface QueryAllAggregatedKeyShareRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllAggregatedKeyShareResponse {
  aggregatedKeyShare: AggregatedKeyShare[];
  pagination: PageResponse | undefined;
}

export interface QueryLatestPubKeyRequest {
}

export interface QueryLatestPubKeyResponse {
  latestPubKey: LatestPubKey | undefined;
}

export interface QueryGetTempAggKeyRequest {
  height: number;
}

export interface QueryGetTempAggKeyResponse {
  tempAggKey: TempAggKey | undefined;
}

export interface QueryAllTempAggKeyRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllTempAggKeyResponse {
  tempAggKey: TempAggKey[];
  pagination: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetValidatorSetRequest(): QueryGetValidatorSetRequest {
  return { index: "" };
}

export const QueryGetValidatorSetRequest = {
  encode(message: QueryGetValidatorSetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetValidatorSetRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetValidatorSetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetValidatorSetRequest {
    return { index: isSet(object.index) ? String(object.index) : "" };
  },

  toJSON(message: QueryGetValidatorSetRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetValidatorSetRequest>, I>>(object: I): QueryGetValidatorSetRequest {
    const message = createBaseQueryGetValidatorSetRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetValidatorSetResponse(): QueryGetValidatorSetResponse {
  return { validatorSet: undefined };
}

export const QueryGetValidatorSetResponse = {
  encode(message: QueryGetValidatorSetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorSet !== undefined) {
      ValidatorSet.encode(message.validatorSet, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetValidatorSetResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetValidatorSetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorSet = ValidatorSet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetValidatorSetResponse {
    return { validatorSet: isSet(object.validatorSet) ? ValidatorSet.fromJSON(object.validatorSet) : undefined };
  },

  toJSON(message: QueryGetValidatorSetResponse): unknown {
    const obj: any = {};
    message.validatorSet !== undefined
      && (obj.validatorSet = message.validatorSet ? ValidatorSet.toJSON(message.validatorSet) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetValidatorSetResponse>, I>>(object: I): QueryGetValidatorSetResponse {
    const message = createBaseQueryGetValidatorSetResponse();
    message.validatorSet = (object.validatorSet !== undefined && object.validatorSet !== null)
      ? ValidatorSet.fromPartial(object.validatorSet)
      : undefined;
    return message;
  },
};

function createBaseQueryAllValidatorSetRequest(): QueryAllValidatorSetRequest {
  return { pagination: undefined };
}

export const QueryAllValidatorSetRequest = {
  encode(message: QueryAllValidatorSetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllValidatorSetRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllValidatorSetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllValidatorSetRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllValidatorSetRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllValidatorSetRequest>, I>>(object: I): QueryAllValidatorSetRequest {
    const message = createBaseQueryAllValidatorSetRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllValidatorSetResponse(): QueryAllValidatorSetResponse {
  return { validatorSet: [], pagination: undefined };
}

export const QueryAllValidatorSetResponse = {
  encode(message: QueryAllValidatorSetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.validatorSet) {
      ValidatorSet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllValidatorSetResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllValidatorSetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorSet.push(ValidatorSet.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllValidatorSetResponse {
    return {
      validatorSet: Array.isArray(object?.validatorSet)
        ? object.validatorSet.map((e: any) => ValidatorSet.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllValidatorSetResponse): unknown {
    const obj: any = {};
    if (message.validatorSet) {
      obj.validatorSet = message.validatorSet.map((e) => e ? ValidatorSet.toJSON(e) : undefined);
    } else {
      obj.validatorSet = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllValidatorSetResponse>, I>>(object: I): QueryAllValidatorSetResponse {
    const message = createBaseQueryAllValidatorSetResponse();
    message.validatorSet = object.validatorSet?.map((e) => ValidatorSet.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetKeyShareRequest(): QueryGetKeyShareRequest {
  return { validator: "", blockHeight: 0 };
}

export const QueryGetKeyShareRequest = {
  encode(message: QueryGetKeyShareRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validator !== "") {
      writer.uint32(10).string(message.validator);
    }
    if (message.blockHeight !== 0) {
      writer.uint32(16).uint64(message.blockHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetKeyShareRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetKeyShareRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = reader.string();
          break;
        case 2:
          message.blockHeight = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetKeyShareRequest {
    return {
      validator: isSet(object.validator) ? String(object.validator) : "",
      blockHeight: isSet(object.blockHeight) ? Number(object.blockHeight) : 0,
    };
  },

  toJSON(message: QueryGetKeyShareRequest): unknown {
    const obj: any = {};
    message.validator !== undefined && (obj.validator = message.validator);
    message.blockHeight !== undefined && (obj.blockHeight = Math.round(message.blockHeight));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetKeyShareRequest>, I>>(object: I): QueryGetKeyShareRequest {
    const message = createBaseQueryGetKeyShareRequest();
    message.validator = object.validator ?? "";
    message.blockHeight = object.blockHeight ?? 0;
    return message;
  },
};

function createBaseQueryGetKeyShareResponse(): QueryGetKeyShareResponse {
  return { keyShare: undefined };
}

export const QueryGetKeyShareResponse = {
  encode(message: QueryGetKeyShareResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keyShare !== undefined) {
      KeyShare.encode(message.keyShare, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetKeyShareResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetKeyShareResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyShare = KeyShare.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetKeyShareResponse {
    return { keyShare: isSet(object.keyShare) ? KeyShare.fromJSON(object.keyShare) : undefined };
  },

  toJSON(message: QueryGetKeyShareResponse): unknown {
    const obj: any = {};
    message.keyShare !== undefined && (obj.keyShare = message.keyShare ? KeyShare.toJSON(message.keyShare) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetKeyShareResponse>, I>>(object: I): QueryGetKeyShareResponse {
    const message = createBaseQueryGetKeyShareResponse();
    message.keyShare = (object.keyShare !== undefined && object.keyShare !== null)
      ? KeyShare.fromPartial(object.keyShare)
      : undefined;
    return message;
  },
};

function createBaseQueryAllKeyShareRequest(): QueryAllKeyShareRequest {
  return { pagination: undefined };
}

export const QueryAllKeyShareRequest = {
  encode(message: QueryAllKeyShareRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllKeyShareRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllKeyShareRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllKeyShareRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllKeyShareRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllKeyShareRequest>, I>>(object: I): QueryAllKeyShareRequest {
    const message = createBaseQueryAllKeyShareRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllKeyShareResponse(): QueryAllKeyShareResponse {
  return { keyShare: [], pagination: undefined };
}

export const QueryAllKeyShareResponse = {
  encode(message: QueryAllKeyShareResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.keyShare) {
      KeyShare.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllKeyShareResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllKeyShareResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyShare.push(KeyShare.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllKeyShareResponse {
    return {
      keyShare: Array.isArray(object?.keyShare) ? object.keyShare.map((e: any) => KeyShare.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllKeyShareResponse): unknown {
    const obj: any = {};
    if (message.keyShare) {
      obj.keyShare = message.keyShare.map((e) => e ? KeyShare.toJSON(e) : undefined);
    } else {
      obj.keyShare = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllKeyShareResponse>, I>>(object: I): QueryAllKeyShareResponse {
    const message = createBaseQueryAllKeyShareResponse();
    message.keyShare = object.keyShare?.map((e) => KeyShare.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetAggregatedKeyShareRequest(): QueryGetAggregatedKeyShareRequest {
  return { height: 0 };
}

export const QueryGetAggregatedKeyShareRequest = {
  encode(message: QueryGetAggregatedKeyShareRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAggregatedKeyShareRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAggregatedKeyShareRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAggregatedKeyShareRequest {
    return { height: isSet(object.height) ? Number(object.height) : 0 };
  },

  toJSON(message: QueryGetAggregatedKeyShareRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAggregatedKeyShareRequest>, I>>(
    object: I,
  ): QueryGetAggregatedKeyShareRequest {
    const message = createBaseQueryGetAggregatedKeyShareRequest();
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseQueryGetAggregatedKeyShareResponse(): QueryGetAggregatedKeyShareResponse {
  return { aggregatedKeyShare: undefined };
}

export const QueryGetAggregatedKeyShareResponse = {
  encode(message: QueryGetAggregatedKeyShareResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.aggregatedKeyShare !== undefined) {
      AggregatedKeyShare.encode(message.aggregatedKeyShare, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAggregatedKeyShareResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAggregatedKeyShareResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aggregatedKeyShare = AggregatedKeyShare.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAggregatedKeyShareResponse {
    return {
      aggregatedKeyShare: isSet(object.aggregatedKeyShare)
        ? AggregatedKeyShare.fromJSON(object.aggregatedKeyShare)
        : undefined,
    };
  },

  toJSON(message: QueryGetAggregatedKeyShareResponse): unknown {
    const obj: any = {};
    message.aggregatedKeyShare !== undefined && (obj.aggregatedKeyShare = message.aggregatedKeyShare
      ? AggregatedKeyShare.toJSON(message.aggregatedKeyShare)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAggregatedKeyShareResponse>, I>>(
    object: I,
  ): QueryGetAggregatedKeyShareResponse {
    const message = createBaseQueryGetAggregatedKeyShareResponse();
    message.aggregatedKeyShare = (object.aggregatedKeyShare !== undefined && object.aggregatedKeyShare !== null)
      ? AggregatedKeyShare.fromPartial(object.aggregatedKeyShare)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAggregatedKeyShareRequest(): QueryAllAggregatedKeyShareRequest {
  return { pagination: undefined };
}

export const QueryAllAggregatedKeyShareRequest = {
  encode(message: QueryAllAggregatedKeyShareRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAggregatedKeyShareRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAggregatedKeyShareRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAggregatedKeyShareRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllAggregatedKeyShareRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAggregatedKeyShareRequest>, I>>(
    object: I,
  ): QueryAllAggregatedKeyShareRequest {
    const message = createBaseQueryAllAggregatedKeyShareRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAggregatedKeyShareResponse(): QueryAllAggregatedKeyShareResponse {
  return { aggregatedKeyShare: [], pagination: undefined };
}

export const QueryAllAggregatedKeyShareResponse = {
  encode(message: QueryAllAggregatedKeyShareResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.aggregatedKeyShare) {
      AggregatedKeyShare.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAggregatedKeyShareResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAggregatedKeyShareResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aggregatedKeyShare.push(AggregatedKeyShare.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAggregatedKeyShareResponse {
    return {
      aggregatedKeyShare: Array.isArray(object?.aggregatedKeyShare)
        ? object.aggregatedKeyShare.map((e: any) => AggregatedKeyShare.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllAggregatedKeyShareResponse): unknown {
    const obj: any = {};
    if (message.aggregatedKeyShare) {
      obj.aggregatedKeyShare = message.aggregatedKeyShare.map((e) => e ? AggregatedKeyShare.toJSON(e) : undefined);
    } else {
      obj.aggregatedKeyShare = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAggregatedKeyShareResponse>, I>>(
    object: I,
  ): QueryAllAggregatedKeyShareResponse {
    const message = createBaseQueryAllAggregatedKeyShareResponse();
    message.aggregatedKeyShare = object.aggregatedKeyShare?.map((e) => AggregatedKeyShare.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryLatestPubKeyRequest(): QueryLatestPubKeyRequest {
  return {};
}

export const QueryLatestPubKeyRequest = {
  encode(_: QueryLatestPubKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestPubKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestPubKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryLatestPubKeyRequest {
    return {};
  },

  toJSON(_: QueryLatestPubKeyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryLatestPubKeyRequest>, I>>(_: I): QueryLatestPubKeyRequest {
    const message = createBaseQueryLatestPubKeyRequest();
    return message;
  },
};

function createBaseQueryLatestPubKeyResponse(): QueryLatestPubKeyResponse {
  return { latestPubKey: undefined };
}

export const QueryLatestPubKeyResponse = {
  encode(message: QueryLatestPubKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.latestPubKey !== undefined) {
      LatestPubKey.encode(message.latestPubKey, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestPubKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestPubKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.latestPubKey = LatestPubKey.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLatestPubKeyResponse {
    return { latestPubKey: isSet(object.latestPubKey) ? LatestPubKey.fromJSON(object.latestPubKey) : undefined };
  },

  toJSON(message: QueryLatestPubKeyResponse): unknown {
    const obj: any = {};
    message.latestPubKey !== undefined
      && (obj.latestPubKey = message.latestPubKey ? LatestPubKey.toJSON(message.latestPubKey) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryLatestPubKeyResponse>, I>>(object: I): QueryLatestPubKeyResponse {
    const message = createBaseQueryLatestPubKeyResponse();
    message.latestPubKey = (object.latestPubKey !== undefined && object.latestPubKey !== null)
      ? LatestPubKey.fromPartial(object.latestPubKey)
      : undefined;
    return message;
  },
};

function createBaseQueryGetTempAggKeyRequest(): QueryGetTempAggKeyRequest {
  return { height: 0 };
}

export const QueryGetTempAggKeyRequest = {
  encode(message: QueryGetTempAggKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTempAggKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTempAggKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTempAggKeyRequest {
    return { height: isSet(object.height) ? Number(object.height) : 0 };
  },

  toJSON(message: QueryGetTempAggKeyRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetTempAggKeyRequest>, I>>(object: I): QueryGetTempAggKeyRequest {
    const message = createBaseQueryGetTempAggKeyRequest();
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseQueryGetTempAggKeyResponse(): QueryGetTempAggKeyResponse {
  return { tempAggKey: undefined };
}

export const QueryGetTempAggKeyResponse = {
  encode(message: QueryGetTempAggKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tempAggKey !== undefined) {
      TempAggKey.encode(message.tempAggKey, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTempAggKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTempAggKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tempAggKey = TempAggKey.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTempAggKeyResponse {
    return { tempAggKey: isSet(object.tempAggKey) ? TempAggKey.fromJSON(object.tempAggKey) : undefined };
  },

  toJSON(message: QueryGetTempAggKeyResponse): unknown {
    const obj: any = {};
    message.tempAggKey !== undefined
      && (obj.tempAggKey = message.tempAggKey ? TempAggKey.toJSON(message.tempAggKey) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetTempAggKeyResponse>, I>>(object: I): QueryGetTempAggKeyResponse {
    const message = createBaseQueryGetTempAggKeyResponse();
    message.tempAggKey = (object.tempAggKey !== undefined && object.tempAggKey !== null)
      ? TempAggKey.fromPartial(object.tempAggKey)
      : undefined;
    return message;
  },
};

function createBaseQueryAllTempAggKeyRequest(): QueryAllTempAggKeyRequest {
  return { pagination: undefined };
}

export const QueryAllTempAggKeyRequest = {
  encode(message: QueryAllTempAggKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTempAggKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTempAggKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTempAggKeyRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllTempAggKeyRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTempAggKeyRequest>, I>>(object: I): QueryAllTempAggKeyRequest {
    const message = createBaseQueryAllTempAggKeyRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllTempAggKeyResponse(): QueryAllTempAggKeyResponse {
  return { tempAggKey: [], pagination: undefined };
}

export const QueryAllTempAggKeyResponse = {
  encode(message: QueryAllTempAggKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tempAggKey) {
      TempAggKey.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTempAggKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTempAggKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tempAggKey.push(TempAggKey.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTempAggKeyResponse {
    return {
      tempAggKey: Array.isArray(object?.tempAggKey) ? object.tempAggKey.map((e: any) => TempAggKey.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllTempAggKeyResponse): unknown {
    const obj: any = {};
    if (message.tempAggKey) {
      obj.tempAggKey = message.tempAggKey.map((e) => e ? TempAggKey.toJSON(e) : undefined);
    } else {
      obj.tempAggKey = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTempAggKeyResponse>, I>>(object: I): QueryAllTempAggKeyResponse {
    const message = createBaseQueryAllTempAggKeyResponse();
    message.tempAggKey = object.tempAggKey?.map((e) => TempAggKey.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a ValidatorSet by index. */
  ValidatorSet(request: QueryGetValidatorSetRequest): Promise<QueryGetValidatorSetResponse>;
  /** Queries a list of ValidatorSet items. */
  ValidatorSetAll(request: QueryAllValidatorSetRequest): Promise<QueryAllValidatorSetResponse>;
  /** Queries a KeyShare by index. */
  KeyShare(request: QueryGetKeyShareRequest): Promise<QueryGetKeyShareResponse>;
  /** Queries a list of KeyShare items. */
  KeyShareAll(request: QueryAllKeyShareRequest): Promise<QueryAllKeyShareResponse>;
  /** Queries a list of AggregatedKeyShare items. */
  AggregatedKeyShare(request: QueryGetAggregatedKeyShareRequest): Promise<QueryGetAggregatedKeyShareResponse>;
  AggregatedKeyShareAll(request: QueryAllAggregatedKeyShareRequest): Promise<QueryAllAggregatedKeyShareResponse>;
  /** Queries the latest public key. */
  LatestPubKey(request: QueryLatestPubKeyRequest): Promise<QueryLatestPubKeyResponse>;
  /** Queries a list of TempAggKey items. */
  TempAggKey(request: QueryGetTempAggKeyRequest): Promise<QueryGetTempAggKeyResponse>;
  TempAggKeyAll(request: QueryAllTempAggKeyRequest): Promise<QueryAllTempAggKeyResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.ValidatorSet = this.ValidatorSet.bind(this);
    this.ValidatorSetAll = this.ValidatorSetAll.bind(this);
    this.KeyShare = this.KeyShare.bind(this);
    this.KeyShareAll = this.KeyShareAll.bind(this);
    this.AggregatedKeyShare = this.AggregatedKeyShare.bind(this);
    this.AggregatedKeyShareAll = this.AggregatedKeyShareAll.bind(this);
    this.LatestPubKey = this.LatestPubKey.bind(this);
    this.TempAggKey = this.TempAggKey.bind(this);
    this.TempAggKeyAll = this.TempAggKeyAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  ValidatorSet(request: QueryGetValidatorSetRequest): Promise<QueryGetValidatorSetResponse> {
    const data = QueryGetValidatorSetRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "ValidatorSet", data);
    return promise.then((data) => QueryGetValidatorSetResponse.decode(new _m0.Reader(data)));
  }

  ValidatorSetAll(request: QueryAllValidatorSetRequest): Promise<QueryAllValidatorSetResponse> {
    const data = QueryAllValidatorSetRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "ValidatorSetAll", data);
    return promise.then((data) => QueryAllValidatorSetResponse.decode(new _m0.Reader(data)));
  }

  KeyShare(request: QueryGetKeyShareRequest): Promise<QueryGetKeyShareResponse> {
    const data = QueryGetKeyShareRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "KeyShare", data);
    return promise.then((data) => QueryGetKeyShareResponse.decode(new _m0.Reader(data)));
  }

  KeyShareAll(request: QueryAllKeyShareRequest): Promise<QueryAllKeyShareResponse> {
    const data = QueryAllKeyShareRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "KeyShareAll", data);
    return promise.then((data) => QueryAllKeyShareResponse.decode(new _m0.Reader(data)));
  }

  AggregatedKeyShare(request: QueryGetAggregatedKeyShareRequest): Promise<QueryGetAggregatedKeyShareResponse> {
    const data = QueryGetAggregatedKeyShareRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "AggregatedKeyShare", data);
    return promise.then((data) => QueryGetAggregatedKeyShareResponse.decode(new _m0.Reader(data)));
  }

  AggregatedKeyShareAll(request: QueryAllAggregatedKeyShareRequest): Promise<QueryAllAggregatedKeyShareResponse> {
    const data = QueryAllAggregatedKeyShareRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "AggregatedKeyShareAll", data);
    return promise.then((data) => QueryAllAggregatedKeyShareResponse.decode(new _m0.Reader(data)));
  }

  LatestPubKey(request: QueryLatestPubKeyRequest): Promise<QueryLatestPubKeyResponse> {
    const data = QueryLatestPubKeyRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "LatestPubKey", data);
    return promise.then((data) => QueryLatestPubKeyResponse.decode(new _m0.Reader(data)));
  }

  TempAggKey(request: QueryGetTempAggKeyRequest): Promise<QueryGetTempAggKeyResponse> {
    const data = QueryGetTempAggKeyRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "TempAggKey", data);
    return promise.then((data) => QueryGetTempAggKeyResponse.decode(new _m0.Reader(data)));
  }

  TempAggKeyAll(request: QueryAllTempAggKeyRequest): Promise<QueryAllTempAggKeyResponse> {
    const data = QueryAllTempAggKeyRequest.encode(request).finish();
    const promise = this.rpc.request("fairyring.fairyring.Query", "TempAggKeyAll", data);
    return promise.then((data) => QueryAllTempAggKeyResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
