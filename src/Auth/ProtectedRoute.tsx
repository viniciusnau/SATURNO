import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, logout } from "./Auth";
import { useDispatch } from "react-redux";

export const ProtectedRoute: React.FC<{
  Component: React.FC<any>;
  path: any;
  colorInverted?: boolean;
}> = ({ Component, ...rest }) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const userId = parseInt(sessionStorage.getItem("userId") || "0", 10);
    const storedToken = sessionStorage.getItem("apiToken") ?? "";

    const websocket = new WebSocket(
      `ws://saturno.defensoria.sc.def.br:8000/ws/user_session/${userId}/?token=${storedToken}`
    );
    function handleWebSocketMessage(event: MessageEvent) {
      const message = JSON.parse(event.data);

      if (message.access_token && storedToken !== message.access_token) {
        logout(() => {
          window.location.href = "/saturno/login/";
        });
      }
    }

    websocket.onmessage = handleWebSocketMessage;

    return () => {
      websocket.close();
    };
  }, [dispatch]);

  return isLoggedIn() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/saturno/login/" />
  );
};

export default ProtectedRoute;
