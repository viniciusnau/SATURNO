import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchElectionsResult } from "../Services/Slices/resultsSlice";
import Box from "@mui/material/Box";
import Snackbar from "../Components/Snackbar";
import styles from "../Styles/ElectionsResults.module.css";
import avatar from "../Assets/avatar.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";
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
import Title from "../Components/Title";
import { deadline } from "../Components/Consts";

const ElectionsResults = () => {
  const dispatch = useDispatch<any>();
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

  const [finalVoteTime, setFinalVoteTime] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const currentDateTime = new Date();
    const remainingTimeInSeconds = calculateTimeRemaining(
      currentDateTime,
      deadline.finalVote
    );
    setTimeRemaining(remainingTimeInSeconds);

    if (currentDateTime >= deadline.finalVote) {
      setFinalVoteTime(true);
      const intervalId = setInterval(() => {
        const newTimeRemaining = calculateTimeRemaining(
          new Date(),
          deadline.finalVote
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
    const currentDateTime = new Date();
    const remainingTimeInSeconds = calculateTimeRemaining(
      currentDateTime,
      deadline.finalVote
    );
    setTimeRemaining(remainingTimeInSeconds);

    if (remainingTimeInSeconds <= 0) {
      setFinalVoteTime(true);
    } else {
      const intervalId = setInterval(() => {
        const newTimeRemaining = calculateTimeRemaining(
          new Date(),
          deadline.finalVote
        );
        setTimeRemaining(newTimeRemaining);
        if (newTimeRemaining <= 0) {
          setFinalVoteTime(true);
          clearInterval(intervalId);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(event.target.value);
    setSelectedCandidate(null);
  };

  const handleCandidateClick = (rowId: any) => {
    const candidate = data.find((candidate: any) => candidate.id === rowId);
    setSelectedCandidate(candidate);
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

  const handleClearSelection = () => {
    setSelectedCandidate(null);
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

  return finalVoteTime ? (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.nullVotesLegend}>
          <Title>
            Eleitores que não utilizaram o número máximo de votos:{" "}
            {blankVotes && totalPeople
              ? ((blankVotes / totalPeople) * 100).toFixed(2)
              : "0"}
            % ({blankVotes})
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
          <select
            value={selectedPosition}
            onChange={handleChange}
            className={styles.select}
          >
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
              Detalhes do(a) Candidato(a) Selecionado:
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
          A visualização dos resultados das eleições estará disponível em:
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
