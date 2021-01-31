pragma solidity 0.7.5;

import './uniswapv2/interfaces/IUniswapV2Factory.sol';
import './uniswapv2/interfaces/IUniswapV2Pair.sol';
import './uniswapv2/libraries/FixedPoint.sol';
import './uniswapv2/libraries/UniswapV2OracleLibrary.sol';
import './uniswapv2/libraries/UniswapV2Library.sol';

// fixed window oracle that recomputes the average price for the entire period once every period
// note that the price average is only guaranteed to be over at least 1 period, but may be over a longer period
contract SimpleOracle {
    using FixedPoint for *;

    uint256 public constant PERIOD = 30 minutes;

    IUniswapV2Pair immutable pair;
    address public immutable token0;
    address public immutable token1;

    uint256 public price0CumulativeLast;
    uint256 public price1CumulativeLast;
    uint32 public blockTimestampLast;
    FixedPoint.uq112x112 public price0Average;
    FixedPoint.uq112x112 public price1Average;
    uint256 public pricePoints;
    uint224 public price0Ema;
    uint224 public price1Ema;

    constructor(
        address factory,
        address tokenA,
        address tokenB
    ) public {
        IUniswapV2Pair _pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, tokenA, tokenB));
        pair = _pair;
        token0 = _pair.token0();
        token1 = _pair.token1();
        price0CumulativeLast = _pair.price0CumulativeLast(); // fetch the current accumulated price value (1 / 0)
        price1CumulativeLast = _pair.price1CumulativeLast(); // fetch the current accumulated price value (0 / 1)
        pricePoints = 1;
        uint112 reserve0;
        uint112 reserve1;
        (reserve0, reserve1, blockTimestampLast) = _pair.getReserves();
        require(reserve0 != 0 && reserve1 != 0, 'SimpleOracle: NO_RESERVES'); // ensure that there's liquidity in the pair
    }

    function update() external {
        (uint256 price0Cumulative, uint256 price1Cumulative, uint32 blockTimestamp) =
            UniswapV2OracleLibrary.currentCumulativePrices(address(pair));
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired

        // ensure that at least one full period has passed since the last update
        require(timeElapsed >= PERIOD, 'SimpleOracle: PERIOD_NOT_ELAPSED');
        pricePoints = pricePoints + 1;

        // overflow is desired, casting never truncates
        // cumulative price is in (uq112x112 price * seconds) units so we simply wrap it after division by time elapsed
        price0Average = FixedPoint.uq112x112(
            uint224((price0Cumulative - price0CumulativeLast) / timeElapsed)
        );
        price1Average = FixedPoint.uq112x112(
            uint224((price1Cumulative - price1CumulativeLast) / timeElapsed)
        );
        // price0Ema = uint224(
        //     ((((consult(token0, 10**18) - price0Ema) * (2 * 10**18)) / (pricePoints + 1) + price0Ema) /
        //         10**18)
        // );
        // price1Ema = uint224(
        //     ((((consult(token1, 10**18) - price1Ema) * (2 * 10**18)) / (pricePoints + 1) + price1Ema) /
        //         10**18)
        // );

        price0CumulativeLast = price0Cumulative;
        price1CumulativeLast = price1Cumulative;
        blockTimestampLast = blockTimestamp;
    }

    // note this will always return 0 before update has been called successfully for the first time.
    function consult(address token, uint256 amountIn) external view returns (uint256 amountOut) {
        if (token == token0) {
            amountOut = price0Average.mul(amountIn).decode144();
        } else {
            require(token == token1, 'SimpleOracle: INVALID_TOKEN');
            amountOut = price1Average.mul(amountIn).decode144();
        }
    }
}
