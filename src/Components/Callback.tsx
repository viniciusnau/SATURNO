import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Styles/Callback.module.css";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [apiToken, setApiToken] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const googleToken = queryParams.get("google_token");
    const token = queryParams.get("jwt_token");
    const userId = queryParams.get("user_id");

    if (googleToken) {
      sessionStorage.setItem("googleToken", googleToken);
    }

    if (token) {
      sessionStorage.setItem("apiToken", token);
      setApiToken(token);
    }
    if (userId) {
      sessionStorage.setItem("userId", userId);
    }
  }, [location.search]);

  useEffect(() => {
    if (apiToken !== null) {
      navigate("/saturno/vote/");
    }
  }, [apiToken, navigate]);

  return (
    <div className={styles.container}>
      <h1>Callback Page</h1>
    </div>
  );
};

export default Callback;
