import { GE_Discover_1_F_DestroyerC } from '../../_utils/artifacts';

export async function GE_Discover_1_F_DestroyerProxyAddress() {
    const GE_Discover_1_F_Destroyer = await deployProxy(TestGameEventC, [], {
        initializer: false
    });
    return GameEvent.address;
}
export async function GE_Discover_1_F_DestroyerStart(user, from) {
    const GE_Discover_1_F_Destroyer = await GE_Discover_1_F_DestroyerC.deployed();
    return GE_Discover_1_F_Destroyer.start(user, { from });
}
export async function newTestEventProxy() {
    const GameEvent = await deployProxy(TestGameEventC, [], {
        initializer: false
    });
    return GameEvent.address;
}
