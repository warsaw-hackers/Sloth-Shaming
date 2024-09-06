//SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.26;

import {ERC20FeeProxy} from "@request/contracts/ERC20FeeProxy.sol";

/**
 * @title ReqPay
 * @notice Request handling
 * @author https://x.com/0xjsieth
 *
 */
contract ReqPay {
    ERC20FeeProxy public feeProxy;

    constructor (address payable _feeProxy) {
        feeProxy = ERC20FeeProxy(_feeProxy);
    }

    function pay(
        address _tokenAddress,
        address _to,
        uint256 _amount,
        bytes calldata _paymentReference,
        uint256 _feeAmount,
        address _feeAddress
    ) external payable {
        feeProxy.transferFromWithReferenceAndFee(
            _tokenAddress,
            _to,
            _amount,
            _paymentReference,
            _feeAmount,
            _feeAddress
        );
    }

    function reqLookUp() external {}
}
