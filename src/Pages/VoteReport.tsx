import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BiSolidDownload } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchElectionsPDFData } from "../Services/Slices/electionsResultPDFDataSlice";
import styles from "../Styles/VoteReport.module.css";
import services from "../Services/services";
import Title from "../Components/Title";

export const VoteReport = () => {
  const dispatch = useDispatch<any>();
  const [selectedFilter, setSelectedFilter] = useState("0");
  const { data, error, loading } = useSelector(
    (state: any) => state.electionsPDFDataSlice
  );
  const [startTime, setStartTime] = useState<boolean>(true);

  useEffect(() => {
    const currentDateTime = new Date();
    const availableDateTime = new Date("2023-06-06T17:00:59");
    if (currentDateTime <= availableDateTime) {
      setStartTime(false);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchElectionsPDFData(selectedFilter));
  }, [dispatch, selectedFilter]);

  const handleDownload = async () => {
    try {
      const response = await services.downloadElectionsResultPDF(
        selectedFilter
      );
      let filename = "";
      switch (selectedFilter) {
        case "0":
          filename = "resultados_relacao_inscritos.pdf";
          break;
        case "1":
          filename = "resultados_eleicao_defensor_publico_geral.pdf";
          break;
        case "2":
          filename = "resultados_eleicao_conselho_superior.pdf";
          break;
        default:
          filename = "resultados.pdf";
      }
      downloadPDF(response, filename);
    } catch (error) {
      console.error("Erro ao fazer o download do PDF:", error);
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

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedFilter(event.target.value as string);
  };

  const renderTable = () => {
    if (selectedFilter === "1" || selectedFilter === "2") {
      return (
        <TableHead>
          <TableRow>
            <TableCell align="center">Posição</TableCell>
            <TableCell align="center">Nome do Candidato</TableCell>
            <TableCell align="center">Votos</TableCell>
          </TableRow>
        </TableHead>
      );
    } else {
      return (
        <TableHead>
          <TableRow>
            <TableCell align="center">Matrícula</TableCell>
            <TableCell align="center">Nome do Eleitor</TableCell>
            <TableCell align="center">Votou DPG?</TableCell>
            <TableCell align="center">Votou Conselho?</TableCell>
          </TableRow>
        </TableHead>
      );
    }
  };

  const renderRows = () => {
    if (!data || !data.result_data) {
      return null;
    }

    if (selectedFilter === "1" || selectedFilter === "2") {
      return data.result_data.map((row: any, index: number) => (
        <TableRow key={index}>
          <TableCell align="center">{row.position}</TableCell>
          <TableCell align="center">{row.name}</TableCell>
          <TableCell align="center">{row.vote_count}</TableCell>
        </TableRow>
      ));
    } else {
      return data.result_data.map((row: any, index: number) => (
        <TableRow key={index}>
          <TableCell align="center">{row.registration}</TableCell>
          <TableCell align="center">{row.person}</TableCell>
          <TableCell align="center">
            {row.voting_info &&
              (row.voting_info[0]?.vote_status === "voted" ? "Sim" : "Não")}
          </TableCell>
          <TableCell align="center">
            {row.voting_info &&
              (row.voting_info[1]?.vote_status === "voted" ? "Sim" : "Não")}
          </TableCell>
        </TableRow>
      ));
    }
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "70vh",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Title>Relatório de votação</Title>
        <div className={styles.filterContainer}>
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            disabled={!startTime}
          >
            <option value="0">Relação dos inscritos</option>
            <option value="1">Resultados Defensor Público-Geral</option>
            <option value="2">Resultados Conselho Superior</option>
          </select>
        </div>
        <div className={styles.button}>
          <BiSolidDownload size={24} onClick={handleDownload} />
        </div>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table size="medium" aria-label="a dense table">
            {renderTable()}
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Erro ao carregar os dados
                  </TableCell>
                </TableRow>
              ) : (
                renderRows()
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
