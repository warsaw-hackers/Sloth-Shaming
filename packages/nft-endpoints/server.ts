import dotenv from "dotenv";
import { ethers } from "ethers";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Contract setup
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contractABI = [
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function setTokenURI(uint256 tokenId, string memory _tokenURI)",
];
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS!,
  contractABI,
  wallet
);

// Routes
app.get("/nft/:tokenId", async (req, res) => {
  try {
    const tokenId = req.params.tokenId;
    const uri = await contract.tokenURI(tokenId);
    res.json({ tokenId, uri });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch NFT URI" });
  }
});

app.post("/nft/:tokenId/update-uri", async (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { tokenId } = req.params;
    const { newUri } = req.body;

    if (!newUri) {
      return res.status(400).json({ error: "New URI is required" });
    }

    const tx = await contract.setTokenURI(tokenId, newUri);
    await tx.wait();

    res.json({ message: "NFT URI updated successfully", tokenId, newUri });
  } catch (error) {
    res.status(500).json({ error: "Failed to update NFT URI" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
