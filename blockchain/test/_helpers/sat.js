import { TestSatC } from '../_utils/artifacts';

export async function satAddress() {
    const Sat = await TestSatC.deployed();
    return Sat.address;
}

export async function satApproveForAll(approver, approveBool, from) {
    const Sat = await TestSatC.deployed();
    await Sat.setApprovalForAll(approver, approveBool, {
        from
    });
}
export async function satBalanceOfBatch(accounts, ids, from) {
    const Sat = await TestSatC.deployed();
    return await Sat.balanceOfBatch(accounts, ids, {
        from
    });
}
export async function satBalanceOf(account, id, from) {
    const Sat = await TestSatC.deployed();
    return await Sat.balanceOf(account, id, {
        from
    });
}
