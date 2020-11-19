import {TransparentUpgradeableProxy} from '@openzeppelin/contracts/proxy/TransparentUpgradeableProxy.sol';

contract PROXY_GE_Discover_1_F_Destroyer is TransparentUpgradeableProxy {
    constructor(address _logic, address _admin) public TransparentUpgradeableProxy(_logic, _admin, '') {}
}
