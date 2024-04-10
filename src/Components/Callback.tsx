import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Styles/Callback.module.css";

const Callback: React.FC = () => {
  const { googleToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (googleToken) {
      sessionStorage.setItem("googleToken", googleToken);
    }

    navigate("/sies/register");
  }, [googleToken, navigate]);

  return (
    <div className={styles.container}>
      <h1>Callback Page</h1>
      {googleToken && <p>apiToken: {googleToken}</p>}
    </div>
  );
};

export default Callback;
