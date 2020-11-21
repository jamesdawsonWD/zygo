import { PlanetManagerC } from '../_utils/artifacts';
export async function planetManagerAddress() {
    const PlanetManager = await PlanetManagerC.deployed();
    return PlanetManager.address;
}
export async function createPlanet(tokenId, from) {
    const PlanetManager = await PlanetManagerC.deployed();
    return await PlanetManager.createPlanet(tokenId, { from });
}
export async function getPlanetImplementation(from) {
    const PlanetManager = await PlanetManagerC.deployed();
    return await PlanetManager.planetImplementation({ from });
}
