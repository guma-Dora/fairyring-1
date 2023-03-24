import { Client, registry, MissingWalletError } from 'fairyring-client-ts'

import { AggregatedKeyShare } from "fairyring-client-ts/fairyring.fairyring/types"
import { KeyShare } from "fairyring-client-ts/fairyring.fairyring/types"
import { LatestPubKey } from "fairyring-client-ts/fairyring.fairyring/types"
import { Params } from "fairyring-client-ts/fairyring.fairyring/types"
import { TempAggKey } from "fairyring-client-ts/fairyring.fairyring/types"
import { ValidatorSet } from "fairyring-client-ts/fairyring.fairyring/types"


export { AggregatedKeyShare, KeyShare, LatestPubKey, Params, TempAggKey, ValidatorSet };

function initClient(vuexGetters) {
	return new Client(vuexGetters['common/env/getEnv'], vuexGetters['common/wallet/signer'])
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	let structure: {fields: Field[]} = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const getDefaultState = () => {
	return {
				Params: {},
				ValidatorSet: {},
				ValidatorSetAll: {},
				KeyShare: {},
				KeyShareAll: {},
				AggregatedKeyShare: {},
				AggregatedKeyShareAll: {},
				LatestPubKey: {},
				TempAggKey: {},
				TempAggKeyAll: {},
				
				_Structure: {
						AggregatedKeyShare: getStructure(AggregatedKeyShare.fromPartial({})),
						KeyShare: getStructure(KeyShare.fromPartial({})),
						LatestPubKey: getStructure(LatestPubKey.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						TempAggKey: getStructure(TempAggKey.fromPartial({})),
						ValidatorSet: getStructure(ValidatorSet.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getValidatorSet: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ValidatorSet[JSON.stringify(params)] ?? {}
		},
				getValidatorSetAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ValidatorSetAll[JSON.stringify(params)] ?? {}
		},
				getKeyShare: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.KeyShare[JSON.stringify(params)] ?? {}
		},
				getKeyShareAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.KeyShareAll[JSON.stringify(params)] ?? {}
		},
				getAggregatedKeyShare: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AggregatedKeyShare[JSON.stringify(params)] ?? {}
		},
				getAggregatedKeyShareAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AggregatedKeyShareAll[JSON.stringify(params)] ?? {}
		},
				getLatestPubKey: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.LatestPubKey[JSON.stringify(params)] ?? {}
		},
				getTempAggKey: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TempAggKey[JSON.stringify(params)] ?? {}
		},
				getTempAggKeyAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TempAggKeyAll[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: fairyring.fairyring initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryValidatorSet({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryValidatorSet( key.index)).data
				
					
				commit('QUERY', { query: 'ValidatorSet', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryValidatorSet', payload: { options: { all }, params: {...key},query }})
				return getters['getValidatorSet']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryValidatorSet API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryValidatorSetAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryValidatorSetAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.FairyringFairyring.query.queryValidatorSetAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'ValidatorSetAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryValidatorSetAll', payload: { options: { all }, params: {...key},query }})
				return getters['getValidatorSetAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryValidatorSetAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryKeyShare({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryKeyShare( key.validator,  key.blockHeight)).data
				
					
				commit('QUERY', { query: 'KeyShare', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryKeyShare', payload: { options: { all }, params: {...key},query }})
				return getters['getKeyShare']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryKeyShare API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryKeyShareAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryKeyShareAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.FairyringFairyring.query.queryKeyShareAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'KeyShareAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryKeyShareAll', payload: { options: { all }, params: {...key},query }})
				return getters['getKeyShareAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryKeyShareAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAggregatedKeyShare({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryAggregatedKeyShare( key.height)).data
				
					
				commit('QUERY', { query: 'AggregatedKeyShare', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAggregatedKeyShare', payload: { options: { all }, params: {...key},query }})
				return getters['getAggregatedKeyShare']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAggregatedKeyShare API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAggregatedKeyShareAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryAggregatedKeyShareAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.FairyringFairyring.query.queryAggregatedKeyShareAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'AggregatedKeyShareAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAggregatedKeyShareAll', payload: { options: { all }, params: {...key},query }})
				return getters['getAggregatedKeyShareAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAggregatedKeyShareAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryLatestPubKey({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryLatestPubKey()).data
				
					
				commit('QUERY', { query: 'LatestPubKey', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryLatestPubKey', payload: { options: { all }, params: {...key},query }})
				return getters['getLatestPubKey']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryLatestPubKey API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTempAggKey({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryTempAggKey( key.height)).data
				
					
				commit('QUERY', { query: 'TempAggKey', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTempAggKey', payload: { options: { all }, params: {...key},query }})
				return getters['getTempAggKey']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTempAggKey API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTempAggKeyAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.FairyringFairyring.query.queryTempAggKeyAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.FairyringFairyring.query.queryTempAggKeyAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'TempAggKeyAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTempAggKeyAll', payload: { options: { all }, params: {...key},query }})
				return getters['getTempAggKeyAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTempAggKeyAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgCreateLatestPubKey({ rootGetters }, { value, fee = {amount: [], gas: "200000"}, memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const fullFee = Array.isArray(fee)  ? {amount: fee, gas: "200000"} :fee;
				const result = await client.FairyringFairyring.tx.sendMsgCreateLatestPubKey({ value, fee: fullFee, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateLatestPubKey:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateLatestPubKey:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSendKeyshare({ rootGetters }, { value, fee = {amount: [], gas: "200000"}, memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const fullFee = Array.isArray(fee)  ? {amount: fee, gas: "200000"} :fee;
				const result = await client.FairyringFairyring.tx.sendMsgSendKeyshare({ value, fee: fullFee, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSendKeyshare:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSendKeyshare:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRegisterValidator({ rootGetters }, { value, fee = {amount: [], gas: "200000"}, memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const fullFee = Array.isArray(fee)  ? {amount: fee, gas: "200000"} :fee;
				const result = await client.FairyringFairyring.tx.sendMsgRegisterValidator({ value, fee: fullFee, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRegisterValidator:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRegisterValidator:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgCreateLatestPubKey({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.FairyringFairyring.tx.msgCreateLatestPubKey({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateLatestPubKey:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateLatestPubKey:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSendKeyshare({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.FairyringFairyring.tx.msgSendKeyshare({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSendKeyshare:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSendKeyshare:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRegisterValidator({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.FairyringFairyring.tx.msgRegisterValidator({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRegisterValidator:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRegisterValidator:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}