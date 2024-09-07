"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { approveErc20, hasErc20Approval, hasSufficientFunds, payRequest } from "@requestnetwork/payment-processor";
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { formatUnits } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import { useEthersSigner } from "~~/utils/request/ethersAdapter";
import { calculateStatus, displayOrder, findCurrency, keyLabelMapping } from "~~/utils/request/helper";
import { initializeRequestNetwork } from "~~/utils/request/initializeRN";

const InvoiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const invoiceid = id;
  const [pending, setPending] = useState(false);
  const { address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  // const ethers_signer = walletClientToSigner(walletClient);
  const signer = useEthersSigner({ chainId: chain?.id });
  console.log("provider", signer);

  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork | null>(null);
  const [request, setRequest] = useState<any>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  useEffect(() => {
    if (walletClient) {
      initializeRequestNetwork(setRequestNetwork, walletClient);
    }
  }, [walletClient]);

  useEffect(() => {
    if (!invoiceid || !requestNetwork) return;

    const fetchInvoiceData = async () => {
      try {
        const invoice = await requestNetwork.fromRequestId(invoiceid as string);
        setRequest(invoice);
        if (invoice) {
          const data = await invoice.getData();
          console.log("data", data);
          const content = data.contentData;

          const from = data.payee?.value ?? "Unknown";
          const to = data.payer?.value ?? "Unknown";

          const issuedDate = new Date(content.creationDate).toLocaleDateString();
          const dueDate = new Date(content.paymentTerms.dueDate).toLocaleDateString();
          const memo = content.note;

          const paymentChain = data.currencyInfo.network ?? "Unknown";
          const currencyAddress = data.currencyInfo?.value ?? "";

          const expectedAmount = BigInt(data.expectedAmount);
          const balance = BigInt(data.balance?.balance || 0);
          const state = calculateStatus(data.state, expectedAmount, balance);

          const currency = findCurrency(currencyAddress, paymentChain);

          const items = content.invoiceItems.map((item: any) => {
            const unitPrice = currency ? parseFloat(formatUnits(item.unitPrice, currency.decimals)) : 0;
            const qty = item.quantity;
            const discount = parseFloat(item.discount);
            const tax = parseFloat(item.tax.amount);
            const amount = parseFloat(((unitPrice * qty - discount) * (1 + tax / 100)).toFixed(2));
            return {
              description: item.name,
              qty,
              unitPrice,
              discount,
              tax,
              amount,
            };
          });

          const amountWithoutTax = items.reduce(
            (acc: number, item: any) => acc + (item.unitPrice * item.qty - item.discount),
            0,
          );
          const taxAmount = items.reduce(
            (acc: number, item: any) => acc + (item.unitPrice * item.qty - item.discount) * (item.tax / 100),
            0,
          );
          const totalAmount = amountWithoutTax + taxAmount;

          const mappedInvoiceData = {
            state,
            issuedDate,
            dueDate,
            from,
            to,
            payerDetails: content.buyerInfo,
            payeeDetails: content.sellerInfo,
            paymentChain: paymentChain,
            currency: currency?.symbol,
            items,
            summary: {
              amountWithoutTax: parseFloat(amountWithoutTax.toFixed(2)),
              taxAmount: parseFloat(taxAmount.toFixed(2)),
              totalAmount: parseFloat(totalAmount.toFixed(2)),
            },
            memo,
            invoiceNumber: content.invoiceNumber,
          };
          setInvoiceData(mappedInvoiceData);
        }
      } catch (error) {
        console.error("Failed to fetch invoice data:", error);
      }
    };

    fetchInvoiceData();
  }, [invoiceid, requestNetwork]);

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  const renderDetailsSection = (details: any) => {
    const renderObjectFields = (obj: any, parentKey = ""): JSX.Element | null => {
      const elements = displayOrder.map(key => {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        const label = keyLabelMapping[fullKey] || key.replace(/([A-Z])/g, " $1");
        const value = key.includes(".") ? fullKey.split(".").reduce((o, i) => o?.[i], obj) : obj?.[key];

        if (value && typeof value === "object") {
          return renderObjectFields(value, fullKey);
        } else if (value) {
          return (
            <p key={fullKey}>
              <strong>{label}: </strong> {value}
            </p>
          );
        }
        return null;
      });
      return <>{elements}</>;
    };
    if (
      !details ||
      (Object.keys(details).length === 1 && Object.keys(details.address || {}).length === 0) ||
      Object.keys(details).length === 0
    )
      return null;

    return <div className="p-4 bg-base-100 rounded-lg">{renderObjectFields(details)}</div>;
  };

  const payInvoice = async () => {
    if (!address || !request || !signer) return;
    setPending(true);

    const data = await request.getData();

    try {
      const sufficientFunds = hasSufficientFunds({
        request: data,
        address,
        providerOptions: { provider: signer.provider },
      });
      if (!sufficientFunds) {
        console.error("Insufficient funds");
        return;
      }

      const approved = await hasErc20Approval(data, address, signer);
      if (!approved) {
        console.log("Approval not set, requesting approval...");
        await approveErc20(request);
        console.log("Approval granted!");
      }

      console.log("Paying request...");
      await payRequest(data, signer);
      console.log("Request paid!");
    } catch (error) {
      console.error("Error paying request: ", error);
    }
    setPending(false);
  };

  return (
    <div className="max-w-6xl mx-auto bg-neutral-content p-6 rounded-lg shadow-center">
      {/* Header Section */}
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">Invoice #{invoiceData.invoiceNumber}</h1>
            <div className="bg-accent text-accent-content py-2 px-4 rounded">{invoiceData.state}</div>
          </div>
          <div className="text-right">
            <p>Issued on {invoiceData.issuedDate}</p>
            <p className="font-semibold">Payment due by {invoiceData.dueDate}</p>
          </div>
        </div>
      </header>

      {/* From and Billed To Sections */}
      <section className="mb-6 flex space-x-6">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold">From</h2>
          <p>{invoiceData.from}</p>
          {renderDetailsSection(invoiceData.payeeDetails)}
        </div>

        <div className="w-1/2">
          <h2 className="text-xl font-semibold">Billed To</h2>
          <p>{invoiceData.to}</p>
          {renderDetailsSection(invoiceData.payerDetails)}
        </div>
      </section>

      {/* Payment Details Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <p>
          <strong>Payment Chain:</strong> {invoiceData.paymentChain}
        </p>
        <p>
          <strong>Invoice Currency:</strong> {invoiceData.currency}
        </p>
      </section>

      {/* Items Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Items</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Description</th>
              <th className="text-left py-2">Qty</th>
              <th className="text-left py-2">Unit Price</th>
              <th className="text-left py-2">Discount</th>
              <th className="text-left py-2">Tax</th>
              <th className="text-left py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.description}</td>
                <td className="py-2">{item.qty}</td>
                <td className="py-2">{item.unitPrice.toFixed(2)}</td>
                <td className="py-2">{item.discount.toFixed(2)}</td>
                <td className="py-2">{item.tax}%</td>
                <td className="py-2">{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Summary Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Summary</h2>
        <div className="text-right">
          <p>
            <strong>Amount without Tax:</strong>{" "}
            {invoiceData.summary.amountWithoutTax.toFixed(2) + " " + invoiceData.currency}
          </p>
          <p>
            <strong>Total Tax Amount:</strong> {invoiceData.summary.taxAmount.toFixed(2) + " " + invoiceData.currency}
          </p>
          <p className="text-lg font-bold">
            <strong>Total Amount:</strong> {invoiceData.summary.totalAmount.toFixed(2) + " " + invoiceData.currency}
          </p>
          <p className="text-lg font-bold mt-4">
            <strong>Due:</strong> {invoiceData.summary.totalAmount.toFixed(2) + " " + invoiceData.currency}
          </p>
        </div>
      </section>

      {/* Memo Section */}
      {invoiceData.memo && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Memo</h2>
          <div className="p-4 bg-base-100 rounded-lg">
            <p>{invoiceData.memo}</p>
          </div>
        </section>
      )}

      {/* Pay Now Button */}
      {(invoiceData.state === "Created" || invoiceData.state === "Pending") && invoiceData.to === address && (
      <div className="text-right">
        <button className="bg-secondary text-primary-content py-2 px-4 rounded" disabled={pending} onClick={payInvoice}>
          Pay now 💸
        </button>
      </div>
      )}
    </div>
  );
};

export default InvoiceDetails;
