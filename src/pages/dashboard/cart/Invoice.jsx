import { Helmet } from "react-helmet";
import { useParams } from "react-router";

const Invoice = () => {
  const { transactionId } = useParams();

  const invoiceUrl = `https://pill-point-server-one.vercel.app/invoices/invoice_${transactionId}.pdf`;

  return (
    <div className="p-6 text-center">
      <Helmet>
        <title>PillPoint | Invoice</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>
      <p className="mb-4">Transaction ID: {transactionId}</p>

      {/* View invoice in browser */}
      <iframe
        src={invoiceUrl}
        className="w-full h-[600px] border"
        title="Invoice PDF"
      />

      {/* Download button */}
      <a
        href={invoiceUrl}
        download={`invoice_${transactionId}.pdf`}
        className="btn mt-4 bg-blue-500 text-white"
      >
        Download Invoice
      </a>
    </div>
  );
};

export default Invoice;
