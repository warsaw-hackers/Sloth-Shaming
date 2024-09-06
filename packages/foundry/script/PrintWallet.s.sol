//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";

contract PrintWallet is Script {
    address wallet = vm.addr(vm.envUint("DEPLOYER_PRIVATE_KEY"));

    function run() external view {
        console.log(wallet);
    }
}