"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { exampleTweets } from "./tweets"; // Importing the tweets

import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Shame: React.FC = () => {
  const [hasNft, setHasNft] = useState(false);


  // const { data, isLoading } = 
  useScaffoldReadContract({
    contractName: "SlothShaming",
    functionName: "idOf",
  });

  const handleTweet = () => {
    let tweetText = generateTweet();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
  };

  const generateTweet = () => {
    // Select a random tweet from exampleTweets array
    const randomIndex = Math.floor(Math.random() * exampleTweets.length);
    return exampleTweets[randomIndex];
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-4xl font-bold">Mint your reputation NFT</span>
      </h1>

      <div className="flex justify-center items-center">
        {hasNft && (
          <div className="w-full max-w-lg bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8 m-8 text-center">
            <span className="text-2xl font-semibold">Reputation dashboard</span>
            <div className="flex justify-center items-center mt-4">
              <Image src="/placeholder.jpeg" alt="Sloth" width={200} height={200} />
            </div>
            <div className="flex justify-center items-center mt-4">
              <button className="btn btn-primary" onClick={handleTweet}>
                Share on Twitter
              </button>
            </div>
          </div>
        )}
        {!hasNft && (
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
        )}
      </div>
    </div>
  );
};

export default Shame;
