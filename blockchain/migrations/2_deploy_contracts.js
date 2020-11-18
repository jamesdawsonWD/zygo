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
const TestShipsAndTechnology = artifacts.require('TestShipsAndTechnology.sol');
const TestGameOperations = artifacts.require('TestGameOperations.sol');
const TestTreasury = artifacts.require('TestTreasury.sol');
const GameEventsManager = artifacts.require('GameEventsManager.sol');
const GE_DiscoverPlanet = artifacts.require('GE_DiscoverPlanet');
const GE_Discover_1_F_Destroyer = artifacts.require('GE_Discover_1_F_Destroyer.sol');
const Traverse = artifacts.require('Traverse.sol');

async function deployBaseProtocol(deployer, network, accounts) {
    const Sat = TestShipsAndTechnology;
    const GameOperations = TestGameOperations;
    const Treasury = TestTreasury;

    // GameEvents
    await deployer.deploy(GE_DiscoverPlanet);
    await deployer.deploy(GE_Discover_1_F_Destroyer);

    // Library
    await deployer.deploy(TypesLib);

    // Contracts
    await deployer.deploy(Treasury);
    await deployer.deploy(Solar, Treasury.address);
    await deployer.deploy(Sat, Treasury.address);
    await deployer.deploy(PlanetsToken, Treasury.address);
    await deployer.deploy(Planet);
    await deployer.deploy(Traverse);
    await deployer.deploy(GameEventsManager);
    await deployer.deploy(PlanetManager);

    // Links
    await Promise.all([deployer.link(TypesLib, GameStorage)]);

    // Storage
    await deployer.deploy(GameStorage);

    const [GameStorageD, TreasuryD, GameEventsManagerD, TraverseD, PlanetManagerD] = await Promise.all([
        GameStorage.deployed(),
        Treasury.deployed(),
        GameEventsManager.deployed(),
        Traverse.deployed(),
        PlanetManager.deployed()
    ]);
    await GameStorageD.initialize(
        Solar.address,
        Sat.address,
        PlanetsToken.address,
        Treasury.address,
        Traverse.address,
        PlanetManager.address,
        GameOperations.address,
        GameEventsManager.address
    );
    await TreasuryD.initialize(
        PlanetsToken.address,
        Solar.address,
        Sat.address,
        GameOperations.address,
        PlanetManager.address,
        GameEventsManager.address
    );

    await PlanetManagerD.initialize(GameStorage.address);
    await TraverseD.initialize(GameStorage.address);
    await GameEventsManagerD.initialize(GameStorage.address);
    await Promise.all([
        GameEventsManagerD.add(GE_DiscoverPlanet.address),
        GameEventsManagerD.add(GE_Discover_1_F_Destroyer.address)
    ]);
}

module.exports = async function(deployer, network, accounts) {
    await deployBaseProtocol(deployer, network, accounts);
};
