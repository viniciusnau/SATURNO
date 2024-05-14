import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "../Styles/Table.module.css";
import Button from "./Button";
import { fetchSelectCandidate } from "../Services/Slices/selectedCandidate";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "./Snackbar";
import domPedro2 from "../Assets/domPedro2.jpg"
import joanaD from "../Assets/joanaDarc.jpg"
import luisxvi from "../Assets/luisxvi.jpg"
import mariaAntonieta from "../Assets/mariaAntonieta.jpg"
import napo from "../Assets/napo.jpg"
import pedroAl from "../Assets/pedroAlv.jpeg"
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
      if (candidate.id === 39) {
        setSelectedCandidateImage(domPedro2);
      } else if (candidate.id === 21) {
        setSelectedCandidateImage(pedroAl);
      } else if (candidate.id === 22) {
        setSelectedCandidateImage(mariaAntonieta);
      } else if (candidate.id === 23) {
        setSelectedCandidateImage(luisxvi);
      } else if (candidate.id === 24) {
        setSelectedCandidateImage(napo);
      } else if (candidate.id === 25) {
        setSelectedCandidateImage(joanaD);
      } else if (candidate.id === 6) {
        setSelectedCandidateImage(blanka);
      } else if (candidate.id === 7) {
        setSelectedCandidateImage(akuma);
      } else if (candidate.id === 9) {
        setSelectedCandidateImage(ryu);
      } else if (candidate.id === 10) {
        setSelectedCandidateImage(guile);
      } else if (candidate.id === 11) {
        setSelectedCandidateImage(manon);
      } else if (candidate.id === 12) {
        setSelectedCandidateImage(kimberly);
      } else if (candidate.id === 13) {
        setSelectedCandidateImage(jp);
      } else if (candidate.id === 14) {
        setSelectedCandidateImage(cammy);
      } else if (candidate.id === 15) {
        setSelectedCandidateImage(ken);
      } else if (candidate.id === 16) {
        setSelectedCandidateImage(juri);
      } else if (candidate.id === 18) {
        setSelectedCandidateImage(chunli);
      } else if (candidate.id === 19) {
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
    if (row.id === 39) {
      return domPedro2;
    } else if (row.id === 21) {
      return pedroAl;
    } else if (row.id === 22) {
      return mariaAntonieta;
    } else if (row.id === 23) {
      return luisxvi;
    } else if (row.id === 24) {
      return napo;
    } else if (row.id === 25) {
      return joanaD;
    } else if (row.id === 6) {
      return blanka;
    } else if (row.id === 7) {
      return akuma;
    } else if (row.id === 9) {
      return ryu;
    } else if (row.id === 10) {
      return guile;
    } else if (row.id === 11) {
      return manon;
    } else if (row.id === 12) {
      return kimberly;
    } else if (row.id === 13) {
      return jp;
    } else if (row.id === 14) {
      return cammy;
    } else if (row.id === 15) {
      return ken;
    } else if (row.id === 16) {
      return juri;
    } else if (row.id === 18) {
      return chunli;
    } else if (row.id === 19) {
      return luke;
    } else if (row.id === null) {
      return avatar;
    } else {
      return avatar;
    }
  };
const handleClearButton = () => {
  const nullCandidate = { id: '', registration:'', seniority:'', category:'', public_defense:''};
  setSelectedCandidate(nullCandidate);
  for(var i = 0; i <maxCountCandidates - responseSelectedCandidates.length; i++) {
    dispatch(fetchSelectCandidate(nullCandidate));
  }
};


  return (
    <div>
      {error && <Snackbar type={error} setShowSnackbar={setError} />}
      <Box className={styles.megaBox}>
        <Box className={styles.rowContainer}>
          <h4> Candidatos(as) </h4>
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
          <div className={styles.detailscontainer}>
            <h4> Detalhes do(a) Candidato(a) Selecionado(a): </h4>
          </div>
          <div className={styles.detailsContent}>
            <img
              src={selectedCandidateImage || avatar}
              alt="Foto do(a) Candidato(a)"
              className={styles.candidateImage}
            />
            <div className={styles.candidateSelect}>
              {selectedCandidate ? (
                <ul>
                  <li>{`Candidato(a): ${selectedCandidate.candidate}`}</li>
                  <li>{`Matrícula: ${selectedCandidate.registration}`}</li>
                  <li>{`Nascimento: ${formatDate(
                    selectedCandidate.birth_date
                  )}`}</li>
                  <li>{`Posse: ${formatDate(
                    selectedCandidate.start_date
                  )}`}</li>
                  <li>{`Lotação: ${selectedCandidate.public_defense}`}</li>
                  <li>{`Antiguidade: ${selectedCandidate.seniority}`}</li>
                  <li>{`Categoria: ${selectedCandidate.category}`}</li>
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
