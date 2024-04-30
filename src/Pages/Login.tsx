import React, { useEffect, useState } from "react";
import styles from "../Styles/Login.module.css";
import icon from "../Assets/google-icon.png";
import { fetchLogin } from "../Services/Slices/getLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATH } from "../PATH";
import Input from "../Components/Input";
import Snackbar from "../Components/Snackbar";
import Loading from "../Components/Loading";
import { handleKeyPress } from "../Components/Helper";
import Button from "../Components/Button";
import { Link } from "@mui/material";
import Title from "../Components/Title";
import { fetchTokenTimeInfo } from "../Services/Slices/authState";

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { data, loading, error, status } = useSelector(
    (state: any) => state.loginSlice
  );
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [hasResponseValue, setHasResponseValue] = useState<boolean>(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [limitTime, setLimitTime] = useState<boolean>(false);

  useEffect(() => {
    const currentDateTime = new Date();
    const deadlineDateTime = new Date("2025-04-20T20:50:59");
    if (currentDateTime >= deadlineDateTime) {
      setLimitTime(true);
    }
  }, []);

  const handleGoogleLogin = () => {
    const googleLoginUrl = `${PATH.base}/user/google-redirect`;
    window.location.href = googleLoginUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setForm((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    if (limitTime) {
      setShowSnackbar(true);
      return;
    }

    dispatch(fetchLogin(form));
    setIsDispatched(true);
    setForm({
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    if (isDispatched && status === 200) {
      dispatch(fetchTokenTimeInfo());
      navigate("/saturno/vote/");
    }
  }, [data, isDispatched, navigate]);

  useEffect(() => {
    if (isDispatched) {
      setTimeout(() => {
        setIsDispatched(false);
        setHasResponseValue(false);
      }, 3000);
    }
  }, [isDispatched]);

  useEffect(() => {
    setHasResponseValue(true);
  }, [data]);

  return (
    <div className={styles.container}>
      {showSnackbar && (
        <Snackbar type="errorLoginExpired" setShowSnackbar={setShowSnackbar} />
      )}
      {error && isDispatched && (
        <Snackbar type="errorLogin" setShowSnackbar={setIsDispatched} />
      )}
      <div
        className={styles.loginForm}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        <Title>Bem Vindo(a)</Title>
        <div className={styles.formGroup}>
          <div className={styles.password}>
            <Input
              className={styles.input}
              fieldType="outlined"
              label="Usuário"
              name="username"
              onChange={handleChange}
              value={form.username}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.password}>
            <Input
              className={styles.input}
              fieldType="password"
              label="Senha"
              name="password"
              onChange={handleChange}
              value={form.password}
            />
          </div>
        </div>
        <div className={styles.linkContainer}>
          <Link
            href="/saturno/register/"
            underline="hover"
            className={styles.link}
          >
            Registre-se
          </Link>
          <Link
            href="/saturno/password-reset/"
            underline="hover"
            className={styles.link}
          >
            Esqueceu a senha?
          </Link>
        </div>
        <div className={styles.lineContainer}>
          <hr className={styles.line} />
          <div className={styles.text}>ou</div>
          <hr className={styles.line} />
        </div>

        <Button className={styles.google} onClick={handleGoogleLogin}>
          <img alt="Ícone do Google" src={icon} className={styles.icon} />
          <p className={styles.login}>Continuar com google</p>
        </Button>

        <div className={styles.formButton}>
          <Button className={styles.button} onClick={handleSubmit}>
            {loading ? (
              <div style={{ position: "relative", top: "-3rem" }}>
                <Loading size="1.5rem" type="spin" />
              </div>
            ) : (
              "Entrar"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
