// SPDX-License-Identifier: MIT

// Governable.sol - Provides a governance address and related access control modifier.
// Author: Gaganub

pragma solidity 0.6.12;

contract Governable {
    /// @notice Address of the current governance owner
    address public gov;

    // ========= Constructor =========
    constructor() public {
        gov = msg.sender;
    }

    // ========= Modifiers =========

    /// @notice Ensures that only the governance address is allowed
    modifier onlyGov() {
        require(msg.sender == gov, "Governable: forbidden");
        _;
    }

    // ========= Governance Functions =========

    /// @notice Sets a new governance address
    /// @param _gov The new governance address
    function setGov(address _gov) external onlyGov {
        gov = _gov;
    }
}

// EOF
