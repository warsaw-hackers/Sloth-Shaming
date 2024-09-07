//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import {SlothShaming} from "contracts/SlothShaming.sol";

contract DeployScript is ScaffoldETHDeploy {
    SlothShaming slothShaming;

    uint256 pkey = vm.envUint("DEPLOYER_PRIVATE_KEY");
    string appId = vm.envString("APP_ID");
    string actionId = vm.envString("ACTION_ID");
    address worldId = vm.envAddress("WORLD_ID_ADDRESS");

    bool usesWorldId = false;

    function run() external {
        vm.startBroadcast(pkey);
        slothShaming = new SlothShaming(
            usesWorldId,
            worldId,
            appId,
            actionId
        );
        vm.stopBroadcast();

        exportDeployments();
    }
}
