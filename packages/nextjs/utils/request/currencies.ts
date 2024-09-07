import { Types } from "@requestnetwork/request-client.js";

export const currencies = [
  {
    symbol: "FAU",
    address: "0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C",
    network: "sepolia",
    decimals: 18,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "USDC",
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    network: "sepolia",
    decimals: 6,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "cUSD",
    address: "0x765de816845861e75a25fca122bb6898b8b1282a",
    network: "celo",
    decimals: 6,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "CELO",
    address: "0x471EcE3750Da237f93B8E339c536989b8978a438",
    network: "celo",
    decimals: 18,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "mUSD",
    address: "0xab575258d37EaA5C8956EfABe71F4eE8F6397cF3",
    network: "mantle",
    decimals: 6,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "USDC",
    address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    network: "optimism",
    decimals: 6,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
];
