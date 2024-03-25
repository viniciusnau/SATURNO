import React from "react";
import { useCountdown } from "../Auth/ProtectedRoute";
import styles from "../Styles/Clock.module.css";

const Clock: React.FC = () => {
  const logoutTimer = useCountdown();

  const formatTime = (time: number | null): string => {
    if (time === null) return "";

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.clockContainer}>
      <p className={styles.logoutTimer}>
        Sessão expira em: {formatTime(logoutTimer)}
      </p>
    </div>
  );
};

export default Clock;
