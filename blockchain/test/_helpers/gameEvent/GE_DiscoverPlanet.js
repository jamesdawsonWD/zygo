import { GE_DiscoverPlanetC } from '../../_utils/artifacts';

export async function DiscoverPlanetAddress() {
    const DiscoverPlanet = await GE_DiscoverPlanetC.deployed();
    return DiscoverPlanet.address;
}
export async function DiscoverPlanetStart() {
    const DiscoverPlanet = await GE_DiscoverPlanetC.deployed();
    return DiscoverPlanet.address;
}
