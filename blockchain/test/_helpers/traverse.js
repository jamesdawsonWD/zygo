import { TraverseC } from '../_utils/artifacts';
import { gameStorageAddress } from './gameStorage';
import { gameEventsManagerAddress } from './gameEventsManager';
export async function traverseAddress() {
    const Traverse = await deployProxy(TraverseC, [gameStorageAddress(), gameEventsManagerAddress()], {
        initializer: false
    });
    return Traverse.address;
}
export async function move(to, from) {
    const Traverse = await TraverseC.deployed();
    return await Traverse.move(to, { from });
}
