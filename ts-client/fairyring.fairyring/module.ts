// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgCreateLatestPubKey } from "./types/fairyring/fairyring/tx";
import { MsgSendKeyshare } from "./types/fairyring/fairyring/tx";
import { MsgRegisterValidator } from "./types/fairyring/fairyring/tx";

import { AggregatedKeyShare as typeAggregatedKeyShare} from "./types"
import { KeyShare as typeKeyShare} from "./types"
import { LatestPubKey as typeLatestPubKey} from "./types"
import { Params as typeParams} from "./types"
import { TempAggKey as typeTempAggKey} from "./types"
import { ValidatorSet as typeValidatorSet} from "./types"

export { MsgCreateLatestPubKey, MsgSendKeyshare, MsgRegisterValidator };

type sendMsgCreateLatestPubKeyParams = {
  value: MsgCreateLatestPubKey,
  fee?: StdFee,
  memo?: string
};

type sendMsgSendKeyshareParams = {
  value: MsgSendKeyshare,
  fee?: StdFee,
  memo?: string
};

type sendMsgRegisterValidatorParams = {
  value: MsgRegisterValidator,
  fee?: StdFee,
  memo?: string
};


type msgCreateLatestPubKeyParams = {
  value: MsgCreateLatestPubKey,
};

type msgSendKeyshareParams = {
  value: MsgSendKeyshare,
};

type msgRegisterValidatorParams = {
  value: MsgRegisterValidator,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgCreateLatestPubKey({ value, fee, memo }: sendMsgCreateLatestPubKeyParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreateLatestPubKey: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreateLatestPubKey({ value: MsgCreateLatestPubKey.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreateLatestPubKey: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgSendKeyshare({ value, fee, memo }: sendMsgSendKeyshareParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgSendKeyshare: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgSendKeyshare({ value: MsgSendKeyshare.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgSendKeyshare: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgRegisterValidator({ value, fee, memo }: sendMsgRegisterValidatorParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgRegisterValidator: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgRegisterValidator({ value: MsgRegisterValidator.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgRegisterValidator: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgCreateLatestPubKey({ value }: msgCreateLatestPubKeyParams): EncodeObject {
			try {
				return { typeUrl: "/fairyring.fairyring.MsgCreateLatestPubKey", value: MsgCreateLatestPubKey.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreateLatestPubKey: Could not create message: ' + e.message)
			}
		},
		
		msgSendKeyshare({ value }: msgSendKeyshareParams): EncodeObject {
			try {
				return { typeUrl: "/fairyring.fairyring.MsgSendKeyshare", value: MsgSendKeyshare.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSendKeyshare: Could not create message: ' + e.message)
			}
		},
		
		msgRegisterValidator({ value }: msgRegisterValidatorParams): EncodeObject {
			try {
				return { typeUrl: "/fairyring.fairyring.MsgRegisterValidator", value: MsgRegisterValidator.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgRegisterValidator: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						AggregatedKeyShare: getStructure(typeAggregatedKeyShare.fromPartial({})),
						KeyShare: getStructure(typeKeyShare.fromPartial({})),
						LatestPubKey: getStructure(typeLatestPubKey.fromPartial({})),
						Params: getStructure(typeParams.fromPartial({})),
						TempAggKey: getStructure(typeTempAggKey.fromPartial({})),
						ValidatorSet: getStructure(typeValidatorSet.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			FairyringFairyring: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;