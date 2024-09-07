"use client";

import React, { useState } from "react";

import {
  IDKitWidget
} from "@worldcoin/idkit";
import { useTheme } from "next-themes";
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { decodeAbiParameters, parseAbiParameters } from "viem";
import { useAccount } from "wagmi";
import {VerificationLevel} from "@worldcoin/idkit";

const Mint: React.FC = () => {
  const { address } = useAccount();
  const [proof, setProof] = useState<string | any>("");
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const { writeContractAsync } = useScaffoldWriteContract("SlothShaming");

  const { data: nftId, isLoading } = useScaffoldReadContract({
    contractName: "SlothShaming",
    functionName: "idOf",
    args: [address]
  });


  const { data: nftUri, isLoading: isLoadingUri } = useScaffoldReadContract({
    contractName: "SlothShaming",
    functionName: "tokenURI",
    args: [nftId]
  });

  // Descriptive variables
  const hasMintedNFT = nftId !== 0n && !isLoading;
  const isEligibleToMint = nftId === 0n && !isLoading;

  const handleMint = async () => {
    // Dummy proof
    let transformedProof = {
      root: BigInt(0),
      signal: "0x0000000000000000000000000000000000000000",
      nullifierHash: BigInt(0),
      proof: Array(8).fill(BigInt(0)),
    };

    // If the proof is available, use it.
    if (proof) {
      transformedProof = {
        root: BigInt(proof!.merkle_root),
        signal: address,
        nullifierHash: BigInt(proof!.nullifier_hash),
        proof: decodeAbiParameters(parseAbiParameters("uint256[8]"), proof!.proof as `0x${string}`)[0],
      };
    }
    await writeContractAsync({
      functionName: "registerSloth",
      args: [transformedProof],
    });
  };
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">Register your reputation</span>
      </h1>

      <div className="flex justify-center items-center">
        {hasMintedNFT && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
            <p>You have already minted your reputation NFT. </p>
          </div>
        )}

        {isEligibleToMint && !proof && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
            <p>We use Worldcoin World ID to verify your identity. Please sign in to continue. </p>
            <IDKitWidget
              app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
              action={process.env.NEXT_PUBLIC_ACTION_CREATE as string}
              verification_level={VerificationLevel.Device}
              signal={address}
              onSuccess={setProof}
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

                <img src="/Worldcoin-logo-lockup-light.svg" alt="Worldcoin Logo" className="w-200" />
              ) : (
                <img src="/Worldcoin-logo-lockup-dark.svg" alt="Worldcoin Logo" className="w-200" />
              )}
            </div>
          </div>
        )}

        {isEligibleToMint && proof && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
            <p>You have verified with World ID. </p>
            <p>Powered by: </p>
            <div>
              {isDarkMode ? (

                <img src="/Worldcoin-logo-lockup-light.svg" alt="Worldcoin Logo" className="w-200" />
              ) : (
                <img src="/Worldcoin-logo-lockup-dark.svg" alt="Worldcoin Logo" className="w-200" />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        {isEligibleToMint && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
            <div className="flex flex-col text-center mb-4">
              <span className="text-2xl font-semibold">Mint your reputation NFT</span>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center mt-4">
                <button className="btn btn-primary" 
                  disabled={!proof} 
                  onClick={handleMint}>
                  Mint
                </button>
              </div>
            </div>
          </div>
        )}


        {hasMintedNFT && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
            <div className="flex flex-col text-center mb-4">
              <span className="text-2xl font-semibold">Your reputation NFT</span>
            </div>
            <div className="flex justify-center items-center">
            <img src="/placeholder.jpeg" alt="Sloth" className="w-200" />

            </div>
            <p>Token URI: {nftUri}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mint;
