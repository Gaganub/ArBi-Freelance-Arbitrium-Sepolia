// SPDX-License-Identifier: MIT

// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

pragma experimental ABIEncoderV2;

/**
 * @title BasicMulticall
 * @notice Abstract contract providing multicall functionality
 */
abstract contract BasicMulticall {
    
    /**
     * @notice Executes multiple calls in a single transaction
     * @param data Array of encoded function calls
     * @return results Array of return data from each call
     */
    function multicall(bytes[] calldata data) 
        external 
        virtual 
        returns (bytes[] memory results) 
    {
        // Initialize results array with same length as input
        results = new bytes[](data.length);

        // Iterate through all provided calls
        for (uint256 idx = 0; idx < data.length; idx++) {
            // Execute delegatecall and capture result
            (bool isSuccessful, bytes memory returnData) = address(this).delegatecall(data[idx]);

            // Revert if any call fails
            if (!isSuccessful) {
                revert("call failed");
            }

            // Store result in array
            results[idx] = returnData;
        }

        return results;
    }
}
