import { useQuery } from "@tanstack/react-query";

const GATEWAY = "https://lavender-manual-goat-205.mypinata.cloud";

async function fetchFileFromIPFS(cid: string) {
  const url = `${GATEWAY}/ipfs/${cid}`;
  const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
  console.log("🚀 ~ fetchFileFromIPFS ~ url:", url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.text();
}

export function usePinataRetrieveData(cid: string, walletAddress: string, isDone: boolean) {
  return useQuery({
    queryKey: ["pinataData", cid, walletAddress],
    queryFn: () => fetchFileFromIPFS(cid),
    enabled: isDone,
  });
}
