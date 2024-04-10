import React from "react";
import Button from "../Components/Button";
import styles from "../Styles/Modal.module.css";
import { modalText } from "./Consts";

interface IModal {
  content: keyof typeof modalText;
  confirm: () => void;
  setOpenModal: any;
}

const Modal: React.FC<IModal> = ({
  content,
  confirm,
  setOpenModal,
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
    <div className={styles.container}>
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
  );
};

export default Modal;