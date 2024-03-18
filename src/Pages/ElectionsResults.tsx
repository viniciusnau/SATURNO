import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchElectionsResult } from "../Services/Slices/resultsSlice";
import Box from "@mui/material/Box";
import Snackbar from "../Components/Snackbar";
import styles from "../Styles/ElectionsResults.module.css";
import image from "../Assets/jpg.jpeg";
import default_pfp from "../Assets/default_pfp.png";

const ElectionsResults = () => {
  const dispatch = useDispatch<any>();
  const [selectedPosition, setSelectedPosition] = useState("1");
  const [totalVotes, setTotalVotes] = useState(0);
  const [blankVotes, setBlankVotes] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [totalPeople, setTotalPeople] = useState(0);

  const { data, error, loading } = useSelector(
    (state: any) => state.electionsResultSlice
  );

  const positionOptions = {
    "Defensor Público-Geral": "1",
    "Conselho Superior": "2",
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(event.target.value);
    setSelectedCandidate(null);
  };

  const handleCandidateClick = (rowId: any) => {
    const candidate = data.find((candidate: any) => candidate.id === rowId);
    setSelectedCandidate(candidate);
  };

  const handleClearSelection = () => {
    setSelectedCandidate(null);
  };

  useEffect(() => {
    dispatch(fetchElectionsResult(selectedPosition));
  }, [dispatch, selectedPosition]);

  useEffect(() => {
    if (data && data.length > 0) {
      let total = 0;
      let blank = 0;
      let totalVotesCount = 0;
      let totalPeople = 0;
      data.forEach((item: any) => {
        if (item.vote_count && item.id !== "total_count") {
          total += item.vote_count;
        }
        if (item.id === null) {
          blank = item.vote_count;
        }
        if (item.id === "total_count") {
          totalVotesCount = item.vote_count;
        }
        if (item.id === "total_people") {
          totalPeople = item.vote_count;
        }
      });
      setTotalVotes(totalVotesCount);
      setBlankVotes(blank);
      setTotalPeople(totalPeople);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.nullVotesLegend}>
          {/* <div
            className={styles.legendSquare}
            style={{ backgroundColor: "#007bff" }}
          ></div> */}
          <span>
            Eleitores com votos em branco:{" "}
            {((blankVotes / totalPeople) * 100).toFixed(2)}% ({blankVotes})
          </span>
        </div>
        <Box className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(blankVotes / totalPeople) * 100}%` }}
            ></div>
          </div>
        </Box>
        <div className={styles.nullVotesLegend}>
          {/* <div
            className={styles.legendSquare}
            style={{ backgroundColor: "#f0f0f0" }}
          ></div> */}
          <span>
            Votos Computados: {totalPeople - blankVotes} de {totalPeople}
          </span>
        </div>
      </div>
      <Box className={styles.megaBox}>
        <Box className={styles.listContainer}>
          <select value={selectedPosition} onChange={handleChange}>
            {Object.entries(positionOptions).map(([label, value]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {error && <Snackbar type="errorUpdate" />}
          {loading && <Box className={styles.loadingContainer}></Box>}
          {!loading && data.length === 0 && (
            <div className={styles.noResults}>Nenhum resultado encontrado</div>
          )}
          {data && data.length > 0 && (
            <div className={styles.scrollable}>
              <table>
                <thead></thead>
                <tbody>
                  {data.map((row: any, index: number) => (
                    <React.Fragment key={row.id}>
                      {row.id !== null &&
                        row.id !== "total_count" &&
                        row.id !== "total_people" && (
                          <tr
                            onClick={() => handleCandidateClick(row.id)}
                            className={
                              selectedCandidate &&
                              selectedCandidate.id === row.id
                                ? styles.selected
                                : ""
                            }
                          >
                            <td>
                              <div className={styles.candidateInfo}>
                                <div className={styles.circularImage}>
                                  <div
                                    className={styles.circularProgress}
                                    style={{
                                      width: `${
                                        (row.vote_count / totalVotes) * 100
                                      }%`,
                                    }}
                                  ></div>
                                  <img
                                    src={image}
                                    alt="Foto do Candidato"
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </div>
                                <div className={styles.info}>
                                  <div>{`${row.public_defense} - ${row.registration}`}</div>
                                  <div>{`${row.name}`}</div>
                                  <div>{`Votos computados ${
                                    row.vote_count
                                  } • ${(
                                    (row.vote_count / totalVotes) *
                                    100
                                  ).toFixed(2)}%`}</div>
                                  <div className={styles.progressBar}>
                                    <div
                                      style={{
                                        width: `${
                                          (row.vote_count / totalVotes) * 100
                                        }%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Box>

        <Box className={styles.detailsContainer}>
          <div className={styles.detailscontainer}>
            Detalhes do Candidato Selecionado:
          </div>
          <div className={styles.detailsContent}>
            <img
              src={selectedCandidate ? image : default_pfp}
              alt="Foto do Candidato"
              className={styles.candidateImage}
            />
            {selectedCandidate &&
            selectedCandidate.id !== "null" &&
            selectedCandidate.id !== "total_count" ? (
              <ul>
                <li>{`Matrícula: ${selectedCandidate.registration}`}</li>
                <li>{`Nascimento: ${selectedCandidate.birth_date}`}</li>
                <li>{`Posse: ${selectedCandidate.start_date}`}</li>
                <li>{`Lotação: ${selectedCandidate.public_defense}`}</li>
                <li>{`Antiguidade: ${selectedCandidate.seniority}`}</li>
                <li>{`Categoria: ${selectedCandidate.category}`}</li>
              </ul>
            ) : (
              <div className={styles.noCandidate}>
                Nenhum candidato selecionado
              </div>
            )}
          </div>
          {selectedCandidate && (
            <button
              onClick={handleClearSelection}
              className={styles.clearButton}
            >
              Limpar seleção
            </button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ElectionsResults;
