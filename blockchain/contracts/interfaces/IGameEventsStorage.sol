// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

interface IGameEventsStorage {
    /**** Get Methods ***********/

    /// @param _key The key for the record
    function getAddress(bytes32 _key) external view returns (address);

    /// @param _key The key for the record
    function getUint(bytes32 _key) external view returns (uint256);

    /// @param _key The key for the record
    function getString(bytes32 _key) external view returns (string memory);

    /// @param _key The key for the record
    function getBytes(bytes32 _key) external view returns (bytes memory);

    /// @param _key The key for the record
    function getBool(bytes32 _key) external view returns (bool);

    /// @param _key The key for the record
    function getInt(bytes32 _key) external view returns (int256);

    function getUint8(bytes32 _key) external view returns (uint8);

    function getUint16(bytes32 _key) external view returns (uint16);

    /**** Set Methods ***********/

    /// @param _key The key for the record
    function setAddress(bytes32 _key, address _value) external;

    /// @param _key The key for the record
    function setUint(bytes32 _key, uint256 _value) external;

    /// @param _key The key for the record
    function setString(bytes32 _key, string memory _value) external;

    /// @param _key The key for the record
    function setBytes(bytes32 _key, bytes memory _value) external;

    /// @param _key The key for the record
    function setBool(bytes32 _key, bool _value) external;

    /// @param _key The key for the record
    function setInt(bytes32 _key, int256 _value) external;

    /// @param _key The key for the record
    function setUint8(bytes32 _key, uint8 _value) external;

    /// @param _key The key for the record
    function setUint16(bytes32 _key, uint16 _value) external;

    /**** Delete Methods ***********/

    /// @param _key The key for the record
    function deleteAddress(bytes32 _key) external;

    /// @param _key The key for the record
    function deleteUint(bytes32 _key) external;

    /// @param _key The key for the record
    function deleteString(bytes32 _key) external;

    /// @param _key The key for the record
    function deleteBytes(bytes32 _key) external;

    /// @param _key The key for the record
    function deleteBool(bytes32 _key) external;

    /// @param _key The key for the record
    function deleteInt(bytes32 _key) external;

    /// @param _key The key for the record
    function deleteUint8(bytes32 _key) external;

    /// @param _key The key for the record
    function deleteUint16(bytes32 _key) external;
}
