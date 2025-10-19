import React, { useState } from "react";
import useAuthInfo from "../../../hooks/useAuthInfo";
import DataTable from "react-data-table-component";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Helmet } from "react-helmet";

const SalesReport = () => {
  const { orders: sales = [] } = useAuthInfo();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter by date
  const filteredSales = sales.filter((s) => {
    const saleDate = new Date(s.createdAt);
    return (
      (!startDate || saleDate >= new Date(startDate)) &&
      (!endDate || saleDate <= new Date(endDate))
    );
  });

  // Table columns
  const columns = [
    {
      name: "Transaction ID",
      selector: (row) => row.transactionId,
      sortable: true,
    },
    {
      name: "Medicine",
      selector: (row) => row.items.map((i) => i.itemName).join(", "),
      wrap: true,
    },
    { name: "Buyer", selector: (row) => row.email },
    {
      name: "Seller",
      selector: (row) => row.items.map((i) => i.sellerEmail).join(", "),
      wrap: true,
    },
    {
      name: "Amount (৳)",
      selector: (row) => Number(row.amount).toFixed(2),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  // Export XLSX
  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
    XLSX.writeFile(workbook, "sales_report.xlsx");
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 14, 16);
    doc.autoTable({
      head: [
        ["Transaction ID", "Medicine", "Buyer", "Seller", "Amount (৳)", "Date"],
      ],
      body: filteredSales.map((s) => [
        s.transactionId,
        s.items.map((i) => i.itemName).join(", "),
        s.email,
        s.items.map((i) => i.sellerEmail).join(", "),
        Number(s.amount).toFixed(2),
        new Date(s.createdAt).toLocaleDateString(),
      ]),
    });
    doc.save("sales_report.pdf");
  };


  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#1E293B", // header background
        color: "#FFFFFF",            // header text color
        fontSize: "14px",
        fontWeight: "600",
      },
    },
    rows: {
      style: {
        backgroundColor: "#F8FAFC", // row background
        color: "#111827",           // row text color
        "&:hover": {
          backgroundColor: "#E2E8F0", // hover color
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#FFFFFF",
        color: "#1E293B",
      },
    },
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>PillPoint | Sales Report</title>
      </Helmet>
      <h2 className="text-xl font-bold mb-4">Sales Report</h2>

      {/* Date Range Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={exportXLSX}
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          Export XLSX
        </button>
        <button
          onClick={exportPDF}
          className="bg-green-500 text-white px-3 py-2 rounded"
        >
          Export PDF
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredSales}
        customStyles={customStyles}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default SalesReport;
