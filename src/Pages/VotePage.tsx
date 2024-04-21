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

  const responseDataUser = useSelector((state: any) => state.meId);

  const { data, loading, error } = useSelector(
    (state: any) => state.getListCandidates
  );
  const responseListCandidates = useSelector(
    (state: any) => state.selectedCandidate
  );
  const responseSelectedCandidates = useSelector(
    (state: any) => state.selectedCandidate.selectedCandidates
  );

  const positionId = useSelector((state: any) => state.meId.positionId);
  const maxCount = useSelector((state: any) => state.meId.maxCount);
  const allVoted = responseDataUser?.data?.votes_info?.every(
    (vote: any) => vote.vote_status === "voted"
  );

  const columns = [
    { title: "Nome", property: "candidate" },
    { title: "Matrícula", property: "registration" },
    { title: "Antiguidade", property: "seniority" },
    { title: "Categoria", property: "category" },
    { title: "Lotação", property: "public_defense" },
  ];

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
      } else {
        if (votePosition2 && votePosition2.vote_status === "not voted") {
          maxCount = 5;
          positionId = 2;
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
      const blankVoteRow = {
        id: "",
        candidate: "Voto Branco",
        registration: "-",
        birth_date: "-",
        start_date: "-",
        seniority: "-",
        category: "-",
        public_defense: "-",
      };

      const updatedRows = [...data, blankVoteRow];
      setRows(updatedRows);
    }
  }, [isDispatched, loading, error, data]);

  useEffect(() => {
    votePage &&
      dispatch(fetchListCandidates({ position_id: positionId })) &&
      setIsDispatched(true);
  }, [votePage]);

  const handleSubmitVote = () => {
    const countSelectedCandidates = responseSelectedCandidates.length;
    countSelectedCandidates === maxCount
      ? setIsOpenModal(true)
      : setError("voteCountError");
  };

  const handleConfirmVote = () => {
    responseSelectedCandidates.forEach((candidate: any) => {
      const voteData = {
        position: positionId,
        chosen_person: `${candidate.id}`,
        voting_person: `${responseDataUser.data.user_id}`,
      };
      dispatch(fetchPostVote(voteData)) && setVotePage(true);
      dispatch(removeAllCandidates()) && setMessage("voteSuccess");
      positionId === 1 ? setVerifyVote(true) : navigate("/saturno/vote-pdf/");
    });
  };

  return (
    <div className={styles.VotePage}>
      {allVoted && navigate("/saturno/vote-pdf/")}
      {Error && <Snackbar type={Error} setShowSnackbar={setError} />}
      {message && <Snackbar type={message} setShowSnackbar={setMessage} />}
      {isOpenModal && (
        <Modal
          content="sendVote"
          confirm={handleConfirmVote}
          setOpenModal={setIsOpenModal}
        />
      )}
      <h1 className={styles.title}> Votação Eleitoral </h1>
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
