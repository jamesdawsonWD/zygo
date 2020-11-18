import { GE_Discover_1_F_DestroyerC } from '../../_utils/artifacts';

export async function GE_Discover_1_F_DestroyerAddress() {
    const GE_Discover_1_F_Destroyer = await GE_Discover_1_F_DestroyerC.deployed();
    return GE_Discover_1_F_Destroyer.address;
}
export async function GE_Discover_1_F_DestroyerStart(user, from) {
    const GE_Discover_1_F_Destroyer = await GE_Discover_1_F_DestroyerC.deployed();
    return GE_Discover_1_F_Destroyer.start(user, { from });
}
