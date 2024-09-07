"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { usePinataRetrieveData } from "~~/hooks/usePinataRetrieveData";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [cid, setCid] = useState("QmdymxLzqyNtNBWRwHtxvLrqx2QvSSpN9CKRkETW4WtBrZ");
  const { data, isFetching } = usePinataRetrieveData(cid, connectedAddress!);
  console.log("data", data);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <div>
            {" "}
            {data && (
              <div className="my-4">
                <img src={`data:image/svg+xml;base64,${btoa(data)}`} alt="SVG from IPFS" className="w-8 h-8" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
