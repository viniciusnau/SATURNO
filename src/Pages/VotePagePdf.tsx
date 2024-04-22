import React from "react";
import { BiSolidDownload } from "react-icons/bi";
import services from "../Services/services";

export const VotePagePDF = () => {
  const handleDownload = async () => {
    try {
      const response = await services.downloadHashReportPDF();
      downloadPDF(response, "hash_report.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const downloadPDF = (pdfData: Blob, filename: string) => {
    const url = URL.createObjectURL(pdfData);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={handleDownload}>
        <BiSolidDownload size={24} />
        Download Hash Report
      </button>
    </div>
  );
};

export default VotePagePDF;
