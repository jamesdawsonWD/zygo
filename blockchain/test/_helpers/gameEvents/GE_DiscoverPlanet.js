import { GE_DiscoverPlanetC } from '../../_utils/artifacts';
import { deployProxy, upgradeProxy } from '@openzeppelin/truffle-upgrades';

export async function DiscoverPlanetAddress() {
    const DiscoverPlanet = await GE_DiscoverPlanetC.deployed();
    return DiscoverPlanet.address;
}
export async function DiscoverPlanetStart(user, from) {
    const DiscoverPlanet = await GE_DiscoverPlanetC.deployed();
    return DiscoverPlanet.start(user, { from });
}
