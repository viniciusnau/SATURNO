import { useEffect, useState } from "react";
import styles from "../Styles/Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { IRegister } from "../Types/Types";
import { fetchRegister } from "../Services/Slices/postRegisterSlice";
import Snackbar from "../Components/Snackbar";
import Title from "../Components/Title";
import { handleKeyPress } from "../Components/Helper";

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
    (state: any) => state.RegisterSlice
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
      <div
        className={styles.containerData}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        {!loading && !error && data && isDispatched && (
          <Snackbar type="registerSuccess" setShowSnackbar={setIsDispatched} />
        )}
        {error && isDispatched && (
          <Snackbar type="registerError" setShowSnackbar={setIsDispatched} />
        )}
        <Title>Registrar conta</Title>
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
          placeholder="9999999-9-99"
        />
        <Input
          className={styles.input}
          fieldType="outlined"
          label="Email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="exemplo@defensoria.sc.gov.br"
        />
        <Input
          className={styles.password}
          fieldType="password"
          label="Senha"
          name="password"
          onChange={handleChange}
          value={form.password}
        />

        <Button className={styles.button} onClick={handleSubmit}>
          Enviar solicitação
        </Button>
      </div>
    </div>
  );
};
