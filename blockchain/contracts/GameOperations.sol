// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {GameStorage} from './GameStorage.sol';
import {SafeMath} from '@openzeppelin/contracts/math/SafeMath.sol';
import {Initializable} from '@openzeppelin/upgrades/contracts/Initializable.sol';
import {Types} from './lib/Types.sol';
import {Discovery} from './Discovery.sol';
import {ITreasury} from './interfaces/ITreasury.sol';
import {ISolar} from './interfaces/ISolar.sol';
import {ISat} from './interfaces/ISat.sol';
import {PlanetManager} from './PlanetManager.sol';
import {GameStorage} from './GameStorage.sol';

/**
 * @title Operation
 * @author Big Beluga
 *
 * Primary public function for entering into the protocol
 */
contract GameOperations is Initializable, Discovery {
    using SafeMath for uint256;
    ISolar solar;
    ISat sats;
    PlanetManager pm;
    // // ============ Constants ============
    // event LogMove(uint8 quadrant, uint8 district, uint8 sector, uint256 star);
    // event LogStarSystemDiscovery(address indexed to, uint8 systemType);
    // event LogBattle(bool result, uint256 attackersHealth, uint256 defendersHealth);
    // event LogPlanetProxyCreated(address proxy, uint256 tokenId);
    // event Random(uint256 random);
    // event LogRound(uint256 aDamage, uint256 dDamage, uint256 aHealth, uint256 dHealth);
    // event BattleStarted(
    //     address attacker,
    //     uint256 attackerOffense,
    //     uint256 attackerDefense,
    //     address defender,
    //     uint256 defenderOffense,
    //     uint256 defenderDefense
    // );

    // struct AttackInfo {
    //     Types.Position attackerPos;
    //     uint256 a_offense;
    //     uint256 a_defense;
    //     uint256[] a_balances;
    //     uint256[] a_ids;
    //     Types.Position defenderPos;
    //     uint256 d_offense;
    //     uint256 d_defense;
    //     uint256[] d_balances;
    //     uint256[] d_ids;
    //     uint256[] d_retreated;
    // }

    // GameStorage GS;
    // ITreasury TS;

    // function initialize(address _gameStorage) public initializer {
    //     GS = GameStorage(_gameStorage);
    //     TS = ITreasury(GS.getTreasuryAddress());
    //     solar = ISolar(GS.getSolarAddress());
    //     sats = ISat(GS.getSatAddress());
    //     pm = PlanetManager(GS.getPlanetManagerAddress());
    // }

    // function move(Types.Position memory to) public {
    //     require(
    //         Types.positionWithinBoundaries(to, GS.getBoundaries()),
    //         'Position must be within set limits of the known universe'
    //     );
    //     Types.Position memory from = GS.getMasterFleetPosition(msg.sender);

    //     if (Types.positionNotSet(from)) {
    //         from = GS.getStartPosition();
    //     }

    //     require(!Types.positionIsEqual(to, from), 'You cannot move to your current location');

    //     GS.setMasterFleetPosition(msg.sender, to);
    //     emit LogMove(to.quadrant, to.district, to.sector, to.star);

    //     if (GS.getStarSystemType(to) == Types.SystemType.Undiscovered) {
    //         explore(to);
    //     }
    // }
}
