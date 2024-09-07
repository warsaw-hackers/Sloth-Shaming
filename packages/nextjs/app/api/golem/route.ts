import { NextRequest, NextResponse } from "next/server";
import { GolemNetwork, waitFor } from "@golem-sdk/golem-js";

interface RunParams {
  key: string;
  url: string;
  subnetTag: string;
  imageHash: string;
  network: string;
}
const splitMultiline = (multiLineStr: string) => {
  return multiLineStr
    .split("\n")
    .filter(line => !!line)
    .map(line => line.trim());
};

const myProposalFilter = (proposal: any) => {
  /*
  // This filter can be used to engage a provider we used previously.
  // It should have the image cached so the deployment will be faster.
   if (proposal.provider.name == "<enter provider name here>") return true;
   else return false;
  */
  return true;
};

export async function run() {
  const controller = new AbortController();

  //@ts-ignore
  let proxy = null;
  let rental = null;
  let isShuttingDown = 0;
  let serverOnProviderReady = false;

  const order = {
    demand: {
      workload: {
        imageHash: "23ac8d8f54623ad414d70392e4e3b96da177911b0143339819ec1433",
        minMemGib: 8,
        // capabilities: ["!exp:gpu", "vpn"],
        // engine: "vm-nvidia",
      },
      subnetTag: "",
    },
    market: {
      rentHours: 0.5,
      pricing: {
        model: "linear",
        maxStartPrice: 0.5,
        maxCpuPerHourPrice: 1.0,
        maxEnvPerHourPrice: 1,
      },
    },
  };

  const glm = new GolemNetwork({
    api: { key: "d3f587d6c9d64fcfbb1e54bbd61baca1", url: "" },
  });

  glm.payment.events.on("invoiceAccepted", ({ invoice }) => console.log(`Total cost: ${invoice.amount} GLM`));

  try {
    console.log("Establishing a connection to the Golem Network");
    await glm.connect();

    process.on("SIGINT", async function () {
      console.log(" Server shutdown was initiated by CTRL+C.");

      if (isShuttingDown > 1) {
        await new Promise(res => setTimeout(res, 2 * 1000));
        return process.exit(1);
      }

      isShuttingDown++;
      controller.abort("SIGINT received");

      //@ts-ignore
      await proxy?.close();
      await rental?.stopAndFinalize();
      await glm.disconnect();
    });
    const network = await glm.createNetwork();
    // const network = await glm.createNetwork();
    console.log("Request for renting a provider machine");

    //@ts-ignore
    order.network = network;
    //@ts-ignore
    const rental = await glm.oneOf({ order });

    const PORT_ON_PROVIDER = 11434; // default port
    const PORT_ON_REQUESTOR = 11434; // will use the same outside
    console.log(`Rented resources from ${rental.agreement.provider.name}`);

    const exe = await rental.getExeUnit();
    // .then(async exe =>
    //   console.log(`Reply: ${(await exe.run(`echo 'Hello Golem! 👋 from ${exe.provider.name}!'`)).stdout}`),
    // );
    console.log("🚀 ~ run ~ exe:", exe);

    //@ts-ignore
    const server = await exe.runAndStream(
      `sleep 1 && /usr/bin/ollama serve`, // new image should have HOME=/root
    );

    server.stdout.subscribe((data: any) => {
      // Debugging purpose
      splitMultiline(data).map(line => console.log("provider >>", line));
    });

    server.stderr.subscribe((data: any) => {
      // Debugging purpose
      splitMultiline(data).map(line => console.log("provider !!", line)); // Once we see that the server has started to listen, we can continue

      if (data.toString().includes("Listening on [::]:11434")) {
        serverOnProviderReady = true;
      }
    });

    await waitFor(() => serverOnProviderReady); // Create a proxy instance for that server

    proxy = exe.createTcpProxy(PORT_ON_PROVIDER);

    proxy.events.on("error", (error: any) => console.error("TcpProxy reported an error:", error)); // Start listening and expose the port on your requestor machine

    await proxy.listen(PORT_ON_REQUESTOR);
    console.log(`Server Proxy listen at http://localhost:${PORT_ON_REQUESTOR}`); // Keep the process running to the point where the server exits or the execution is aborted
    console.log("Finished all work with the resources");

    await waitFor(() => server.isFinished());
    await rental.stopAndFinalize();
    console.log("Finalized renting process");
  } catch (err) {
    console.error("Failed to run the example", err);
    console.log(`Error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    await glm.disconnect();
  }
}

export async function GET(req: NextRequest, context: any) {
  try {
    await run();
    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error finding out balance" });
  } finally {
  }
}
