import { useState } from "react";
import styles from "../Styles/Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Components/Input";
import { Input as MUIInput } from "@mui/material";
import { Button, MenuItem, Select } from "@mui/material";
import { publicDefenses, seniorities } from "../Components/Helper";

interface iForm {
  name: string;
  registration: string;
  birth_date: string;
  start_date: string;
  public_defense: string;
  seniority: string;
  profile_picture: string;
  email: string;
}

export const Register = () => {
  const dispatch = useDispatch<any>();
  const [form, setForm] = useState<iForm>({
    name: "",
    registration: "",
    birth_date: "",
    start_date: "",
    public_defense: publicDefenses[0],
    seniority: seniorities[0],
    profile_picture: "",
    email: "",
  });
  const { data, error, loading } = useSelector(
    (state: any) => state.voteReportSlice
  );

  const handleSubmit = () => {
    // dispatch(fetchRegister(form));
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

  return (
    <div className={styles.container}>
      <h3>Registro de eleitores:</h3>
      <Input
        className={styles.input}
        fieldType="outlined"
        label="Usuário"
        name="username"
        onChange={handleChange}
        value={form.name}
      />
      <Input
        className={styles.input}
        fieldType="outlined"
        label="Número de registro"
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
        label="Data de nascimento"
        name="birth_date"
        onChange={handleChange}
        value={form.birth_date}
      />
      <Input
        className={styles.input}
        fieldType="outlined"
        label="Data de início"
        name="start_date"
        onChange={handleChange}
        value={form.start_date}
      />
      <Select
        value={form.public_defense}
        onChange={handleChange}
        className={styles.input}
        name="public_defense"
      >
        {Object.entries(publicDefenses).map(([label, value]) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={form.seniority}
        onChange={handleChange}
        className={styles.input}
        name="seniority"
      >
        {Object.entries(seniorities).map(([label, value]) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <MUIInput
        // className={styles.input}
        // fieldType="outlined"
        // label="Foto de perfil xesque"
        name="profile_picture"
        onChange={handleChange}
        value={form.profile_picture}
        type="file"
      />

      <Button className={styles.button} onClick={handleSubmit}>
        Registrar
      </Button>
    </div>
  );
};
