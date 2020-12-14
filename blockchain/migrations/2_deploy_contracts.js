const { isDevNetwork, isKovan, isMainNet } = require('./helpers');
const Web3 = require('web3');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
// Contracts
const EternalStorage = artifacts.require('EternalStorage');
const GameOperationsC = artifacts.require('GameOperations');
const PlanetsToken = artifacts.require('Planets');
const Solar = artifacts.require('SolarToken');
const ShipsAndTechnology = artifacts.require('ShipsAndTechnology');
const TreasuryC = artifacts.require('Treasury');
const GameStorage = artifacts.require('GameStorage');
const TypesLib = artifacts.require('Types');
const PlanetManager = artifacts.require('PlanetManager');
const Planet = artifacts.require('Planet');
const GameEventsManager = artifacts.require('GameEventsManager.sol');
const GameEventsStorage = artifacts.require('GameEventsStorage.sol');

// Testing
const TestShipsAndTechnology = artifacts.require('TestShipsAndTechnology.sol');
const TestTreasury = artifacts.require('TestTreasury.sol');
const TestPlanetTokens = artifacts.require('TestPlanetTokens.sol');

// GameEvents
const GE_DiscoverPlanet = artifacts.require('GE_DiscoverPlanet');
const GE_Discover_1_F_Destroyer = artifacts.require('GE_Discover_1_F_Destroyer.sol');
const GE_DiscoverHighYieldPlanet = artifacts.require('GE_DiscoverHighYieldPlanet.sol');
const GE_DiscoverMediumPlanet = artifacts.require('GE_DiscoverMediumYieldPlanet.sol');
const GE_DiscoverInsaneYieldPlanet = artifacts.require('GE_DiscoverInsaneYieldPlanet.sol');

// Travel
const Traverse = artifacts.require('Traverse.sol');

// Random
const Random = artifacts.require('Random.sol');

async function deployBaseProtocol(deployer, network, accounts) {
    const Sat = TestShipsAndTechnology;
    const Treasury = TestTreasury;
    const PlanetsToken = TestPlanetTokens;
    // Library
    await deployer.deploy(TypesLib);

    // Contracts
    await deployer.deploy(Treasury);
    await deployer.deploy(Solar, Treasury.address);
    await deployer.deploy(Sat, Treasury.address);
    await deployer.deploy(PlanetsToken, Treasury.address);
    await deployer.deploy(Planet);
    await deployer.deploy(PlanetManager);
    await deployer.deploy(GameEventsStorage);

    // Links
    await Promise.all([deployer.link(TypesLib, GameStorage)]);

    // Storage
    await deployer.deploy(GameStorage);

    const [PROXY_Random, PROXY_Traverse, PROXY_GameEventsManager] = await Promise.all([
        deployProxy(Random, [], {
            deployer,
            initializer: false
        }),
        deployProxy(Traverse, [], {
            deployer,
            initializer: false,
            unsafeAllowCustomTypes: true
        }),
        deployProxy(GameEventsManager, [], {
            deployer,
            initializer: false
        })
    ]);
    // Proxies
    const [
        PROXY_GE_Discover_1_F_Destroyer,
        PROXY_GE_DiscoverPlanet,
        PROXY_GE_DiscoverMediumPlanet,
        PROXY_GE_DiscoverHighPlanet,
        PROXY_GE_DiscoverInsanePlanet
    ] = await Promise.all([
        deployProxy(GE_Discover_1_F_Destroyer, [], {
            deployer,
            initializer: false
        }),
        deployProxy(GE_DiscoverPlanet, [], {
            deployer,
            initializer: false
        }),
        deployProxy(GE_DiscoverMediumPlanet, [], {
            deployer,
            initializer: false
        }),
        deployProxy(GE_DiscoverHighYieldPlanet, [], {
            deployer,
            initializer: false
        }),
        deployProxy(GE_DiscoverInsaneYieldPlanet, [], {
            deployer,
            initializer: false
        })
    ]);

    const [GameStorageD, TreasuryD, TraverseD, PlanetManagerD] = await Promise.all([
        GameStorage.deployed(),
        Treasury.deployed(),
        Traverse.deployed(),
        PlanetManager.deployed()
    ]);
    await GameStorageD.initialize(
        Solar.address,
        Sat.address,
        PlanetsToken.address,
        Treasury.address,
        PROXY_Traverse.address,
        PlanetManager.address,
        PROXY_GameEventsManager.address
    );
    await TreasuryD.initialize(
        PlanetsToken.address,
        Solar.address,
        Sat.address,
        PlanetManager.address,
        PROXY_GameEventsManager.address
    );

    await PlanetManagerD.initialize(GameStorage.address, Planet.address);
    await PROXY_Traverse.initialize(GameStorage.address, PROXY_GameEventsManager.address);
    await PROXY_GameEventsManager.initialize(
        GameStorage.address,
        GameEventsStorage.address,
        PROXY_Random.address,
        PROXY_Traverse.address
    );

    await Promise.all([
        PROXY_GameEventsManager.add(PROXY_GE_DiscoverPlanet.address),
        PROXY_GameEventsManager.add(PROXY_GE_Discover_1_F_Destroyer.address),
        PROXY_GameEventsManager.add(PROXY_GE_DiscoverMediumPlanet.address),
        PROXY_GameEventsManager.add(PROXY_GE_DiscoverHighPlanet.address),
        PROXY_GameEventsManager.add(PROXY_GE_DiscoverInsanePlanet.address)
    ]);
}

module.exports = async function(deployer, network, accounts) {
    await deployBaseProtocol(deployer, network, accounts);
};
