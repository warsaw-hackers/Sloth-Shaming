"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { exampleTweets } from "./tweets"; // Importing the tweets

import { handleTweet } from "~~/utils/twitter";

const Shame: React.FC = () => {


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">Mint your reputation NFT</span>
      </h1>

          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8 text-center">
            <span className="text-2xl font-semibold">Check reputation</span>
            <div className="flex justify-center items-center mt-4">
              <Image src="/placeholder.jpeg" alt="Sloth" width={200} height={200} />
            </div>
            <div className="flex justify-center items-center mt-4">
              <button className="btn btn-primary" onClick={handleTweet}>
                Shame this sloth!
              </button>
            </div>
          </div>
        
      </div>
  );
};

export default Shame;
