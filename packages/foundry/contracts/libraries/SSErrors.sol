//SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

import {ERC721} from "@solady/contracts/tokens/ERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title Rep
 * @notice Sloth Shaming errors
 * @author https://x.com/0xjsieth
 *
 */
library SSErrors {
    // For transaction override
    error SLOTHS_CANT_SEND_THEIR_REPUTATION();
}