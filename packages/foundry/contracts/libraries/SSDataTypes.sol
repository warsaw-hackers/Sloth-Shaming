// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

/**
 * @title SSDataTypes
 * @author SlothShaming Technical Team
 * @notice Library containing SlothShaming contracts' custom DataTypes
 *
 */
library SSDataTypes {
        /**
     * @notice
     *  Custom datatype to handle world id proof
     *
     * @param root The root of the Merkle tree (returned by the JS widget).
     * @param signal signal An arbitrary input from the user, usually the user's wallet address
     * @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget)
     * @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
     *
     */
    struct WorldIdProof {
        uint256 root;
        address signal;
        uint256 nullifierHash;
        uint256[8] proof;
    }
}