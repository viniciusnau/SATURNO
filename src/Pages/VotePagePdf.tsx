import React from "react";
import { BiSolidDownload } from "react-icons/bi";
import services from "../Services/services";
import { Button } from "@mui/material";

export const VotePagePdf = () => {
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
      <Button onClick={handleDownload}>
        Comprovante
        <BiSolidDownload size={24} />
      </Button>
    </div>
  );
};

export default VotePagePdf;
