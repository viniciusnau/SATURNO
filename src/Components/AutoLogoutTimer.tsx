import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, logout } from "../Auth/Auth";
import { fetchTokenTimeInfo } from "../Services/Slices/authState";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/AutoLogoutTimer.module.css";

const AutoLogoutTimer = () => {
  const dispatch = useDispatch<any>();
  const [timeLeft, setTimeLeft] = useState("0:00:00");
  const navigate = useNavigate();
  const tokenExpiresAt = useSelector((state: any) => state.authSlice.expiresAt);

  useEffect(() => {
    if (!isLoggedIn() || !tokenExpiresAt) return;

    const interval = setInterval(() => {
      const currentTime = new Date();
      const expiresAtTime = new Date(tokenExpiresAt);
      const difference = expiresAtTime.getTime() - currentTime.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        dispatch(() => logout(navigate));
        setTimeLeft("0:00:00");
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tokenExpiresAt]);

  useEffect(() => {
    if (!tokenExpiresAt) {
      dispatch(fetchTokenTimeInfo());
    }
  }, [tokenExpiresAt]);

  return <div className={styles.text}>Tempo restante: {timeLeft}</div>;
};

export default AutoLogoutTimer;
