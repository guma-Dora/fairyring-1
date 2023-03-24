import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateAggregatedKeyShare } from "./types/fairyring/fairblock/tx";
import { MsgSubmitEncryptedTx } from "./types/fairyring/fairblock/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/fairyring.fairblock.MsgCreateAggregatedKeyShare", MsgCreateAggregatedKeyShare],
    ["/fairyring.fairblock.MsgSubmitEncryptedTx", MsgSubmitEncryptedTx],
    
];

export { msgTypes }