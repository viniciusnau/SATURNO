import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchElectionsResult } from "../Services/Slices/resultsSlice";
import Box from "@mui/material/Box";
import Snackbar from "../Components/Snackbar";
import styles from "../Styles/ElectionsResults.module.css";
import avatar from "../Assets/avatar.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Nubsaibot from "../Assets/Nubsaibot.jpg";
import subzero from "../Assets/subzero.jpeg";
import scorpion from "../Assets/scorpion.jpeg";
import raiden from "../Assets/raiden.jpeg";
import liukang from "../Assets/liukang.jpeg";
import shang from "../Assets/shang.jpeg";
import cage from "../Assets/cage.jpeg";
import kitana from "../Assets/kitana.jpeg";
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

  const positionOptions = {
    "Defensor Público-Geral": "1",
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
    const availableDateTime = new Date("2024-06-06T17:00:59");
    if (currentDateTime <= availableDateTime) {
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
        setSelectedCandidateImage(Nubsaibot);
      } else if (candidate.id === 28) {
        setSelectedCandidateImage(subzero);
      } else if (candidate.id === 27) {
        setSelectedCandidateImage(scorpion);
      } else if (candidate.id === 26) {
        setSelectedCandidateImage(raiden);
      } else if (candidate.id === 25) {
        setSelectedCandidateImage(liukang);
      } else if (candidate.id === 24) {
        setSelectedCandidateImage(shang);
      } else if (candidate.id === 23) {
        setSelectedCandidateImage(cage);
      } else if (candidate.id === 22) {
        setSelectedCandidateImage(kitana);
      } else if (candidate.id === 42) {
        setSelectedCandidateImage(blanka);
      } else if (candidate.id === 41) {
        setSelectedCandidateImage(akuma);
      } else if (candidate.id === 40) {
        setSelectedCandidateImage(ryu);
      } else if (candidate.id === 38) {
        setSelectedCandidateImage(guile);
      } else if (candidate.id === 36) {
        setSelectedCandidateImage(manon);
      } else if (candidate.id === 35) {
        setSelectedCandidateImage(kimberly);
      } else if (candidate.id === 34) {
        setSelectedCandidateImage(jp);
      } else if (candidate.id === 33) {
        setSelectedCandidateImage(cammy);
      } else if (candidate.id === 32) {
        setSelectedCandidateImage(ken);
      } else if (candidate.id === 31) {
        setSelectedCandidateImage(juri);
      } else if (candidate.id === 30) {
        setSelectedCandidateImage(chunli);
      } else if (candidate.id === 29) {
        setSelectedCandidateImage(luke);
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
      return Nubsaibot;
    } else if (row.id === 28) {
      return subzero;
    } else if (row.id === 27) {
      return scorpion;
    } else if (row.id === 26) {
      return raiden;
    } else if (row.id === 25) {
      return liukang;
    } else if (row.id === 24) {
      return shang;
    } else if (row.id === 23) {
      return cage;
    } else if (row.id === 22) {
      return kitana;
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

  return startTime ? (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.nullVotesLegend}>
          <h3>
            Eleitores com votos em branco:{" "}
            {((blankVotes / totalPeople) * 100).toFixed(2)}% ({blankVotes})
          </h3>
        </div>
        <Box className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(blankVotes / totalPeople) * 100}%` }}
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
                      {row.id !== null &&
                        row.id !== "total_count" &&
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
                                  alt="Foto do Candidato"
                                />
                              </div>
                              <div className={styles.info}>
                                <p>{`${row.name}`}</p>
                                <p
                                  style={{ fontSize: "1.25rem" }}
                                >{`${row.public_defense} - ${row.registration}`}</p>
                                <p
                                  style={{ fontSize: "1rem" }}
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
            <p className={styles.title}>Detalhes do Candidato Selecionado:</p>
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
              alt="Foto do Candidato"
              className={styles.candidateImage}
            />
            {selectedCandidate &&
            selectedCandidate.id !== "null" &&
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
      A visualização dos resultados estará disponível a partir de 06/06/2024
      17:00.
    </div>
  );
};

export default ElectionsResults;
