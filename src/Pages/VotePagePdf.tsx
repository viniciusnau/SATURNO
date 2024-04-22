import React, { useEffect, useState } from "react";
import styles from "../Styles/VotePagePdf.module.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../Components/Snackbar";
import { Button } from "@mui/material";
import { MdDownload } from "react-icons/md";
import { fetchFileContent } from "../Services/Slices/fileContentSlice";

const VotePagePdf: React.FC = () => {
  const { data, loading, error } = useSelector(
    (state: any) => state.fileContentSlice
  );
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchFileContent());
  }, [dispatch]);

  useEffect(() => {
    if (isDispatched) {
      const file_name = "DIÁRIO OFICIAL Modelo.docx";
      // const file = await services.downloadFiles(file_name);
      const a = document.createElement("a");
      a.href = data?.data?.url;
      a.download = "template.pdf";
      a.click();
    }
  }, [data, isDispatched]);

  return (
    <div className={styles.container}>
      {error && isDispatched && (
        <Snackbar type="fileContentError" setShowSnackbar={setIsDispatched} />
      )}
      <h2 className={styles.title} style={{ color: "initial" }}>
        PDF Vote Page
      </h2>
      <Button className={styles.button}>
        Comprovante
        <MdDownload size={32} />
      </Button>
    </div>
  );
};

export default VotePagePdf;
