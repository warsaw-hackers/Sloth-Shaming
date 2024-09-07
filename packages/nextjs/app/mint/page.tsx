"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchNFTData } from "../page";
import { useQuery } from "@tanstack/react-query";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { useTheme } from "next-themes";
import { decodeAbiParameters, parseAbiParameters } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { removeSpaces } from "~~/utils";

const Mint: React.FC = () => {
  const { address } = useAccount();
  const [proof, setProof] = useState<string | any>("");
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const { writeContractAsync } = useScaffoldWriteContract("SlothShaming");

  const { data: nftId, isLoading } = useScaffoldReadContract({
    contractName: "SlothShaming",
    functionName: "idOf",
    args: [address],
  });

  // const { data: nftUri, isLoading: isLoadingUri } = useScaffoldReadContract({
  //   contractName: "SlothShaming",
  //   functionName: "tokenURI",
  //   args: [nftId],
  // });

  const {
    data: nftData,
    refetch: refetchNFTuri,
    isFetching: isFetchingNFTData,
  } = useQuery({
    queryKey: ["customData", Number(nftId ?? 0)],
    queryFn: () => fetchNFTData(Number(nftId ?? 0)),
    enabled: typeof nftId == "bigint" ? true : false,
  });
  console.log("🚀 ~ nftData:", nftData);

  useEffect(() => {
    if (nftId) {
      refetchNFTuri();
    }
  }, [nftId]);

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
    <div className="container mx-auto p-8  text-white tracking-tighter">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">Register your reputation</span>
      </h1>

      <div className="flex justify-center items-center">
        {hasMintedNFT && (
          <div className="w-full text-xl max-w-lg bg-[#06B089] shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
            <p>You have already minted your reputation NFT. </p>
          </div>
        )}

        {isEligibleToMint && !proof && (
          <div className="w-full max-w-lg bg-[#06B089] shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
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
          <div className="w-full max-w-lg bg-[#06B089] shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-4 m-4 text-center">
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
          <div className="w-full max-w-lg bg-[#06B089] shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
            <div className="flex flex-col text-center mb-4">
              <span className="text-2xl font-semibold">Mint your reputation NFT</span>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center mt-4">
                <button className="btn btn-primary" disabled={!proof} onClick={handleMint}>
                  Mint
                </button>
              </div>
            </div>
          </div>
        )}

        {hasMintedNFT && (
          <div className="w-full h-[540px] max-w-lg bg-[#06B089] shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8">
            <div className="flex flex-col text-center mb-4">
              <span className="text-3xl font-semibold">Your reputation NFT</span>
            </div>
            <div className="flex justify-center items-center content-center">
              {isFetchingNFTData || !nftData ? (
                <div className="flex flex-col justify-center items-center gap-4 relative h-[320px]">
                  <img
                    src="/assets/question-mark1.svg"
                    className={`${isFetchingNFTData ? "animate-bounce" : "ml-2 mt-20"} `}
                    alt="questionMark1"
                    width={65}
                    height={300}
                  />
                </div>
              ) : (
                <Image
                  src={`/assets/${
                    nftData?.animalData ? removeSpaces(nftData.animalData.name).toLowerCase() : "slowsloth"
                  }.svg`}
                  height={200}
                  width={200}
                  className="ml-4"
                  alt="home-page"
                />
              )}
            </div>
            <div className="flex justify-between mt-4">
              {nftData?.rating && (
                <div className="text-white tracking-tighter justify-center flex flex-col gap-0 -space-y-2">
                  {/* <p>Rank: {nftData?.animalData.name ? nftData.animalData.name : "Sloth"}</p>  */}
                  <p className="text-lg">Rating: {nftData?.rating ? nftData.rating : 0}/100 </p>
                </div>
              )}
              <ul className="text-white tracking-tighter justify-end items-start flex flex-col gap-0 space-y-0">
                {nftData &&
                  nftData.animalData?.attributes?.map((attr: any) => {
                    return (
                      <li className="text-lg">
                        {attr.trait_type} : {attr.value}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mint;
