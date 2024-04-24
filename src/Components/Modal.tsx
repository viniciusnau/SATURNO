import React from "react";
import Button from "../Components/Button";
import styles from "../Styles/Modal.module.css";
import { modalText } from "./Consts";

interface IModal {
  content: keyof typeof modalText;
  confirm: () => void;
  setOpenModal: any;
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

  const modalContent = modalText[content];

  return (
    <>
      {open && (
        <div className={styles.backdrop}></div>
      )}
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