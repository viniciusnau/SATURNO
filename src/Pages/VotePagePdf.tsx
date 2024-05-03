import React from "react";
import { BiSolidDownload } from "react-icons/bi";
import services from "../Services/services";
import Button from "../Components/Button";
import styles from "../Styles/VotePagePdf.module.css";
import Title from "../Components/Title";

export const VotePagePdf = () => {
  const handleDownload = async () => {
    try {
      const response = await services.downloadHashReportPDF();
      downloadPDF(response, "Comprovante_Votação.pdf");
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
    <div className={styles.container}>
      <Title>Comprovante de votação</Title>
      <div className={styles.buttonContainer}>
        <Button onClick={handleDownload} className={styles.button}>
          Baixar comprovante
          <BiSolidDownload size={24} />
        </Button>
      </div>
    </div>
  );
};

export default VotePagePdf;
