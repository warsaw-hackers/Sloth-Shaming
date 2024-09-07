"use server";

import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_IPFS_GATEWAY,
});

export async function getPinataData(cid: string) {
  try {
    const data = await pinata.gateways.get(cid);
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching Pinata data:", error);
    return { success: false, error: "Failed to fetch Pinata data" };
  }
}
