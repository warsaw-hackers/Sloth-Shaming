import { GolemNetwork } from "@golem-sdk/golem-js";

interface RunParams {
  key: string;
  url: string;
  subnetTag: string;
  imageTag: string;
  network: string;
}

export async function run(params: RunParams, appendResults: (result: string) => void) {
  const { key, url, subnetTag, imageTag, network } = params;

  const order = {
    demand: {
      workload: {
        imageTag,
      },
      subnetTag,
    },
    market: {
      rentHours: 0.5,
      pricing: {
        model: "linear",
        maxStartPrice: 0.5,
        maxCpuPerHourPrice: 1.0,
        maxEnvPerHourPrice: 0.5,
      },
    },
    payment: { network },
  };

  const glm = new GolemNetwork({
    api: { key, url },
  });

  glm.payment.events.on("invoiceAccepted", ({ invoice }) => appendResults(`Total cost: ${invoice.amount} GLM`));

  try {
    appendResults("Establishing a connection to the Golem Network");
    await glm.connect();
    appendResults("Request for renting a provider machine");
    //@ts-ignore
    const rental = await glm.oneOf({ order });
    appendResults(`Rented resources from ${rental.agreement.provider.name}`);
    await rental
      .getExeUnit()
      .then(async exe =>
        appendResults(`Reply: ${(await exe.run(`echo 'Hello Golem! 👋 from ${exe.provider.name}!'`)).stdout}`),
      );
    appendResults("Finished all work with the resources");
    await rental.stopAndFinalize();
    appendResults("Finalized renting process");
  } catch (err) {
    console.error("Failed to run the example", err);
    appendResults(`Error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    await glm.disconnect();
  }
}
