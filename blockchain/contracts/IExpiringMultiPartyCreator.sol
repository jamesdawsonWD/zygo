pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

interface IExpiringMultiPartyCreator {
    struct FixedPoint {
        uint256 rawValue;
    }
    struct Params {
        uint256 expirationTimestamp;
        address collateralAddress;
        bytes32 priceFeedIdentifier;
        string syntheticName;
        string syntheticSymbol;
        FixedPoint collateralRequirement;
        FixedPoint disputeBondPct;
        FixedPoint sponsorDisputeRewardPct;
        FixedPoint disputerDisputeRewardPct;
        FixedPoint minSponsorTokens;
        uint256 withdrawalLiveness;
        uint256 liquidationLiveness;
        address excessTokenBeneficiary;
    }

    function createExpiringMultiParty(Params memory params) external returns (address);
}
