import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchElectionsResult } from "../Services/Slices/resultsSlice";
import Box from "@mui/material/Box";
import Snackbar from "../Components/Snackbar";
import styles from "../Styles/ElectionsResults.module.css";
import avatar from "../Assets/avatar.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import domPedro2 from "../Assets/domPedro2.jpg";
import joanaD from "../Assets/joanaDarc.jpg";
import luisxvi from "../Assets/luisxvi.jpg";
import mariaAntonieta from "../Assets/mariaAntonieta.jpg";
import napo from "../Assets/napo.jpg";
import pedroAl from "../Assets/pedroAlv.jpeg";
import akuma from "../Assets/kitana.jpeg";
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
import Title from "../Components/Title";
import { deadline } from "../Components/Consts";

const ElectionsResults = () => {
  const dispatch = useDispatch<any>();
  const [startTime, setStartTime] = useState<boolean>(true);
  const [selectedPosition, setSelectedPosition] = useState<string>("1");
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [blankVotes, setBlankVotes] = useState<number>(0);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [totalPeople, setTotalPeople] = useState<number>(0);
  const [selectedCandidateImage, setSelectedCandidateImage] = useState<
    string | null
  >(null);
  const { data, error, loading } = useSelector(
    (state: any) => state.electionsResultSlice
  );

  const [limitTimeVote, setLimitTimeVote] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const currentDateTime = new Date();
    const remainingTimeInSeconds = calculateTimeRemaining(
      currentDateTime,
      deadline.final
    );
    setTimeRemaining(remainingTimeInSeconds);

    if (currentDateTime >= deadline.final) {
      setLimitTimeVote(true);
      const intervalId = setInterval(() => {
        const newTimeRemaining = calculateTimeRemaining(
          new Date(),
          deadline.final
        );
        setTimeRemaining(newTimeRemaining);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  const calculateTimeRemaining = (
    currentDateTime: Date,
    deadlineDateTime: Date
  ): number => {
    const differenceMs = deadlineDateTime.getTime() - currentDateTime.getTime();
    return Math.max(Math.floor(differenceMs / 1000), 0);
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      const currentDateTime = new Date();
      if (currentDateTime >= deadline.final) {
        setLimitTimeVote(true);
      }
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setLimitTimeVote(false);
    }
  }, [timeRemaining]);

  const positionOptions = {
    "Defensor(a) Público-Geral": "1",
    "Conselho Superior": "2",
  };

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

  useEffect(() => {
    const currentDateTime = new Date();
    if (currentDateTime <= deadline.final) {
      setStartTime(false);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(event.target.value);
    setSelectedCandidate(null);
  };

  const handleCandidateClick = (rowId: any) => {
    const candidate = data.find((candidate: any) => candidate.id === rowId);
    setSelectedCandidate(candidate);
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
      } else if (candidate.id === null) {
        setSelectedCandidateImage(avatar);
      } else {
        setSelectedCandidateImage(avatar);
      }
    }
    setSelectedCandidate(candidate);
  };

  const handleClearSelection = () => {
    setSelectedCandidate(null);
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
        if (item.id === "none_votes") {
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

  return startTime ? (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.nullVotesLegend}>
          <Title>
            Eleitores que não utilizaram o número máximo de votos:{" "}
            {((blankVotes / totalPeople) * 100).toFixed(2)}% ({blankVotes})
          </Title>
        </div>
        <Box className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${(blankVotes / totalPeople) * 100}%`,
              }}
            ></div>
          </div>
        </Box>
        <h4>Total de eleitores: {totalPeople}</h4>
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
                      {row.id !== "total_count" &&
                        row.id !== "none_votes" &&
                        row.id !== "total_people" && (
                          <tr
                            onClick={() => handleCandidateClick(row.id)}
                            className={`${styles.tr} ${
                              selectedCandidate &&
                              selectedCandidate.id === row.id
                                ? styles.selected
                                : ""
                            }`}
                          >
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
                                  src={loadImage(row)}
                                  alt="Foto do(a) Candidato(a)"
                                />
                              </div>
                              <div className={styles.info}>
                                <p>{`${row.name}`}</p>
                                {selectedCandidate && row.id !== null && (
                                  <p
                                    style={{
                                      fontSize: "1.25rem",
                                    }}
                                  >{`${row.public_defense} - ${row.registration}`}</p>
                                )}
                                <p
                                  style={{
                                    fontSize: "1rem",
                                  }}
                                >{`Votos computados ${row.vote_count} • ${(
                                  (row.vote_count / totalVotes) *
                                  100
                                ).toFixed(2)}%`}</p>
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className={styles.title}>
              Detalhes do Candidato(a) Selecionado:
            </p>
            {selectedCandidate && (
              <AiOutlineCloseCircle
                size={32}
                className={styles.closeIcon}
                onClick={handleClearSelection}
              />
            )}
          </div>
          <div className={styles.detailsContent}>
            <img
              src={
                selectedCandidate && selectedCandidateImage
                  ? selectedCandidateImage
                  : avatar
              }
              alt="Foto do(a) Candidato(a)"
              className={styles.candidateImage}
            />
            {selectedCandidate &&
            selectedCandidate.id !== "none_votes" &&
            selectedCandidate.id !== null &&
            selectedCandidate.id !== "total_count" ? (
              <div>
                <p
                  className={styles.description}
                >{`Matrícula: ${selectedCandidate.registration}`}</p>
                <p className={styles.description}>{`Nascimento: ${formatDate(
                  selectedCandidate.birth_date
                )}`}</p>
                <p className={styles.description}>{`Posse: ${formatDate(
                  selectedCandidate.start_date
                )}`}</p>
                <p
                  className={styles.description}
                >{`Lotação: ${selectedCandidate.public_defense}`}</p>
                <p
                  className={styles.description}
                >{`Antiguidade: ${selectedCandidate.seniority}`}</p>
                <p
                  className={styles.description}
                >{`Categoria: ${selectedCandidate.category}`}</p>
              </div>
            ) : (
              <div className={styles.noCandidate}>
                Nenhum candidato selecionado
              </div>
            )}
          </div>
        </Box>
      </Box>
    </div>
  ) : (
    <div className={styles.notAvailableMessage}>
      <div>
        <Title>
          {" "}
          A visualização dos resultados das eleicões estará disponível em:
        </Title>
        <h2 className={styles.clock}>
          <div className={styles.blocktimer}>
            <span className={styles["clock-part"]}>
              {String(Math.floor(timeRemaining / 3600)).padStart(2, "0")}
            </span>
            <span className={styles.time}>Horas</span>
          </div>
          <span className={styles["clock-separator"]}>:</span>
          <div className={styles.blocktimer}>
            <span className={styles["clock-part"]}>
              {String(Math.floor((timeRemaining % 3600) / 60)).padStart(2, "0")}
            </span>
            <span className={styles.time}>Minutos</span>
          </div>
          <span className={styles["clock-separator"]}>:</span>
          <div className={styles.blocktimer}>
            <span className={styles["clock-part"]}>
              {String(timeRemaining % 60).padStart(2, "0")}
            </span>
            <span className={styles.time}>Segundos</span>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default ElectionsResults;
