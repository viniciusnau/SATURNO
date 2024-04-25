import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoogleTokenLogin } from "../Services/Slices/getGoogleLogin";
import styles from "../Styles/Callback.module.css";

const Callback: React.FC = () => {
  const { googleToken } = useParams();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const apiToken = useSelector((state: any) => state.googleTokenLoginSlice);

  useEffect(() => {
    if (googleToken) {
      dispatch(fetchGoogleTokenLogin({ google_token: googleToken }));
    }
  }, [dispatch, googleToken]);

  useEffect(() => {
    if (apiToken) {
      navigate("/saturno/vote");
    }
  }, [apiToken, navigate]);

  return (
    <div className={styles.container}>
      <h1>Callback Page</h1>
      {googleToken && <p>apiToken: {googleToken}</p>}
    </div>
  );
};

export default Callback;
