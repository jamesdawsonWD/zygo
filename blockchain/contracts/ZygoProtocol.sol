pragma solidity 0.7.5;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './ZygoToken.sol';
import './uniswapv2/interfaces/IUniswapV2Pair.sol';
import './uniswapv2/interfaces/ISimpleOracle.sol';
import './uniswapv2/interfaces/IWETH.sol';
import './interfaces/ILendingPool.sol';

contract ZygoProtocol is Ownable {
    // constants
    uint256 public constant FIX_REWARD = 5 ether;
    uint256 public constant BURN_RATE = 2 ether;

    event NewOrder(uint256 indexed orderId);
    event Test(uint256 indexed start, uint256 end, uint256 price, uint256 zygo);
    event FillOrder(
        address indexed filledBy,
        address indexed owner,
        uint256 fillAmount,
        uint256 recievedAmount,
        uint256 reward
    );
    struct Order {
        address creator;
        address from;
        uint256 fromAmount;
        address to;
        uint256 toAmount;
        uint256 id;
        bool closed;
    }

    enum LendingPool {Aave}

    struct Receipt {
        uint256 locked;
        uint256 aTokens;
        address receipient;
    }

    ZygoToken zygo;
    IWETH weth;
    ISimpleOracle oracle;
    ILendingPool aave;
    Order[] public orders;
    uint256 public feeSMA;
    uint256 public totalFills;
    mapping(address => uint256[]) addressToOrders;
    mapping(uint256 => Receipt) receipts;

    constructor(
        address _zygoToken,
        address _weth,
        address _aave,
        address _simpleOracle
    ) public {
        zygo = ZygoToken(_zygoToken);
        weth = IWETH(_weth);
        oracle = ISimpleOracle(_simpleOracle);
        aave = ILendingPool(_aave);
        feeSMA = 1 ether;
        totalFills = 0;
    }

    /**
        @dev creates an order
        @param _to - the token the sender wishes to
     */
    function _create(
        address _from,
        uint256 _fromAmount,
        address _to,
        uint256 _toAmount
    ) private returns (uint256) {
        IERC20 from = IERC20(_from);
        from.transferFrom(msg.sender, address(this), _fromAmount);
        zygo.transferFrom(msg.sender, address(this), feeSMA + BURN_RATE);
        Order memory order =
            Order({
                creator: msg.sender,
                from: _from,
                fromAmount: _fromAmount,
                to: _to,
                toAmount: _toAmount,
                id: orders.length,
                closed: false
            });
        orders.push(order);
        addressToOrders[msg.sender].push(orders.length - 1);
        emit NewOrder(orders.length - 1);
        return orders.length;
    }

    /**
        @dev creates an order
        @param _to - the token the sender wishes to
     */
    function createWithAave(
        address _from,
        uint256 _fromAmount,
        address _to,
        uint256 _toAmount
    ) external returns (uint256) {
        uint256 orderId = _create(_from, _fromAmount, _to, _toAmount);
        aave.deposit(_from, _fromAmount, msg.sender, 0);
        receipts[orderId] = Receipt({aTokens: _fromAmount, locked: block.timestamp, receipient: msg.sender});
    }

    function _fill(Order memory order) private {
        // start counting the gas cost
        uint256 gasStart = gasleft();

        IERC20 from = IERC20(order.from);
        IERC20 to = IERC20(order.to);

        to.transferFrom(msg.sender, order.creator, order.toAmount);
        from.transferFrom(address(this), msg.sender, order.fromAmount);

        order.closed = true;

        uint256 wethToZygo = oracle.consult(address(weth), 1 ether);
        totalFills = totalFills + 1;

        //end of gas compensation
        uint256 gasEnd = gasleft();
        uint256 reward = (((gasStart - gasEnd) * tx.gasprice) * wethToZygo) / 1 ether + FIX_REWARD;

        zygo.mint(msg.sender, reward);
        feeSMA = feeSMA + reward / totalFills;

        emit FillOrder(msg.sender, order.creator, order.toAmount, order.fromAmount, reward);
    }

    function fillOrder(uint256 _orderId) external {
        Receipt memory _receipt = receipts[_orderId];
        Order memory _order = orders[_orderId];
        aave.withdraw(_order.from, _receipt.aTokens, _receipt.receipient);
        _fill(_order);
    }
}
