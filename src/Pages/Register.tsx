import { useEffect, useState } from "react";
import styles from "../Styles/Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Components/Input";
import { Button } from "@mui/material";
import { IRegister } from "../Types/Types";
import { fetchRegister } from "../Services/Slices/postRegisterSlice";
import Snackbar from "../Components/Snackbar";

export const Register = () => {
  const dispatch = useDispatch<any>();
  const [form, setForm] = useState<IRegister>({
    name: "",
    registration: "",
    email: "",
    password: "",
  });
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const { data, error, loading } = useSelector(
    (state: any) => state.voteReportSlice
  );

  const handleSubmit = () => {
    const formatted = { ...form, is_public_defender: true };
    dispatch(fetchRegister(formatted));
    setIsDispatched(true);
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

  useEffect(() => {
    setIsDispatched(false);
  }, []);

  return (
    <div className={styles.container}>
      {data?.message?.length && isDispatched && (
        <Snackbar type="registerSuccess" setShowSnackbar={setIsDispatched} />
      )}
      {error && isDispatched && (
        <Snackbar type="registerError" setShowSnackbar={setIsDispatched} />
      )}
      <h2 className={styles.title} style={{ color: "initial" }}>
        Registro de eleitores
      </h2>
      <Input
        className={styles.input}
        fieldType="outlined"
        label="Usuário"
        name="name"
        onChange={handleChange}
        value={form.name}
      />
      <Input
        className={styles.input}
        fieldType="outlined"
        label="Matricula"
        name="registration"
        onChange={handleChange}
        value={form.registration}
      />
      <Input
        className={styles.input}
        fieldType="outlined"
        label="Email"
        name="email"
        onChange={handleChange}
        value={form.email}
      />
      <Input
        className={styles.input}
        fieldType="outlined"
        label="Senha"
        name="password"
        onChange={handleChange}
        value={form.password}
      />

      <Button className={styles.button} onClick={handleSubmit}>
        Solicitar validação
      </Button>
    </div>
  );
};
