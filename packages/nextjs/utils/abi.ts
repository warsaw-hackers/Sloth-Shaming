const SlothAbi = {
  address: "0x2b39455e2ecbe95a636e53780df64e0bf559ba61",
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_useWorldId",
          type: "bool",
          internalType: "bool",
        },
        {
          name: "_worldId",
          type: "address",
          internalType: "address",
        },
        {
          name: "_appId",
          type: "string",
          internalType: "string",
        },
        {
          name: "_registryId",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "airdrop",
      inputs: [
        {
          name: "_to",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "approve",
      inputs: [
        {
          name: "account",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "balanceOf",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "cancelOwnershipHandover",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "completeOwnershipHandover",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "getApproved",
      inputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "idOf",
      inputs: [
        {
          name: "user",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "isApprovedForAll",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "name",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [
        {
          name: "result",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "ownerOf",
      inputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "ownershipHandoverExpiresAt",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "registerSloth",
      inputs: [
        {
          name: "_proof",
          type: "tuple",
          internalType: "struct SSDataTypes.WorldIdProof",
          components: [
            {
              name: "root",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "signal",
              type: "address",
              internalType: "address",
            },
            {
              name: "nullifierHash",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "proof",
              type: "uint256[8]",
              internalType: "uint256[8]",
            },
          ],
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "requestOwnershipHandover",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "resetBaseUri",
      inputs: [
        {
          name: "_newBaseUri",
          type: "string",
          internalType: "string",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "setApprovalForAll",
      inputs: [
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
        {
          name: "isApproved",
          type: "bool",
          internalType: "bool",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "supportsInterface",
      inputs: [
        {
          name: "interfaceId",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "symbol",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "toggleWorldIdStatus",
      inputs: [
        {
          name: "_newStatus",
          type: "bool",
          internalType: "bool",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "tokenURI",
      inputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "transferOwnership",
      inputs: [
        {
          name: "newOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "useWordlId",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "event",
      name: "Approval",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "account",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ApprovalForAll",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "operator",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "isApproved",
          type: "bool",
          indexed: false,
          internalType: "bool",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipHandoverCanceled",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipHandoverRequested",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "oldOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Transfer",
      inputs: [
        {
          name: "from",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "AccountBalanceOverflow",
      inputs: [],
    },
    {
      type: "error",
      name: "AlreadyInitialized",
      inputs: [],
    },
    {
      type: "error",
      name: "BalanceQueryForZeroAddress",
      inputs: [],
    },
    {
      type: "error",
      name: "NewOwnerIsZeroAddress",
      inputs: [],
    },
    {
      type: "error",
      name: "NoHandoverRequest",
      inputs: [],
    },
    {
      type: "error",
      name: "NotOwnerNorApproved",
      inputs: [],
    },
    {
      type: "error",
      name: "SLOTHS_CANT_SEND_THEIR_REPUTATION",
      inputs: [],
    },
    {
      type: "error",
      name: "TokenAlreadyExists",
      inputs: [],
    },
    {
      type: "error",
      name: "TokenDoesNotExist",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferFromIncorrectOwner",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferToNonERC721ReceiverImplementer",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferToZeroAddress",
      inputs: [],
    },
    {
      type: "error",
      name: "Unauthorized",
      inputs: [],
    },
  ],
  inheritedFunctions: {
    approve: "lib/solady/src/tokens/ERC721.sol",
    balanceOf: "lib/solady/src/tokens/ERC721.sol",
    getApproved: "lib/solady/src/tokens/ERC721.sol",
    isApprovedForAll: "lib/solady/src/tokens/ERC721.sol",
    name: "lib/solady/src/tokens/ERC721.sol",
    ownerOf: "lib/solady/src/tokens/ERC721.sol",
    safeTransferFrom: "lib/solady/src/tokens/ERC721.sol",
    setApprovalForAll: "lib/solady/src/tokens/ERC721.sol",
    supportsInterface: "lib/solady/src/tokens/ERC721.sol",
    symbol: "lib/solady/src/tokens/ERC721.sol",
    tokenURI: "lib/solady/src/tokens/ERC721.sol",
    transferFrom: "lib/solady/src/tokens/ERC721.sol",
    cancelOwnershipHandover: "lib/solady/src/auth/Ownable.sol",
    completeOwnershipHandover: "lib/solady/src/auth/Ownable.sol",
    owner: "lib/solady/src/auth/Ownable.sol",
    ownershipHandoverExpiresAt: "lib/solady/src/auth/Ownable.sol",
    renounceOwnership: "lib/solady/src/auth/Ownable.sol",
    requestOwnershipHandover: "lib/solady/src/auth/Ownable.sol",
    transferOwnership: "lib/solady/src/auth/Ownable.sol",
  },
} as const;
