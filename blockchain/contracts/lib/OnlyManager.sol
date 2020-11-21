pragma solidity 0.6.12;

contract Manageble {
    modifier onlyManager(address manager) {
        require(msg.sender == manager, 'Only manager can access this');
        _;
    }
}
