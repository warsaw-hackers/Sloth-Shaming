import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
  11155111: {
    ERC20FeeProxy: {
      address: "0x399F5EE127ce7432E4921a61b8CF52b0af52cbfE",
      abi: [
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "address", name: "tokenAddress", type: "address" },
            { indexed: false, internalType: "address", name: "to", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
            { indexed: true, internalType: "bytes", name: "paymentReference", type: "bytes" },
            { indexed: false, internalType: "uint256", name: "feeAmount", type: "uint256" },
            { indexed: false, internalType: "address", name: "feeAddress", type: "address" },
          ],
          name: "TransferWithReferenceAndFee",
          type: "event",
        },
        {
          inputs: [
            { internalType: "address", name: "_tokenAddress", type: "address" },
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
            { internalType: "bytes", name: "_paymentReference", type: "bytes" },
            { internalType: "uint256", name: "_feeAmount", type: "uint256" },
            { internalType: "address", name: "_feeAddress", type: "address" },
          ],
          name: "transferFromWithReferenceAndFee",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        { stateMutability: "payable", type: "receive" },
      ],
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
