pragma solidity 0.6.12;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './ZygoToken.sol';
import './uniswapv2/interfaces/IUniswapV2Pair.sol';
import './uniswapv2/interfaces/ISimpleOracle.sol';

contract ZygoProtocol is Ownable {
    // constants
    uint256 public constant MIN_GAS_FEE = 20000000;
    uint256 public constant MIN_REWARD_FEE = 20000000;
    uint256 public constant BONUS_MULTIPLIER = 10;
    uint256 public constant FILL_REWARD = 100000000;
    event NewOrder(uint256 indexed orderId);
    event FillOrder(
        address indexed filledBy,
        address indexed owner,
        uint256 fillAmount,
        uint256 recievedAmount,
        uint256 reward
    );
    event Test(uint256 indexed price);
    struct Order {
        address creator;
        address from;
        uint256 fromAmount;
        address to;
        uint256 toAmount;
        uint256 rewardFee;
        bool closed;
    }

    ZygoToken zygo;
    IUniswapV2Pair ethZygoPair;
    Order[] orders;

    uint256 public price0CumulativePrevious;
    uint256 public price1CumulativePrevious;
    uint32 public blockTimestampPrevious;

    mapping(address => uint256[]) addressToOrders;

    constructor(
        address _zygoToken,
        address _ethZygoPair,
        address _simpleOracle
    ) public {
        zygo = ZygoToken(_zygoToken);
        ethZygoPair = IUniswapV2Pair(_ethZygoPair);
        blockTimestampPrevious = uint32(block.timestamp);
        price0CumulativePrevious = ethZygoPair.price0CumulativeLast();
        price1CumulativePrevious = ethZygoPair.price1CumulativeLast();
    }

    /**
        @dev creates an order
        @param _to - the token the sender wishes to
     */
    function createOrder(
        address _from,
        uint256 _fromAmount,
        address _to,
        uint256 _toAmount,
        uint256 _rewardFee
    ) public {
        require(_rewardFee > MIN_REWARD_FEE, 'Reward fee too small');

        IERC20 from = IERC20(_from);
        from.transferFrom(msg.sender, address(this), _fromAmount);
        zygo.transferFrom(msg.sender, address(this), _rewardFee);

        Order memory order =
            Order({
                creator: msg.sender,
                from: _from,
                fromAmount: _fromAmount,
                to: _to,
                toAmount: _toAmount,
                rewardFee: _rewardFee,
                closed: false
            });
        orders.push(order);
        addressToOrders[msg.sender].push(orders.length);

        emit NewOrder(orders.length);
    }

    function fillOrder(uint256 _orderId) public {
        Order memory order = orders[_orderId];

        IERC20 from = IERC20(order.from);
        IERC20 to = IERC20(order.to);

        uint32 timestamp = uint32(block.timestamp);
        uint256 price0CumulativeLastest = ethZygoPair.price0CumulativeLast();
        uint256 price =
            (price0CumulativeLastest - price0CumulativePrevious) / (timestamp - blockTimestampPrevious);

        to.transferFrom(msg.sender, order.creator, order.toAmount);
        from.transferFrom(address(this), msg.sender, order.fromAmount);
        zygo.transferFrom(address(this), msg.sender, order.rewardFee);

        price0CumulativePrevious = price0CumulativeLastest;
        blockTimestampPrevious = timestamp;

        order.closed = true;
        orders[_orderId] = order;

        emit FillOrder(msg.sender, order.creator, order.toAmount, order.fromAmount, order.rewardFee);
    }
}
