"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IDKitWidget, // , ISuccessResult, useIDKit
} from "@worldcoin/idkit";
import { useTheme } from "next-themes";
import { decodeAbiParameters, parseAbiParameters } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Mint: React.FC = () => {
  const { address } = useAccount();
  const [proof, setProof] = useState<string | any>("");
  const { resolvedTheme } = useTheme();
  const [hasNft, setHasNft] = useState(false);
  const isDarkMode = resolvedTheme === "dark";
  const { writeContractAsync } = useScaffoldWriteContract("SlothShaming");

  const handleMint = async () => {
    if (!proof) {
      return;
    }

    let transformedProof = {
      root: BigInt(proof!.merkle_root),
      signal: address,
      nullifierHash: BigInt(proof!.nullifier_hash),
      proof: decodeAbiParameters(parseAbiParameters("uint256[8]"), proof!.proof as `0x${string}`)[0],
    };

    await writeContractAsync({
      functionName: "registerSloth",
      args: [proof],
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">Register your reputation</span>
      </h1>

      <div className="flex justify-center items-center">
        {hasNft && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
            <p>You have already minted your reputation NFT. </p>
          </div>
        )}
        {!hasNft && !proof && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
            <p>We use Worldcoin World ID to verify your identity. Please sign in to continue. </p>
            <IDKitWidget
              app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
              action={process.env.NEXT_PUBLIC_ACTION_CREATE as string}
              signal={address} // proof will only verify if the signal is unchanged, this prevents tampering
              onSuccess={setProof} // use onSuccess to call your smart contract
              // no use for handleVerify, so it is removed
              // use default verification_level (orb-only), as device credentials are not supported on-chain
            >
              {({ open }) => (
                <button className="btn btn-primary" onClick={open}>
                  Verify with World ID
                </button>
              )}
            </IDKitWidget>
            <p>Powered by: </p>
            <div>
              {isDarkMode ? (
                <Image src="/Worldcoin-logo-lockup-light.svg" alt="Worldcoin Logo" width={200} height={200} />
              ) : (
                <Image src="/Worldcoin-logo-lockup-dark.svg" alt="Worldcoin Logo" width={200} height={200} />
              )}
            </div>
          </div>
        )}
        {!hasNft && proof && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
            <p>You have verified with World ID. </p>

            <p>Powered by: </p>
            <div>
              {isDarkMode ? (
                <Image src="/Worldcoin-logo-lockup-light.svg" alt="Worldcoin Logo" width={200} />
              ) : (
                <Image src="/Worldcoin-logo-lockup-dark.svg" alt="Worldcoin Logo" width={200} />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        {!hasNft && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
            <div className="flex flex-col text-center mb-4">
              <span className="text-2xl font-semibold">Mint your reputation NFT</span>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center mt-4">
                <button className="btn btn-primary" disabled={!proof || hasNft} onClick={handleMint}>
                  Mint
                </button>
              </div>
            </div>
          </div>
        )}
        {hasNft && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
            <div className="flex flex-col text-center mb-4">
              <span className="text-2xl font-semibold">Your reputation NFT</span>
            </div>
            <div className="flex justify-center items-center">
              <Image src="/placeholder.jpeg" alt="Sloth" width={200} height={200} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mint;
