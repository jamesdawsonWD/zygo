import { takeSnapshot, revertSnapshot, advanceTime } from '../_utils/evm';
import { SYSTEM_TYPES, SECONDS_IN_DAY, ALL_SHIPS } from '../lib/testValues';
import { createPlanet } from '../_helpers/planetManager';
import {
    planetAddress,
    depositSolar,
    withdrawSolar,
    depositSats,
    withdrawSats,
    getYield
} from '../_helpers/planet';
import { sendSats, mintSolar } from '../_helpers/treasury';
import { setTokenIdToYield } from '../_helpers/gameStorage';
import { solarBalanceOf, solarApprove } from '../_helpers/solar';
import { satBalanceOfBatch, satApproveForAll } from '../_helpers/sat';
import { testMintPlanetToken } from '../_helpers/planetToken';
import truffleAssert from 'truffle-assertions';
import BigNumber from 'bignumber.js';
export default function() {
    contract('Planet', async accounts => {
        // Accounts
        const [Owner, UserA, UserB, UserC, UserD] = accounts;
        const amount = new BigNumber(300000);
        const YEAR = SECONDS_IN_DAY * 365;
        // State snapshotting
        let snapshotId;
        beforeEach(async () => {
            snapshotId = await takeSnapshot(web3);
        });
        afterEach(async () => {
            await revertSnapshot(web3, snapshotId);
        });
        let planetProxy1;
        let planetProxy2;
        let planetProxy3;
        // Setup
        before(async () => {
            await testMintPlanetToken(Owner, 1, Owner);
            await setTokenIdToYield(1, 100, Owner);
            const receipt1 = await createPlanet(1, Owner);
            planetProxy1 = receipt1.logs[0].args.proxy;

            await testMintPlanetToken(UserA, 2, Owner);
            await setTokenIdToYield(2, 671, Owner);
            const receipt2 = await createPlanet(2, Owner);
            planetProxy2 = receipt2.logs[0].args.proxy;

            await testMintPlanetToken(UserB, 3, Owner);
            await setTokenIdToYield(3, 2871, Owner);
            const receipt3 = await createPlanet(3, Owner);
            planetProxy3 = receipt3.logs[0].args.proxy;

            await mintSolar(Owner, amount, Owner);
            await mintSolar(UserA, amount, Owner);
            await mintSolar(UserB, amount, Owner);

            await solarApprove(planetProxy1, amount, Owner);
            await solarApprove(planetProxy2, amount, UserA);
            await solarApprove(planetProxy3, amount, UserB);

            await sendSats(Owner, Object.keys(ALL_SHIPS), Object.values(ALL_SHIPS), Owner);
            await satApproveForAll(planetProxy1, true, Owner);
        });

        it('should deposit solar into the planet', async () => {
            const balanceBefore = await solarBalanceOf(planetProxy1);
            assert.equal(balanceBefore.toString(), 0);

            await depositSolar(planetProxy1, amount, Owner);

            const balanceAfter = await solarBalanceOf(planetProxy1);
            assert.equal(balanceAfter.toString(), amount);
        });
        it('should deposit solar into the second planet', async () => {
            const balanceBefore1 = await solarBalanceOf(planetProxy2);
            assert.equal(balanceBefore1.toString(), 0);

            const balanceBefore2 = await solarBalanceOf(planetProxy3);
            assert.equal(balanceBefore2.toString(), 0);

            await depositSolar(planetProxy2, amount, UserA);
            await depositSolar(planetProxy3, amount, UserB);

            const balanceAfter1 = await solarBalanceOf(planetProxy2);
            assert.equal(balanceAfter1.toString(), amount);

            const balanceAfter2 = await solarBalanceOf(planetProxy3);
            assert.equal(balanceAfter2.toString(), amount);
        });
        it('should withdraw the solar with the reward after the minimum hold period', async () => {
            await depositSolar(planetProxy1, amount, Owner);

            const ownerBalanceBefore = await solarBalanceOf(Owner);
            assert.equal(ownerBalanceBefore.toString(), 0);

            const time = YEAR;

            await advanceTime(time);
            await withdrawSolar(planetProxy1, amount, Owner);

            const planetYield = await getYield(planetProxy1, Owner);
            console.log(planetYield);
            const ownerBalanceAfter = await solarBalanceOf(Owner);

            const percentageOfYear = (time * 100) / YEAR;
            const reward = amount
                .multipliedBy(new BigNumber(planetYield).multipliedBy(percentageOfYear).dividedBy(100))
                .dividedBy(100);

            assert.ok(new BigNumber(ownerBalanceAfter).isEqualTo(reward.plus(amount)));
        });
        // it('should reward the planet if a second despoit is made and also reset the dateLocked', async () => {
        //     const impl = await getPlanetImplementation(Owner);
        //     const planet = await planetAddress();
        //     assert.equal(impl, planet);
        // });

        it('should deposit sats at the planet', async () => {
            const ids = [1, 3, 4, 35];
            const amounts = [5, 4, 2, 1];
            await depositSats(planetProxy1, ids, amounts, Owner);

            const addresses = new Array(ids.length).fill(planetProxy1);
            const balances = await satBalanceOfBatch(addresses, ids, Owner);
            for (let i = 0; i < balances.length; i++) {
                assert.equal(balances[i].toString(), amounts[i]);
            }
            //  assert.equal(impl, planet);
        });
        it('should withdraw sats from the planet', async () => {
            const ids = [1, 3, 4, 35];
            const amounts = [5, 4, 2, 1];
            const addresses = new Array(ids.length).fill(Owner);

            await depositSats(planetProxy1, ids, amounts, Owner);
            const balancesBefore = await satBalanceOfBatch(addresses, ids, Owner);
            for (let i = 0; i < balancesBefore.length; i++) {
                assert.equal(balancesBefore[i].toString(), Object.values(ALL_SHIPS)[ids[i]] - amounts[i]);
            }
            await withdrawSats(planetProxy1, ids, amounts, Owner);
            const balancesAfter = await satBalanceOfBatch(addresses, ids, Owner);
            for (let i = 0; i < balancesAfter.length; i++) {
                assert.equal(balancesAfter[i].toString(), Object.values(ALL_SHIPS)[ids[i]]);
            }
        });
    });
}
