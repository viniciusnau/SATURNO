import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "../Styles/VoteReport.module.css";
import { BiSolidDownload } from "react-icons/bi";
import { useSelector } from "react-redux";

interface votingCandidates {
  name: string;
  voted_dpg: boolean;
  voted_counsil: boolean;
}

export const VoteReport = () => {
  const columns = ["Nome", "Votou DPG?", "Votou Conselho?"];
  const rows = [
    createData("Guilherme Pereira", false, false),
    createData("Maria Antonia", false, true),
    createData("Otavio Bresque", true, false),
    createData("Vinicius Bota", true, true),
  ];

  const { data, error, loading } = useSelector(
    (state: any) => state.voteReportSlice
  );

  function createData(
    name: string,
    voted_dpg: boolean,
    voted_counsil: boolean
  ) {
    return { name, voted_dpg, voted_counsil };
  }

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = data.file;
    a.download = "downloadedFile.pdf";
    a.click();
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className={styles.downloadContainer}>
          <BiSolidDownload size={24} onClick={handleDownload} />
        </div>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table size="medium" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {columns.map((item: string, index: number) => (
                  <TableCell align="center">{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.voted_dpg ? "Sim" : "Não"}
                  </TableCell>
                  <TableCell align="center">
                    {row.voted_counsil ? "Sim" : "Não"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
