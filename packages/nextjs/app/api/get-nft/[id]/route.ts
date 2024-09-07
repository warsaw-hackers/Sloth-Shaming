import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const nftId = params.nftId;
  if (!nftId) {
    return new NextResponse("No wallet address provided", { status: 400 });
  }

  try {
    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error checking wallet" });
  }
}
