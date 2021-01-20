pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

interface ISimpleOracle {
    struct uq112x112 {
        uint224 _x;
    }

    function token0() external pure returns (address);

    function token1() external pure returns (address);

    function price0Ema() external pure returns (uq112x112 memory);

    function price1Ema() external pure returns (uq112x112 memory);

    function price0Average() external pure returns (uq112x112 memory);

    function price1Average() external pure returns (uq112x112 memory);

    function update() external;
}
