import { useState } from "react";
import styles from "../Styles/ApproveRegister.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ApproveRegister = () => {
  const dispatch = useDispatch<any>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const { data, error, loading } = useSelector(
    (state: any) => state.approveRegisterSlice
  );

  const renderTable = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="center">Posição</TableCell>
          <TableCell align="center">Nome do(a) Candidato(a)</TableCell>
          <TableCell align="center">Votos</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const renderRows = () => {
    return data.result_data.map((row: any, index: number) => (
      <TableRow key={index}>
        <TableCell align="center">{row.position}°</TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.vote_count}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div className={styles.container}>
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
  );
};

export default ApproveRegister;
