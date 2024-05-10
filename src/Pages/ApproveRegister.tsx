import { useState } from "react";
import styles from "../Styles/ApproveRegister.module.css";
import { useDispatch, useSelector } from "react-redux";

const ApproveRegister = () => {
  const dispatch = useDispatch<any>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const { data, error, loading } = useSelector(
    (state: any) => state.checkHashSlice
  );

  return <div className={styles.container}></div>;
};

export default ApproveRegister;
