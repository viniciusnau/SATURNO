import React, { useEffect, useState } from "react";
import styles from "../Styles/HashValidation.module.css";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { fetchCheckHash } from "../Services/Slices/checkHashSlice";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../Components/Snackbar";
import Loading from "../Components/Loading";
import { handleKeyPress } from "../Components/Helper";

const HashValidation = () => {
  const dispatch = useDispatch<any>();

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [form, setForm] = useState<any>({
    hash: "",
  });
  const { data, error, loading } = useSelector(
    (state: any) => state.checkHashSlice
  );

  const [allValid, setAllValid] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const hashes = form.hash.split("&&");
    let allHashesValid = true;

    for (let hash of hashes) {
      const response = await dispatch(fetchCheckHash(hash.trim()));
      if (response.error) {
        allHashesValid = false;
        break;
      }
    }

    setAllValid(allHashesValid);
    setShowSnackbar(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSnackbar(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [showSnackbar]);

  return (
    <div className={styles.container}>
      {showSnackbar && (
        <Snackbar
          setShowSnackbar={setShowSnackbar}
          type={allValid ? "validationSuccess" : "validationError"}
        />
      )}
      <div
        className={styles.form}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        <h2 className={styles.title} style={{ color: "initial" }}>
          Verificar votos:
        </h2>
        <Input
          type="text"
          className={styles.input}
          fieldType="outlined"
          label="Hash"
          name="hash"
          value={form.hash}
          onChange={handleChange}
        />
        <Button className={styles.button} onClick={handleSubmit}>
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
            "Verificar"
          )}
        </Button>
      </div>
    </div>
  );
};

export default HashValidation;
