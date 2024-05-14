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
  const [positionCandidades, setPositionCandidates] = useState<any>("");
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

  const [limitTimeVote, setLimitTimeVote] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const handleSubmitVote = () => {
    const countSelectedCandidates = responseSelectedCandidates.length;
    countSelectedCandidates === maxCount
      ? setIsOpenModal(true)
      : setError("voteCountError");
  };

  console.log(responseSelectedCandidates.selectedCandidates);

  const handleConfirmVote = () => {
    responseSelectedCandidates.forEach((candidate: any) => {
      const voteData = {
        position: positionId,
        chosen_person: `${candidate.id}`,
        voting_person: `${responseDataUser.data.person_id}`,
      };
      console.log(voteData)
      // dispatch(fetchPostVote(voteData)) && setVotePage(true);
      // dispatch(removeAllCandidates()) && setMessage("voteSuccess");
      // positionId === 1 ? setVerifyVote(true) : navigate("/saturno/vote-pdf/");
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
      deadline.initial
    );
    setTimeRemaining(remainingTimeInSeconds);

    if (currentDateTime <= deadline.initial) {
      setLimitTimeVote(true);
      const intervalId = setInterval(() => {
        const newTimeRemaining = calculateTimeRemaining(
          new Date(),
          deadline.initial
        );
        setTimeRemaining(newTimeRemaining);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) {
      const currentDateTime = new Date();
      if (currentDateTime <= deadline.initial) {
        setLimitTimeVote(true);
      }
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setLimitTimeVote(false);
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
    dispatch(fetchListCandidates({ position_id: positionId })) &&
      setIsDispatched(true);
  }, [positionId, dispatch]);

  useEffect(() => {
    if (isDispatched && !loading && !error) {
      const updatedRows = data;
      setRows(updatedRows);
    }
  }, [isDispatched, loading, error, data]);

  useEffect(() => {
    votePage &&
      dispatch(fetchListCandidates({ position_id: positionId })) &&
      setIsDispatched(true);
  }, [votePage]);

  return limitTimeVote ? (
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
            sendVote: {
              title: "Confirmação de voto!",
              description: `Você tem certeza que deseja finalizar a votação para ${positionCandidades}?`,
              button: "Confirmar",
            },
          }}
          confirm={handleConfirmVote}
          setOpenModal={setIsOpenModal}
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
      <Button className={styles.button} onClick={handleSubmitVote}>
        Finalizar Votação
      </Button>
    </div>
  );
};

export default VotePage;
