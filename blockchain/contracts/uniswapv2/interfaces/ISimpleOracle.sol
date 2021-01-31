pragma solidity 0.7.5;
pragma experimental ABIEncoderV2;

interface ISimpleOracle {
    struct uq112x112 {
        uint224 _x;
    }

    function token0() external pure returns (address);

    function token1() external pure returns (address);

    function price0Average() external pure returns (uq112x112 memory);

    function price1Average() external pure returns (uq112x112 memory);

    function consult(address token, uint256 amountIn) external view returns (uint256);

    function update() external;
}
