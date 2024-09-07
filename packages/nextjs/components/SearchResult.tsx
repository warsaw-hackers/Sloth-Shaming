import Image from "next/image";
import { truncateAddress } from "~~/utils";
import { handleTweet } from "~~/utils/twitter";

interface SearchResultProps {
  title: string;
  score: number;
  address: string;
  imageUrl: string;
  ensName: string;
  isLoading: boolean;
}

export function SearchResult({ title, address, score, imageUrl, ensName, isLoading }: SearchResultProps) {
  return (
    <div className="card w-[600px] h-[450px] z-0 flex gap-8 py-8 px-6 flex-row bg-[#06B089] shadow-xl">
      <div className="card-body flex flex-col justify-between">
        <h2 className="card-title font-pixel text-[64px] leading-[66px]">{isLoading ? "Searching..." : title}</h2>
        <div>
          <div className="flex gap-4 mt-6  justify-center items-center">
            <p className="text-xl">ADDRESS:</p>{" "}
            <span className="text-xl">{address ? truncateAddress(address) : ""}</span>
          </div>
          <div className="flex gap-4  justify-center items-center">
            <p className="text-xl whitespace-nowrap">ENS ADDRESS:</p>{" "}
            <span className="text-xl">{score && ensName ? ensName : ""}</span>
          </div>
          <div className="flex gap-4   justify-center items-center">
            <p className="text-xl">SCORE:</p>
            {/* <span className="text-xl">{score ? `${score}/100` : ""}</span> */}
            {score && (
              //   <progress
              //     className="h-2 w-full progress-unfilled:bg-[#F2F2F2] progress-filled:bg-[#005F49]"
              //     value={score ? score : 0}
              //     max="100"
              //   >
              //     {score ? score : 0}
              //   </progress>
              <input
                type="range"
                min={0}
                value={score ? score : 0}
                max="100"
                className="range [--range-shdw:#005F49]"
              />
            )}
          </div>
        </div>
        {title === "Sloth" && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Shame</button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 justify-center items-center relative">
        {isLoading && (
          <div className="flex flex-col gap-4 relative">
            <img
              src="/assets/question-mark1.svg"
              className={`${isLoading ? "animate-bounce" : ""} mr-8 mt-32`}
              alt="questionMark1"
              width={65}
              height={120}
            />

            {/* <img
              src="/assets/question-mark2.svg"
              className={`${isLoading ? "animate-bounce" : ""} `}
              alt="questionMark2"
              width={55}
              height={115}
            /> */}
          </div>
        )}
        <figure className="bg-transparent mt-12 ">
          {!isLoading && (
            <Image src={imageUrl} alt={title} width={200} height={500} className="z-40 stroke-slate-50 fill-current" />
          )}
        </figure>
        {title === "Sloth" && (
          <button
            className="btn mt-4 bg-[#FE8731] hover:bg-[#E16811] border-none text-white"
            onClick={() => {
              handleTweet();
            }}
          >
            Shame
          </button>
        )}
      </div>
    </div>
  );
}
