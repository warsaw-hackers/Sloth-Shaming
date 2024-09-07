"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useDebounce } from "react-use";
import { Address, isAddress } from "viem";
import { useAccount, useEnsName } from "wagmi";
import { SearchResult } from "~~/components/SearchResult";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { removeSpaces } from "~~/utils";

export async function fetchNFTData(id: number) {
  const response = await fetch(`/api/get-nft/${id}`);
  console.log("🚀 ~ fetchNFTData ~ response:", response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isSearchClick, setIsSearchClick] = useState(false);
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(value);
    },
    500,
    [value],
  );
  const {
    data: balance,
    refetch: refetchUserNft,
    isFetching: isFetchingNFT,
  } = useScaffoldReadContract({
    contractName: "SlothShaming",
    functionName: "idOf",
    args: [value],
  });

  // const { data: nftUri, refetch: refetchNFTuri } = useScaffoldReadContract({
  //   contractName: "SlothShaming",
  //   functionName: "tokenURI",
  //   args: [balance],
  // });

  const {
    data: nftData,
    refetch: refetchNFTuri,
    isFetching: isFetchingNFTData,
  } = useQuery({
    queryKey: ["customData", Number(balance ?? 0)],
    queryFn: () => fetchNFTData(Number(balance ?? 0)),
    enabled: typeof balance == "bigint" && isSearchClick ? true : false,
  });

  const {
    data: ensName,
    isLoading: isEnsNameLoading,
    isError: isEnsNameError,
    isSuccess: isEnsNameSuccess,
  } = useEnsName({
    address: debouncedValue as Address,
    chainId: 1,
    query: {
      enabled: isAddress(debouncedValue),
      gcTime: 30_000,
    },
  });

  // const { data, isFetching } = usePinataRetrieveData(nftData?.animalData?.image!, value!, isSearchClick);

  console.log("🚀 ~ nftUri:", balance);
  console.log("🚀 ~ nftData:", nftData);
  useEffect(() => {
    refetchUserNft();
  }, [isSearchClick]);

  useEffect(() => {
    if (balance) {
      refetchNFTuri();
    }
  }, [balance]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 gap-6 text-white">
        <div className="flex gap-4 flex-col justify-center items-center w-[290px]">
          <AddressInput onChange={setValue} value={value} placeholder="Enter wallet address" />
        </div>

        <SearchResult
          title={nftData ? nftData?.animalData.name : "Unknown"}
          address={nftData ? nftData.data : null}
          // name={}
          ensName={ensName ? ensName : ""}
          imageUrl={`/assets/${
            nftData?.animalData?.name ? removeSpaces(nftData?.animalData?.name).toLowerCase() : "placeholder"
          }.svg`}
          score={nftData ? nftData.rating : null}
          isLoading={isFetchingNFTData}
        />

        <div className="">
          <button
            onClick={() => {
              setIsSignedUp(false);
              cancel();
            }}
          ></button>
        </div>
      </div>
    </>
  );
};

export default Home;
