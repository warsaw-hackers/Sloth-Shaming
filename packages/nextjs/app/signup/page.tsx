"use client";

import { useEffect, useState } from "react";
import { run } from "~~/utils/golem";

export default function Home() {
  const [results, setResults] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    yagnaAppKey: "d3f587d6c9d64fcfbb1e54bbd61baca1",
    yagnaApiBasePath: "",
    subnetTag: "",
    imageHash: "23ac8d8f54623ad414d70392e4e3b96da177911b0143339819ec1433",
    paymentNetwork: "",
  });

  useEffect(() => {
    // This line allows you to watch golem-js internal logs in the browser console!
    // if (typeof window !== "undefined") {
    //   localStorage.debug = "golem-js:*";
    // }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRun = async () => {
    if (!formData.yagnaAppKey) {
      alert("You didn't provide your Yagna AppKey");
      return;
    }
    if (!formData.imageHash) {
      alert("You didn't provide your Yagna AppKey");
      return;
    }

    await run(
      {
        key: formData.yagnaAppKey,
        url: formData.yagnaApiBasePath,
        subnetTag: formData.subnetTag,
        imageHash: formData.imageHash,
        network: formData.paymentNetwork,
      },
      result => {
        setResults(prev => [...prev, result]);
      },
    );
  };

  return (
    <div>
      <input id="yagnaAppKey" value={formData.yagnaAppKey} onChange={handleInputChange} placeholder="Yagna AppKey" />
      <input
        id="yagnaApiBasePath"
        value={formData.yagnaApiBasePath}
        onChange={handleInputChange}
        placeholder="Yagna API Base Path"
      />
      <input id="subnetTag" value={formData.subnetTag} onChange={handleInputChange} placeholder="Subnet Tag" />
      <input id="imageTag" value={formData.imageHash} onChange={handleInputChange} placeholder="Image Tag" />
      <input
        id="paymentNetwork"
        value={formData.paymentNetwork}
        onChange={handleInputChange}
        placeholder="Payment Network"
      />
      <button onClick={handleRun}>Run</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      <div className="grid grid-cols-3 p-16 font-montserrat">
        <div className="flex flex-col">
          <h1 className="tracking-tighter text-2xl">Registration</h1>
        </div>
      </div>
    </div>
  );
}
