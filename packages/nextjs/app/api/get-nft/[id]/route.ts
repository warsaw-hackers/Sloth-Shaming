import { NextRequest, NextResponse } from "next/server";
import { returnRating } from "~~/utils/request/rating";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const dynamic = "force-dynamic";

const ANIMALS = [
  {
    name: "Sloth",
    description:
      "A special edition character that reflects your invoice payment behavior. Taking it slow, just like the laid-back Sloth 🦥.",
    attributes: [
      {
        trait_type: "Category",
        value: "Payment Speed",
      },
      {
        trait_type: "Payment Behavior",
        value: "Slow",
      },
      {
        trait_type: "Animal",
        value: "Sloth",
      },
    ],
    image: "https://lavender-manual-goat-205.mypinata.cloud/ipfs/QmbfwSxAvyJJW5XbnY5Zp8Z3dViumiWYQ1AhAMVRcm8B3B",
  },
  {
    name: "Cheetah",
    description:
      "A special edition character that reflects your invoice payment behavior. Fast and furious, you're as quick as a Cheetah 🐆.",
    attributes: [
      {
        trait_type: "Category",
        value: "Payment Speed",
      },
      {
        trait_type: "Payment Behavior",
        value: "Fast",
      },
      {
        trait_type: "Animal",
        value: "Cheetah",
      },
    ],
    image: "https://lavender-manual-goat-205.mypinata.cloud/ipfs/QmZV1FASZ4xGVGGVzeZscNF2o2UcEHKaXeZEeLg9hU3wEV",
  },
  {
    name: "Wolf",
    description:
      "A special edition character that reflects your invoice payment behavior. Always on time, just like the reliable Wolf 🐺.",
    attributes: [
      {
        trait_type: "Category",
        value: "Payment Speed",
      },
      {
        trait_type: "Payment Behavior",
        value: "On Time",
      },
      {
        trait_type: "Animal",
        value: "Wolf",
      },
    ],
    image: "https://lavender-manual-goat-205.mypinata.cloud/ipfs/QmcCYzSuijgxKUb9ft2gJUt9Cpt6NJCA4y1CrZwbcHNP7E",
  },
  {
    name: "Placeholder",
    description:
      "A special edition character representing an unassigned or pending payment behavior. Your journey is still evolving 🕒.",
    attributes: [
      {
        trait_type: "Category",
        value: "Payment Speed",
      },
      {
        trait_type: "Payment Behavior",
        value: "Pending",
      },
      {
        trait_type: "Animal",
        value: "Placeholder",
      },
    ],
    image: "https://lavender-manual-goat-205.mypinata.cloud/ipfs/QmdymxLzqyNtNBWRwHtxvLrqx2QvSSpN9CKRkETW4WtBrZ",
  },
];

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  console.log("🚀 ~ GET ~ params:", params);

  if (!params.id) {
    return new NextResponse("No nft id provided", { status: 400 });
  }


  const { data: address} = await useScaffoldReadContract({
    contractName: "SlothShaming",
    functionName: "ownerOf",
    args: [params.id]
  });
  if (!address) {
    return new NextResponse("No nft id provided", { status: 400 });
  }
  let rating = await returnRating(address);
  let animalName = "";
  switch (true) {
    case (rating < 34):
      animalName = "sloth";
    case (rating >= 34 && rating < 67):
      animalName = "wolf";
    case (rating >= 67):
      animalName = "cheetah";
    default:
      animalName = "placeholder";
  }

  const animalData =
    ANIMALS.find(animal => animal.name.toLowerCase() === animalName.toLowerCase()) || "Animal not found";
  try {
    return NextResponse.json({ animalData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error checking wallet" });
  }
}
