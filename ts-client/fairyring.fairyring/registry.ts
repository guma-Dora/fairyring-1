import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateLatestPubKey } from "./types/fairyring/fairyring/tx";
import { MsgSendKeyshare } from "./types/fairyring/fairyring/tx";
import { MsgRegisterValidator } from "./types/fairyring/fairyring/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/fairyring.fairyring.MsgCreateLatestPubKey", MsgCreateLatestPubKey],
    ["/fairyring.fairyring.MsgSendKeyshare", MsgSendKeyshare],
    ["/fairyring.fairyring.MsgRegisterValidator", MsgRegisterValidator],
    
];

export { msgTypes }