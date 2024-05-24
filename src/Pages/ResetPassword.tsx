import { useEffect, useState } from "react";
import Input from "../Components/Input";
import styles from "../Styles/ResetPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Components/Button";
import { fetchResetPassword } from "../Services/Slices/resetPassword";
import { handleKeyPress } from "../Components/Helper";
import Snackbar from "../Components/Snackbar";
import Loading from "../Components/Loading";
import React from "react";
import Title from "../Components/Title";
import { MdKeyboardReturn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showsnackbar, setShowSnackbar] = useState<boolean>(false);
  const [form, setForm] = useState<any>({
    email: "",
  });
  const { data, error, loading } = useSelector(
    (state: any) => state.resetPassword
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch<any>(fetchResetPassword(form));
    setShowSnackbar(true);
  };

  useEffect(() => {
    setShowSnackbar(false);
  }, []);

  return (
    <>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => navigate("/saturno/login/")}
          className={styles.returnButton}
        >
          <MdKeyboardReturn size={18} />
          Voltar
        </Button>
      </div>
      <div className={styles.container}>
        {showsnackbar && error && (
          <Snackbar setShowSnackbar={setShowSnackbar} type="resetError" />
        )}
        {showsnackbar && data?.message && (
          <Snackbar setShowSnackbar={setShowSnackbar} type="resetSuccess" />
        )}
        <div
          className={styles.form}
          onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
        >
          <Title>Redefinir Senha</Title>
          <Input
            type="email"
            className={styles.input}
            fieldType="outlined"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <Button
            className={styles.button}
            onClick={handleSubmit}
            disabled={!form.email.includes("@defensoria.sc.gov.br")}
          >
            {loading ? (
              <div
                style={{
                  position: "relative",
                  top: "-2.5rem",
                }}
              >
                <Loading size="1.5rem" type="spin" />
              </div>
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
