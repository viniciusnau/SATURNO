import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchmeId, setPositionId, setMaxCount } from "../Services/Slices/meId";
import { fetchListCandidates } from "../Services/Slices/getListCandidates";
import { removeAllCandidates } from "../Services/Slices/selectedCandidate";
import { fetchPostVote } from "../Services/Slices/postCreateVote";
import styles from "../Styles/VotePage.module.css";
import Table from "../Components/Table";
import Button from "../Components/Button";
import avatar from "../Assets/avatar.svg";
import MiniTable from "../Components/MiniTable";
import Snackbar from "../Components/Snackbar";
import Modal from "../Components/Modal";
import Title from "../Components/Title";
import { deadline } from "../Components/Consts";

const VotePage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [votePage, setVotePage] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);
  const [Error, setError] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const [verifyVote, setVerifyVote] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalNullVotes, setModalNullVotes] = useState<boolean>(false);
  const [positionCandidades, setPositionCandidates] = useState<any>("");
  const [initialVoteTime, setInitialVoteTime] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [finalVoteEnded, setFinalVoteEnded] = useState<boolean>(false);
  const columns = [
    { title: "Nome", property: "candidate" },
    { title: "Matrícula", property: "registration" },
    { title: "Antiguidade", property: "seniority" },
    { title: "Categoria", property: "category" },
    { title: "Lotação", property: "public_defense" },
  ];

  const responseDataUser = useSelector((state: any) => state.meId);

  const positionId = useSelector((state: any) => state.meId.positionId);
  const maxCount = useSelector((state: any) => state.meId.maxCount);
  const allVoted = responseDataUser?.data?.votes_info?.every(
    (vote: any) => vote.vote_status === "voted"
  );

  const { data, loading, error } = useSelector(
    (state: any) => state.getListCandidates
  );
  const responseListCandidates = useSelector(
    (state: any) => state.selectedCandidate
  );
  const responseSelectedCandidates = useSelector(
    (state: any) => state.selectedCandidate.selectedCandidates
  );

  const handleSubmitVote = () => {
    const countSelectedCandidates = responseSelectedCandidates.length;
    countSelectedCandidates >= 1
      ? setIsOpenModal(true)
      : setError("voteCountError");
  };

  const handleSubmitNullVote = () => {
    setModalNullVotes(true);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setModalNullVotes(false);
  };

  const handleConfirmVote = () => {
    let candidates: any;
    if (responseSelectedCandidates.length === 0) {
      const emptyVoteData = {
        position: positionId,
        chosen_person: "",
        voting_person: `${responseDataUser.data.person_id}`,
      };

      for (let i = 0; i < (positionId === 1 ? 3 : 5); i++) {
        dispatch(fetchPostVote(emptyVoteData)) && setVotePage(true);
        dispatch(removeAllCandidates()) && setMessage("voteSuccess");
        positionId === 1 ? setVerifyVote(true) : navigate("/saturno/vote-pdf/");
      }

      return;
    }

    const maxCount = positionId === 1 ? 3 : 5;
    const remainingVotes = maxCount - responseSelectedCandidates.length;

    if (remainingVotes === 1) {
      let candidates = [...responseSelectedCandidates];
      const emptyVoteData = {
        position: positionId,
        chosen_person: "",
        voting_person: `${responseDataUser.data.person_id}`,
      };
      candidates = candidates.concat([emptyVoteData]);

      candidates.forEach((candidate: any) => {
        const chosenPersonId = candidate.id !== undefined ? candidate.id : "";
        const voteData = {
          position: positionId,
          chosen_person: `${chosenPersonId}`,
          voting_person: `${responseDataUser.data.person_id}`,
        };
        dispatch(fetchPostVote(voteData)) && setVotePage(true);
        dispatch(removeAllCandidates()) && setMessage("voteSuccess");
        positionId === 1 ? setVerifyVote(true) : navigate("/saturno/vote-pdf/");
      });

      return;
    }

    if (remainingVotes === 2) {
      let candidates = [...responseSelectedCandidates];
      const emptyVoteData = {
        position: positionId,
        chosen_person: "",
        voting_person: `${responseDataUser.data.person_id}`,
      };
      candidates = candidates.concat([emptyVoteData, emptyVoteData]);

      candidates.forEach((candidate: any) => {
        const chosenPersonId = candidate.id !== undefined ? candidate.id : "";
        const voteData = {
          position: positionId,
          chosen_person: `${chosenPersonId}`,
          voting_person: `${responseDataUser.data.person_id}`,
        };
        dispatch(fetchPostVote(voteData)) && setVotePage(true);
        dispatch(removeAllCandidates()) && setMessage("voteSuccess");
        positionId === 1 ? setVerifyVote(true) : navigate("/saturno/vote-pdf/");
      });

      return;
    }

    if (remainingVotes === 3) {
      let candidates = [...responseSelectedCandidates];
      const emptyVoteData = {
        position: positionId,
        chosen_person: "",
        voting_person: `${responseDataUser.data.person_id}`,
      };
      candidates = candidates.concat([
        emptyVoteData,
        emptyVoteData,
        emptyVoteData,
      ]);

      candidates.forEach((candidate: any) => {
        const chosenPersonId = candidate.id !== undefined ? candidate.id : "";
        const voteData = {
          position: positionId,
          chosen_person: `${chosenPersonId}`,
          voting_person: `${responseDataUser.data.person_id}`,
        };
        dispatch(fetchPostVote(voteData)) && setVotePage(true);
        dispatch(removeAllCandidates()) && setMessage("voteSuccess");
        positionId === 1 ? setVerifyVote(true) : navigate("/saturno/vote-pdf/");
      });

      return;
    }

    if (remainingVotes === 4) {
      let candidates = [...responseSelectedCandidates];
      const emptyVoteData = {
        position: positionId,
        chosen_person: "",
        voting_person: `${responseDataUser.data.person_id}`,
      };
      candidates = candidates.concat([
        emptyVoteData,
        emptyVoteData,
        emptyVoteData,
        emptyVoteData,
      ]);

      candidates.forEach((candidate: any) => {
        const chosenPersonId = candidate.id !== undefined ? candidate.id : "";
        const voteData = {
          position: positionId,
          chosen_person: `${chosenPersonId}`,
          voting_person: `${responseDataUser.data.person_id}`,
        };
        dispatch(fetchPostVote(voteData)) && setVotePage(true);
        dispatch(removeAllCandidates()) && setMessage("voteSuccess");
        positionId === 1 ? setVerifyVote(true) : navigate("/saturno/vote-pdf/");
      });

      return;
    }

    responseSelectedCandidates.forEach((candidate: any) => {
      const voteData = {
        position: positionId,
        chosen_person: `${candidate.id}`,
        voting_person: `${responseDataUser.data.person_id}`,
      };
      dispatch(fetchPostVote(voteData)) && setVotePage(true);
      dispatch(removeAllCandidates()) && setMessage("voteSuccess");
      positionId === 1 ? setVerifyVote(true) : navigate("/saturno/vote-pdf/");
    });
  };

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
      deadline.initialVote
    );
    setTimeRemaining(remainingTimeInSeconds);

    if (currentDateTime <= deadline.initialVote) {
      setInitialVoteTime(false);
      const intervalId = setInterval(() => {
        const newTimeRemaining = calculateTimeRemaining(
          new Date(),
          deadline.initialVote
        );
        setTimeRemaining(newTimeRemaining);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) {
      const currentDateTime = new Date();
      if (currentDateTime <= deadline.initialVote) {
        setInitialVoteTime(false);
      }
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setInitialVoteTime(false);
    }
  }, [timeRemaining]);

  useEffect(() => {
    dispatch(fetchmeId()) && setIsDispatched(true);
  }, [dispatch, verifyVote]);

  useEffect(() => {
    if (responseDataUser && responseDataUser?.data?.votes_info) {
      let maxCount;
      let positionId;

      const votePosition1 = responseDataUser.data.votes_info.find(
        (vote: any) => vote.position_id === 1
      );
      const votePosition2 = responseDataUser.data.votes_info.find(
        (vote: any) => vote.position_id === 2
      );
      if (votePosition1 && votePosition1.vote_status === "not voted") {
        maxCount = 3;
        positionId = 1;
        setPositionCandidates("Defensor(a) Público(a) Geral");
      } else {
        if (votePosition2 && votePosition2.vote_status === "not voted") {
          maxCount = 5;
          positionId = 2;
          setPositionCandidates("Membro(a) do Conselho Superior");
        }
      }
      dispatch(setMaxCount(maxCount)) && dispatch(setPositionId(positionId));
      setVerifyVote(false);
    }
  }, [responseDataUser, dispatch]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const currentDateTime = new Date();
      if (currentDateTime <= deadline.initialVote) {
        setInitialVoteTime(true);
      }
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (isDispatched && !loading && !error) {
      const updatedRows = data;
      setRows(updatedRows);
    }
  }, [isDispatched, loading, error, data]);

  useEffect(() => {
    votePage && setModalNullVotes(false);
    dispatch(fetchListCandidates({ position_id: positionId })) &&
      setIsDispatched(true);
  }, [votePage]);

  useEffect(() => {
    dispatch(fetchListCandidates({ position_id: positionId })) &&
      setIsDispatched(true);
  }, [positionId, dispatch]);

  useEffect(() => {
    if (isDispatched && !loading && !error && data.length > 0) {
      const updatedRows = data;
      setRows(updatedRows);
    }
  }, [isDispatched, loading, error, data]);

  useEffect(() => {
    votePage && setModalNullVotes(false);
    dispatch(fetchListCandidates({ position_id: positionId })) &&
      setIsDispatched(true);
  }, [votePage]);

  useEffect(() => {
    const finalVoteTimeInterval = setInterval(() => {
      const currentDateTime = new Date();
      if (currentDateTime >= deadline.finalVote) {
        setFinalVoteEnded(true);
        clearInterval(finalVoteTimeInterval);
      }
    }, 10);

    return () => clearInterval(finalVoteTimeInterval);
  }, []);

  if (finalVoteEnded) {
    navigate("/saturno/vote-pdf/");
  }

  return initialVoteTime ? (
    <div className={styles.votePageNotTime}>
      <div>
        <Title>O SATURNO estará disponível para votação em:</Title>
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
  ) : (
    <div className={styles.VotePage}>
      {allVoted && navigate("/saturno/vote-pdf/")}
      {Error && <Snackbar type={Error} setShowSnackbar={setError} />}
      {message && <Snackbar type={message} setShowSnackbar={setMessage} />}
      {isOpenModal && (
        <Modal
          content={{
            sendVote: modalNullVotes
              ? {
                  title: "Confirmação de voto nulo!",
                  description: `todos os votos serão anulados para ${positionCandidades}, deseja continuar?`,
                  button: "Confirmar",
                }
              : {
                  title: "Confirmação de voto!",
                  description: `Você tem certeza que deseja finalizar a votação para ${positionCandidades}?`,
                  button: "Confirmar",
                },
          }}
          confirm={handleConfirmVote}
          setOpenModal={handleCloseModal}
          open={isOpenModal}
        />
      )}
      <Title>Votação Eleitoral - {positionCandidades} </Title>
      <div className={styles.TableContainer}>
        <div className={styles.Table}>
          <Table image={avatar} row={rows} loading={loading} />
        </div>
      </div>
      <div className={styles.MiniTable}>
        <MiniTable
          columns={columns}
          data={responseListCandidates.selectedCandidates}
        />
      </div>
      <Button
        className={styles.button}
        onClick={handleSubmitNullVote}
        disabled={responseSelectedCandidates.length > 0}
      >
        Votar Nulo
      </Button>
      <Button className={styles.button} onClick={handleSubmitVote}>
        Finalizar Votação
      </Button>
    </div>
  );
};

export default VotePage;
