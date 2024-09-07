import { Types } from "@requestnetwork/request-client.js";

export const returnRating = (invoices: Types.IRequestDataWithEvents[]): number => {
  const ratingsArray: number[] = [];

  for (const invoice of invoices) {
    const createDate = new Date(invoice.contentData.creationDate);
    const dueDate = new Date(invoice.contentData.paymentTerms.dueDate);
    const currentDate = new Date();

    let paid = Number(invoice.balance?.balance) >= Number(invoice.expectedAmount);

    if (!paid && currentDate > dueDate) {
      ratingsArray.push(0); // UNPAID AND LATE
    } else if (paid) {
      let paymentDate = currentDate; // default to current date if no payment timestamp available
      const paymentTimeStamp = invoice.balance?.events[0]?.timestamp;

      if (paymentTimeStamp) {
        paymentDate = new Date(paymentTimeStamp * 1000); // convert seconds to milliseconds
      }

      if (paymentDate <= dueDate) {
        ratingsArray.push(100); // PAID ON TIME
      } else {
        ratingsArray.push(0); // PAID LATE
      }
    }
  }

  if (ratingsArray.length === 0) {
    return 50; // AVERAGE SCORE FOR NO INVOICES
  }

  const average = ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length;
  return Math.round(average);
};
