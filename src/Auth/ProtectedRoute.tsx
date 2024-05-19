import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import { PATH } from "../PATH";
import { fetchRoles } from "../Services/Slices/roles";

export const ProtectedRoute: React.FC<{
  Component: React.FC<any>;
  path: any;
  colorInverted?: boolean;
  accessRole?: string[];
}> = ({ Component, accessRole, ...rest }) => {
  const dispatch = useDispatch<any>();
  const { roles, loading, error } = useSelector((state: any) => state.rolesSlice);
  const [rolesLoaded, setRolesLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(fetchRoles()).then(() => {
        setRolesLoaded(true);
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const userId = parseInt(sessionStorage.getItem("userId") || "0", 10);
    const storedToken = sessionStorage.getItem("apiToken") ?? "";
    const websocket = new WebSocket(
      `${PATH.websocketBase}/user_session/${userId}/?token=${storedToken}`
    );

    function handleWebSocketMessage(event: MessageEvent) {
      const message = JSON.parse(event.data);

      if (message.access_token && storedToken !== message.access_token) {
        logout(navigate);
      }
    }

    websocket.onmessage = handleWebSocketMessage;

    return () => {
      websocket.close();
    };
  }, [navigate]);

  if (loading) {
    return <div> </div>;
  }

  if (isLoggedIn() && !accessRole) {
    return <Component {...rest} />;
  }
  console.log(roles)

  if (
    isLoggedIn() &&
    accessRole &&
    rolesLoaded &&
    accessRole.some((role) => roles.includes(role))
  ) {
    return <Component {...rest} />;
  }

  if (isLoggedIn() && rolesLoaded) {
    return <Navigate to="/saturno/login/" />;
  }

  return <div> </div>;
};

export default ProtectedRoute;
