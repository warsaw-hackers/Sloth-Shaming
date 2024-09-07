import { calculateStatus } from "./helper";
import { Types } from "@requestnetwork/request-client.js";

export const returnRating = (invoices: Types.IRequestDataWithEvents[]) => {
  for (let i = 0; i < invoices.length; i++) {
    invoices[i].extensions
    // const status = calculateStatus(
      // invoices[i].state,
      // BigInt(invoices[i].expectedAmount),
      // BigInt(invoices[i].balance?.balance || 0),
    // );

    //invoices[i].events[0].name === "Paid"

    // if (status === "Paid") {

    // }
  }
};
