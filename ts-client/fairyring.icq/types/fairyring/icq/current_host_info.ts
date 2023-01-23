/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "fairyring.icq";

export interface CurrentHostInfo {
  height: string;
}

function createBaseCurrentHostInfo(): CurrentHostInfo {
  return { height: "" };
}

export const CurrentHostInfo = {
  encode(message: CurrentHostInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "") {
      writer.uint32(10).string(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CurrentHostInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrentHostInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CurrentHostInfo {
    return { height: isSet(object.height) ? String(object.height) : "" };
  },

  toJSON(message: CurrentHostInfo): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CurrentHostInfo>, I>>(object: I): CurrentHostInfo {
    const message = createBaseCurrentHostInfo();
    message.height = object.height ?? "";
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
