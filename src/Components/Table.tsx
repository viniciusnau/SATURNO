import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styles from "../Styles/Table.module.css";
import Button from "./Button";
import { fetchSelectCandidate } from "../Services/Slices/selectedCandidate";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "./Snackbar";
import domPedro2 from "../Assets/domPedro2.jpg";
import joanaD from "../Assets/joanaDarc.jpg";
import luisxvi from "../Assets/luisxvi.jpg";
import mariaAntonieta from "../Assets/mariaAntonieta.jpg";
import napo from "../Assets/napo.jpg";
import pedroAl from "../Assets/pedroAlv.jpeg";
import akuma from "../Assets/akuma.jpeg";
import blanka from "../Assets/blanka.jpeg";
import chunli from "../Assets/chunli.jpeg";
import jp from "../Assets/jp.jpeg";
import juri from "../Assets/juri.jpeg";
import ken from "../Assets/ken.jpeg";
import guile from "../Assets/guile.jpeg";
import manon from "../Assets/manon.jpeg";
import ryu from "../Assets/ryu.jpeg";
import kimberly from "../Assets/kimberly.jpeg";
import cammy from "../Assets/cammy.jpeg";
import luke from "../Assets/luke.jpeg";
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
        setSelectedCandidateImage(domPedro2);
      } else if (candidate.id === 5) {
        setSelectedCandidateImage(pedroAl);
      } else if (candidate.id === 6) {
        setSelectedCandidateImage(mariaAntonieta);
      } else if (candidate.id === 7) {
        setSelectedCandidateImage(luisxvi);
      } else if (candidate.id === 8) {
        setSelectedCandidateImage(napo);
      } else if (candidate.id === 9) {
        setSelectedCandidateImage(joanaD);
      } else if (candidate.id === 10) {
        setSelectedCandidateImage(juri);
      } else if (candidate.id === 11) {
        setSelectedCandidateImage(chunli);
      } else if (candidate.id === 12) {
        setSelectedCandidateImage(luke);
      } else if (candidate.id === 13) {
        setSelectedCandidateImage(jp);
      } else if (candidate.id === 14) {
        setSelectedCandidateImage(ken);
      } else if (candidate.id === 15) {
        setSelectedCandidateImage(kimberly);
      } else if (candidate.id === 16) {
        setSelectedCandidateImage(jp);
      } else if (candidate.id === 17) {
        setSelectedCandidateImage(cammy);
      } else if (candidate.id === 18) {
        setSelectedCandidateImage(ken);
      } else if (candidate.id === 19) {
        setSelectedCandidateImage(juri);
      } else if (candidate.id === 20) {
        setSelectedCandidateImage(chunli);
      } else if (candidate.id === 21) {
        setSelectedCandidateImage(luke);
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
      return domPedro2;
    } else if (row.id === 5) {
      return pedroAl;
    } else if (row.id === 6) {
      return mariaAntonieta;
    } else if (row.id === 7) {
      return luisxvi;
    } else if (row.id === 8) {
      return napo;
    } else if (row.id === 9) {
      return joanaD;
    } else if (row.id === 10) {
      return juri;
    } else if (row.id === 11) {
      return chunli;
    } else if (row.id === 12) {
      return luke;
    } else if (row.id === 13) {
      return jp;
    } else if (row.id === 14) {
      return ken;
    } else if (row.id === 15) {
      return kimberly;
    } else if (row.id === 16) {
      return jp;
    } else if (row.id === 17) {
      return cammy;
    } else if (row.id === 18) {
      return ken;
    } else if (row.id === 19) {
      return juri;
    } else if (row.id === 20) {
      return chunli;
    } else if (row.id === 21) {
      return luke;
    } else if (row.id === null) {
      return avatar;
    } else {
      return avatar;
    }
  };

  const handleClearButton = () => {
    const nullCandidate = {
      id: "",
      registration: "",
      seniority: "",
      category: "",
      public_defense: "",
    };
    setSelectedCandidate(nullCandidate);
    for (
      var i = 0;
      i < maxCountCandidates - responseSelectedCandidates.length;
      i++
    ) {
      dispatch(fetchSelectCandidate(nullCandidate));
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
          <h3> Candidatos(as) </h3>
          {loading && <Box className={styles.loadingContainer}></Box>}

          {!loading && row?.length === 0 && (
            <div className={styles.noResults}>Nenhum resultado encontrado</div>
          )}

          {row && row?.length > 0 && (
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
          <h3> Detalhes do(a) Candidato(a) Selecionado(a): </h3>
          <div className={styles.detailsContent}>
            <img
              src={selectedCandidateImage || avatar}
              alt="Foto do(a) Candidato(a)"
              className={styles.candidateImage}
            />
            <div className={styles.candidateSelect}>
              {selectedCandidate ? (
                <ul>
                  <li
                    style={{ fontSize: ".9rem" }}
                  >{`Candidato(a): ${selectedCandidate.candidate}`}</li>
                  <li
                    style={{ fontSize: ".9rem" }}
                  >{`Matrícula: ${selectedCandidate.registration}`}</li>
                  <li style={{ fontSize: ".9rem" }}>{`Nascimento: ${formatDate(
                    selectedCandidate.birth_date
                  )}`}</li>
                  <li style={{ fontSize: ".9rem" }}>{`Posse: ${formatDate(
                    selectedCandidate.start_date
                  )}`}</li>
                  <li
                    style={{ fontSize: ".9rem" }}
                  >{`Lotação: ${selectedCandidate.public_defense}`}</li>
                  <li
                    style={{ fontSize: ".9rem" }}
                  >{`Antiguidade: ${selectedCandidate.seniority}`}</li>
                  <li
                    style={{ fontSize: ".9rem" }}
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
