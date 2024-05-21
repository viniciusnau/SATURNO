import { useEffect, useState } from "react";
import styles from "../Styles/Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Services/StoreConfig";
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
    registration: "",
    name: "",
    password: "",
  });
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const { data, loading, error, errorCode } = useSelector(
    (state: any) => state.RegisterSlice
  );

  const handleSubmit = () => {
    const formatted = { ...form, is_public_defender: true, email: form.name };
    dispatch(fetchRegister(formatted));
    setIsDispatched(true);
    handleClearFields();
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

  const handleClearFields = () => {
    setForm({
      registration: "",
      name: "",
      password: "",
    });
  };

  useEffect(() => {
    setIsDispatched(false);
  }, []);

  return (
    <div
      className={styles.container}
      onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
    >
      {!loading && !error && data && isDispatched && (
        <Snackbar type="registerSuccess" setShowSnackbar={setIsDispatched} />
      )}
      {error && errorCode !== 409 && isDispatched && (
        <Snackbar type="registerError" setShowSnackbar={setIsDispatched} />
      )}
      {error && errorCode === 409 && isDispatched && (
        <Snackbar type="unauthorizedLogin" setShowSnackbar={setIsDispatched} />
      )}
      {error && errorCode === 406 && isDispatched && (
        <Snackbar type="accountIsActive" setShowSnackbar={setIsDispatched} />
      )}
      <Title>Registrar conta</Title>
      <Input
        className={styles.input}
        fieldType="outlined"
        label="CPF"
        name="registration"
        onChange={handleChange}
        value={form.registration}
        placeholder="000.000.000-00"
      />
      <Input
        className={styles.input}
        fieldType="outlined"
        label="Email"
        name="name"
        onChange={handleChange}
        value={form.name}
        placeholder="exemplo@defensoria.sc.gov.br"
      />
      <Input
        className={styles.password}
        fieldType="password"
        label="Senha"
        name="password"
        onChange={handleChange}
        value={form.password}
        placeholder="********"
      />

      <Button className={styles.button} onClick={handleSubmit}>
        Enviar solicitação
      </Button>
    </div>
  );
};
