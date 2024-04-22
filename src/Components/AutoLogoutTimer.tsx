import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, logout } from "../Auth/Auth";
import { fetchTokenTimeLeft } from "../Services/Slices/authState";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/AutoLogoutTimer.module.css";

const AutoLogoutTimer = () => {
  const dispatch = useDispatch<any>();
  const [timeLeft, setTimeLeft] = useState("0:00:00");
  const navigate = useNavigate();
  const tokenTimeLeft = useSelector(
    (state: any) => state.authSlice.tokenTimeLeft
  );

  useEffect(() => {
    if (!isLoggedIn()) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const [hours, minutes, seconds] = prevTime.split(":").map(Number);
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
              dispatch(() => logout(navigate));
              return "0:00:00";
            }
            return `${hours - 1}:59:59`;
          }
          return `${hours}:${minutes - 1}:59`;
        }
        return `${hours}:${minutes}:${seconds - 1}`;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tokenTimeLeft !== null) {
      setTimeLeft(tokenTimeLeft);
    } else {
      dispatch(fetchTokenTimeLeft());
    }
  }, [tokenTimeLeft]);

  return <div className={styles.text}>Tempo restante: {timeLeft}</div>;
};

export default AutoLogoutTimer;
