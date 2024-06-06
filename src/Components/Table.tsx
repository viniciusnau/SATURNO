import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styles from "../Styles/Table.module.css";
import Button from "./Button";
import { fetchSelectCandidate } from "../Services/Slices/selectedCandidate";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "./Snackbar";
import alessandro from "../Assets/Alessandro.jpeg";
import anderson from "../Assets/Anderson.jpeg";
import daniel from "../Assets/Daniel.jpeg";
import felipe from "../Assets/Felipe.jpeg";
import fernanda from "../Assets/fernanda.jpeg";
import jorge from "../Assets/Jorge.jpeg";
import juliane from "../Assets/Juliane.jpeg";
import pedro from "../Assets/pedroramos.jpeg";
import suzi from "../Assets/Suzi.jpeg";
import tiago from "../Assets/Tiago_Queiroz.jpeg";
import fernando from "../Assets/Fernando_Correa.jpeg";
import milton from "../Assets/Milton.jpeg";
import ronaldo from "../Assets/ronaldo.jpeg";
import valentim from "../Assets/Valentim.jpeg";
import avatar from "../Assets/avatar.svg";

interface IData {
  row?: { id: number; image: any }[];
  image?: any;
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
  loading?: boolean;
}

const Table: React.FC<IData> = ({ row, loading }) => {
  const dispatch = useDispatch<any>();
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedCandidateImage, setSelectedCandidateImage] = useState<
    string | null
  >(null);
  const [error, setError] = useState<any>(null);
  const responseSelectedCandidates = useSelector(
    (state: any) => state.selectedCandidate.selectedCandidates
  );
  const maxCountCandidates = useSelector((state: any) => state.meId.maxCount);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCandidateClick = (rowId: any) => {
    const candidate = row?.find((candidate: any) => candidate.id === rowId);
    if (candidate) {
      if (candidate.id === 4) {
        setSelectedCandidateImage(alessandro);
      } else if (candidate.id === 5) {
        setSelectedCandidateImage(anderson);
      } else if (candidate.id === 6) {
        setSelectedCandidateImage(daniel);
      } else if (candidate.id === 7) {
        setSelectedCandidateImage(felipe);
      } else if (candidate.id === 8) {
        setSelectedCandidateImage(fernanda);
      } else if (candidate.id === 9) {
        setSelectedCandidateImage(jorge);
      } else if (candidate.id === 10) {
        setSelectedCandidateImage(juliane);
      } else if (candidate.id === 11) {
        setSelectedCandidateImage(pedro);
      } else if (candidate.id === 12) {
        setSelectedCandidateImage(suzi);
      } else if (candidate.id === 13) {
        setSelectedCandidateImage(tiago);
      } else if (candidate.id === 14) {
        setSelectedCandidateImage(fernando);
      } else if (candidate.id === 15) {
        setSelectedCandidateImage(milton);
      } else if (candidate.id === 212) {
        setSelectedCandidateImage(ronaldo);
      } else if (candidate.id === 213) {
        setSelectedCandidateImage(valentim);
      } else if (candidate.id === 0) {
        setSelectedCandidateImage(avatar);
      } else if (candidate.id === 909) {
        setSelectedCandidateImage(avatar);
      } else if (candidate.id === 101) {
        setSelectedCandidateImage(avatar);
      } else if (candidate.id === 20202) {
        setSelectedCandidateImage(avatar);
      } else {
        setSelectedCandidateImage(avatar);
      }
    }
    setSelectedCandidate(candidate);
  };

  const handleSelectedCandidate = () => {
    const totalCount = responseSelectedCandidates.length;
    if (totalCount >= maxCountCandidates) {
      setError("countmaxError");
      return;
    }
    const isCandidateAlreadySelected = responseSelectedCandidates.some(
      (candidate: any) =>
        candidate.id === selectedCandidate.id && candidate.id !== ""
    );
    if (isCandidateAlreadySelected) {
      setError("candidateDuplicateError");
      return;
    }
    dispatch(fetchSelectCandidate(selectedCandidate));
  };

  const loadImage = (row: any) => {
    if (row.id === 4) {
      return alessandro;
    } else if (row.id === 5) {
      return anderson;
    } else if (row.id === 6) {
      return daniel;
    } else if (row.id === 7) {
      return felipe;
    } else if (row.id === 8) {
      return fernanda;
    } else if (row.id === 9) {
      return jorge;
    } else if (row.id === 10) {
      return juliane;
    } else if (row.id === 11) {
      return pedro;
    } else if (row.id === 12) {
      return suzi;
    } else if (row.id === 13) {
      return tiago;
    } else if (row.id === 14) {
      return fernando;
    } else if (row.id === 15) {
      return milton;
    } else if (row.id === 212) {
      return ronaldo;
    } else if (row.id === 213) {
      return valentim;
    } else if (row.id === 0) {
      return avatar;
    } else if (row.id === 909) {
      return avatar;
    } else if (row.id === 999) {
      return avatar;
    } else if (row.id === 9999999) {
      return avatar;
    } else if (row.id === null) {
      return avatar;
    } else {
      return avatar;
    }
  };

  useEffect(() => {
    if (responseSelectedCandidates.length === 0) {
      setSelectedCandidate(null);
      setSelectedCandidateImage(null);
    }
  }, [responseSelectedCandidates]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {error && <Snackbar type={error} setShowSnackbar={setError} />}
      <Box className={styles.megaBox}>
        <Box className={styles.rowContainer}>
          <h3 style={{ fontSize: "1.1rem" }}> Candidatos(as) </h3>
          {loading && <Box className={styles.loadingContainer}></Box>}

          {!loading && row?.length === 0 && (
            <div className={styles.noResults}>Nenhum resultado encontrado</div>
          )}

          {row && (
            <>
              <div>
                {row?.map((row: any, index: number) => (
                  <React.Fragment key={row.id}>
                    {row.id !== null && (
                      <div
                        onClick={() => handleCandidateClick(row.id)}
                        className={
                          selectedCandidate && selectedCandidate.id === row.id
                            ? styles.selected
                            : ""
                        }
                      >
                        <div className={styles.candidateInfo}>
                          <div className={styles.circularImage}>
                            <img
                              src={loadImage(row)}
                              alt="Foto do(a) Candidato(a)"
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </div>
                          <div className={styles.info}>
                            <div>{`${row.candidate}`}</div>
                            <div>{`${row.public_defense} - ${row.registration}`}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </Box>

        <Box className={styles.detailsContainer}>
          <h3 style={{ fontSize: "1.1rem" }}> Detalhes do(a) Candidato(a): </h3>
          <div className={styles.detailsContent}>
            <img
              src={selectedCandidateImage || avatar}
              alt="Foto do(a) Candidato(a)"
              className={styles.image}
            />
            <div className={styles.candidateSelect}>
              {selectedCandidate ? (
                <ul style={{ padding: "0" }}>
                  <li
                    className={styles.listItem}
                  >{`Candidato(a): ${selectedCandidate.candidate}`}</li>
                  <li
                    className={styles.listItem}
                  >{`Matrícula: ${selectedCandidate.registration}`}</li>
                  <li className={styles.listItem}>{`Nascimento: ${formatDate(
                    selectedCandidate.birth_date
                  )}`}</li>
                  <li className={styles.listItem}>{`Posse: ${formatDate(
                    selectedCandidate.start_date
                  )}`}</li>
                  <li
                    className={styles.listItem}
                  >{`Lotação: ${selectedCandidate.public_defense}`}</li>
                  <li
                    className={styles.listItem}
                  >{`Antiguidade: ${selectedCandidate.seniority}`}</li>
                  <li
                    className={styles.listItem}
                  >{`Categoria: ${selectedCandidate.category}`}</li>
                </ul>
              ) : (
                <div className={styles.noCandidate}>
                  Nenhum candidato selecionado
                </div>
              )}

              {selectedCandidate && (
                <Button
                  className={styles.button}
                  onClick={handleSelectedCandidate}
                >
                  Adicionar
                </Button>
              )}
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Table;
