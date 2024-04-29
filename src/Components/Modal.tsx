import React from "react";
import Button from "../Components/Button";
import styles from "../Styles/Modal.module.css";

interface IModalContent {
  title: string;
  description: string;
  button: string;
}

interface ISendVote {
  sendVote: IModalContent;
}

interface IModal {
  content: ISendVote;
  confirm: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const Modal: React.FC<IModal> = ({
  content,
  confirm,
  setOpenModal,
  open,
}) => {
  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleConfirm = () => {
    confirm();
    setOpenModal(false);
  };

  const modalContent = content.sendVote;

  return (
    <>
      {open && <div className={styles.backdrop}></div>}
      <div className={`${styles.container} ${open ? styles.open : ""}`}>
        <h2>{modalContent.title}</h2>
        <div className={styles.buttonContainer}>
          <p>{modalContent.description}</p>
          <Button className={styles.button} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button className={styles.button} onClick={handleConfirm}>
            {modalContent.button}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
