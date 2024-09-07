import { initializeRequestNetworkDummy } from "./initializeDummyRN";
import { Types } from "@requestnetwork/request-client.js";

export const returnRating = async (address: string): Promise<number> => {
  const requestNetwork = initializeRequestNetworkDummy()?.requestNetwork;
  if (!requestNetwork) {
    return 80; // Default score if Request Network is not initialized
  }
  try {
    // Fetch all the requests for the provided address
    const requests = await requestNetwork.fromIdentity({
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: address,
    });

    // Filter the requests where the address is the payer
    const payerInvoices = requests
      .map(request => request.getData())
      .filter(invoice => invoice.payer?.value === address); // Only consider invoices that need to be paid by the user

    if (payerInvoices.length === 0) {
      return 80; // Default score if no invoices found
    }

    // Array to hold the rating for each invoice
    const ratingsArray: number[] = [];

    payerInvoices.forEach(invoice => {
      if (invoice.contentData.paymentTerms && invoice.contentData.paymentTerms.dueDate) { // This line is needed to filter out invalid invoices
        const dueDate = new Date(invoice.contentData.paymentTerms.dueDate);
        const currentDate = new Date();

        const isPaid = Number(invoice.balance?.balance) >= Number(invoice.expectedAmount);

        if (!isPaid && currentDate > dueDate) {
          ratingsArray.push(0); // UNPAID AND LATE
        } else if (isPaid) {
          const paymentTimeStamp = invoice.balance?.events[0]?.timestamp;
          let paymentDate = currentDate;

          if (paymentTimeStamp) {
            paymentDate = new Date(paymentTimeStamp * 1000); // Convert from seconds to milliseconds
          }

          if (paymentDate <= dueDate) {
            ratingsArray.push(100); // PAID ON TIME
          } else {
            ratingsArray.push(0); // PAID LATE
          }
        }
      }
    });
    console.log("Ratings array:", ratingsArray);
    // Calculate the average rating
    const averageRating = ratingsArray.reduce((sum, rating) => sum + rating, 0) / ratingsArray.length;
    return Math.max(1, Math.round(averageRating)); // Ensure the value is at least 1    
  } catch (error) {
    console.error("Failed to calculate rating:", error);
    return 80; // Return default score in case of an error
  }
};
