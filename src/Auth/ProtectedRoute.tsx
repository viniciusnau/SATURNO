import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "./Auth";
import Clock from "../Components/Clock";

const CountdownContext = createContext<number | null>(null);

export const ProtectedRoute: React.FC<{
  Component: React.FC<any>;
  path: any;
  colorInverted?: boolean;
}> = ({ Component, ...rest }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutTimer, setLogoutTimer] = useState<number>(() => {
    const storedValue = localStorage.getItem("logoutTimer");
    const parsedValue = storedValue ? parseInt(storedValue) : 600;

    return parsedValue > 0 ? parsedValue : 600;
  });

  useEffect(() => {
    const intervalCallback = () => {
      setLogoutTimer((prevTimer) => {
        return prevTimer !== null ? Math.max(prevTimer - 1, 0) : 0;
      });
    };

    if (isLoggedIn()) {
      intervalCallback();
      const intervalId = setInterval(intervalCallback, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    if (logoutTimer === 0) {
      logout(navigate);
    }
  }, [logoutTimer, navigate]);

  useEffect(() => {
    localStorage.setItem("logoutTimer", logoutTimer.toString());
  }, [logoutTimer]);

  return (
    <CountdownContext.Provider value={logoutTimer}>
      <div>
        <Clock />
      </div>
      {isLoggedIn() ? (
        <Component {...rest} />
      ) : (
        <Navigate to="/saturno/login/" />
      )}
    </CountdownContext.Provider>
  );
};

export const useCountdown = () => useContext(CountdownContext);
