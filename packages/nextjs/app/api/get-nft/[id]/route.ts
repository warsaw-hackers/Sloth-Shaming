import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { optimismSepolia } from "viem/chains";
import { returnRating } from "~~/utils/request/rating";

export const dynamic = "force-dynamic";

const ANIMALS = [
  {
    name: "Slow Sloth",
    description:
      "A special edition character that reflects your invoice payment behavior. Taking it slow, just like the laid-back Sloth 🦥.",
    attributes: [
      {
        trait_type: "Category",
        value: "Payment Speed",
      },
      {
        trait_type: "Payment Behavior",
        value: "Slow",
      },
      {
        trait_type: "Animal",
        value: "Sloth",
      },
    ],
    image: "https://lavender-manual-goat-205.mypinata.cloud/ipfs/QmbfwSxAvyJJW5XbnY5Zp8Z3dViumiWYQ1AhAMVRcm8B3B",
  },
  {
    name: "Speedy Cheetah",
    description:
      "A special edition character that reflects your invoice payment behavior. Fast and furious, you're as quick as a Cheetah 🐆.",
    attributes: [
      {
        trait_type: "Category",
        value: "Payment Speed",
      },
      {
        trait_type: "Payment Behavior",
        value: "Fast",
      },
      {
        trait_type: "Animal",
        value: "Cheetah",
      },
    ],
    image: "https://lavender-manual-goat-205.mypinata.cloud/ipfs/QmZV1FASZ4xGVGGVzeZscNF2o2UcEHKaXeZEeLg9hU3wEV",
  },
  {
    name: "Neutral Wolf",
    description:
      "A special edition character that reflects your invoice payment behavior. Always on time, just like the reliable Wolf 🐺.",
    attributes: [
      {
        trait_type: "Category",
        value: "Payment Speed",
      },
      {
        trait_type: "Payment Behavior",
        value: "On Time",
      },
      {
        trait_type: "Animal",
        value: "Wolf",
      },
    ],
    image: "https://lavender-manual-goat-205.mypinata.cloud/ipfs/QmcCYzSuijgxKUb9ft2gJUt9Cpt6NJCA4y1CrZwbcHNP7E",
  },
  {
    name: "Placeholder",
    description:
      "A special edition character representing an unassigned or pending payment behavior. Your journey is still evolving 🕒.",
    attributes: [
      {
        trait_type: "Category",
        value: "Payment Speed",
      },
      {
        trait_type: "Payment Behavior",
        value: "Pending",
      },
      {
        trait_type: "Animal",
        value: "Placeholder",
      },
    ],
    image: "https://lavender-manual-goat-205.mypinata.cloud/ipfs/QmdymxLzqyNtNBWRwHtxvLrqx2QvSSpN9CKRkETW4WtBrZ",
  },
];

const SlothShaming = {
  address: "0xBf8C8Ef202C8D14f8657f6E476c0F115906c773D",
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

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  console.log("🚀 ~ GET ~ params:", params);

  if (!params.id) {
    return new NextResponse("No nft id provided", { status: 400 });
  }

  const publicClient = createPublicClient({
    chain: optimismSepolia,
    transport: http(),
  });

  const data = await publicClient.readContract({
    address: SlothShaming.address,
    abi: SlothShaming.abi,
    functionName: "ownerOf",
    args: [params.id],
  });
  // console.log("🚀 ~ GET ~ data:", data);

  if (!data) {
    return new NextResponse("No walletAddress provided", { status: 400 });
  }
  let rating = await returnRating(data);
  let animalName = "";

  if (rating < 70) {
    animalName = "slow sloth";
  } else if (rating >= 70 && rating < 90) {
    animalName = "neutral wolf";
  } else if (rating >= 90) {
    animalName = "speedy cheetah";
  } else {
    animalName = "placeholder";
  }
  // switch (!!rating) {
  //   case rating < 1:
  //     animalName = "placeholder";
  //   case rating < 70:
  //     animalName = "sloth";
  //   case rating >= 70 && rating < 90:
  //     animalName = "wolf";
  //   case rating >= 90:
  //   default:
  //     animalName = "";
  // }
  console.log("s🚀 ~ GET ~ animalName:", animalName, rating);

  const animalData =
    ANIMALS.find(animal => animal.name.toLowerCase() === animalName.toLowerCase()) || "Animal not found";
  try {
    return NextResponse.json({ animalData, rating, data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error checking wallet" });
  }
}
