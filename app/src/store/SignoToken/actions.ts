import { getTxEventParams, SYSTEM_TYPES_IDS } from '@/utils/index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, SyntheticTokens, TxResult } from '../types';
import Web3 from 'web3';

export const actions: ActionTree<SyntheticTokens, RootState> = {
    async SIG_balanceOf(context: ActionContext<SyntheticTokens, RootState>, payload: { tokenAddress: string }) {
        const { SignoToken, Address } = context.getters;

        return SignoToken.methods
            .balanceOf(Address)
            .call({ from: Address })
            .then((balance: string) => {
                return balance;
            })
            .catch((err: Error) => context.dispatch('setError', err));
    }
    // async EMP_getTokenAddress(context: ActionContext<SyntheticTokens, RootState>, payload: { tokenAddress: string }) {
    //     const { EMPs, Address } = context.getters;
    //     const EMP = EMPs(payload.tokenAddress);

    //     EMP.methods
    //         .tokenCurrency()
    //         .call({ from: Address })
    //         .then((tx: TxResult) => {
    //             console.log(tx);
    //         })
    //         .catch((err: Error) => context.dispatch('setError', err));
    // },
    // async GO_deployPlanet(context: ActionContext<GameOperations, RootState>, payload: { tokenId: number }) {
    //     const { GameOperations, Address } = context.getters;
    //     GameOperations.methods
    //         .deployPlanet(payload.tokenId)
    //         .send({ from: Address, gas: 4000000 })
    //         .then((tx: any) => {
    //             console.log(tx);
    //             const event = getTxEventParams(tx, ['LogPlanetProxyCreated'], [['proxy']]);
    //             const proxy: string = event.LogPlanetProxyCreated.proxy;
    //             context
    //                 .dispatch('NETWORK_setupPlanet', proxy)
    //                 .then(() => context.dispatch('PLANET_retrieveDetails', { planet: proxy }))
    //                 .then(() => new Promise(resolve => setTimeout(() => resolve(), 2500)))
    //                 .then(() =>
    //                     context.dispatch('UIM_openModal', {
    //                         show: true,
    //                         type: 'planet',
    //                         content: 'Your planet has been deployed!',
    //                         data: {
    //                             tokenId: payload.tokenId,
    //                             proxyAddress: proxy
    //                         }
    //                     })
    //                 );
    //         })
    //         .catch((err: Error) => context.dispatch('setError', err));
    // },
    // async GO_testFhrDiscovery(
    //     context: ActionContext<GameOperations, RootState>,
    //     payload: { systemType: number }
    // ) {
    //     const { GameOperations, Address } = context.getters;
    //     GameOperations.methods
    //         .testFhrDiscovery(payload.systemType)
    //         .send({ from: Address })
    //         .then((tx: any) => {
    //             console.log(tx);
    //         })
    //         .catch((err: Error) => context.dispatch('setError', err));
    // }
};
