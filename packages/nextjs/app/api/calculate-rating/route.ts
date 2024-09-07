import { NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});
export async function POST(req: Request) {
  const { walletAddress } = await req.json();
  //   console.log(walletAddress);
  if (!walletAddress) {
    return new NextResponse("No wallet address provided", { status: 400 });
  }

  try {
    // if no user found - create it with rank Tester

    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error finding out balance" });
  }
}
