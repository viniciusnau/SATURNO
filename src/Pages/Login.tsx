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

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector(
    (state: any) => state.loginSlice
  );
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

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
    dispatch(fetchLogin(form));
    setIsDispatched(true);
    setForm({
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    if (Object.keys(data).length !== 0 && isDispatched) {
      navigate("/saturno/vote/");
    }
  }, [data, isDispatched, navigate]);

  useEffect(() => {
    setIsDispatched(false);
  }, []);

  return (
    <div className={styles.container}>
      {error && isDispatched && (
        <Snackbar type="errorLogin" setShowSnackbar={setIsDispatched} />
      )}
      <div
        className={styles.loginForm}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        <h2 className={styles.title} style={{ color: "initial" }}>
          Bem vindo(a)
        </h2>
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
