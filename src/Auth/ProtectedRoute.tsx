import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "./Auth";
import axios from "axios";
import { PATH } from "../PATH";
import { useDispatch, useSelector } from "react-redux";

export const ProtectedRoute: React.FC<{
  Component: React.FC<any>;
  path: any;
  colorInverted?: boolean;
  accessRole?: string[];
}> = ({ Component, accessRole, ...rest }) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const apiToken = sessionStorage.getItem("apiToken");
        if (!apiToken) {
          setLoading(false);
          return;
        }
        const headers = {
          Authorization: `Bearer ${apiToken}`,
        };

        const response = await axios.get(`${PATH.base}/user/roles-view/`, {
          headers,
        });
        setRoles(response.data.roles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    };

    if (isLoggedIn()) {
      fetchRoles();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleWebSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (
        message.access_token &&
        message.access_token !== sessionStorage.getItem("apiToken")
      ) {
        logout(navigate);
      }
    };

    const userId = parseInt(sessionStorage.getItem("userId") || "0", 10);
    const storedToken = sessionStorage.getItem("apiToken") || "";
    const websocket = new WebSocket(
      `${PATH.websocketBase}/user_session/${userId}/?token=${storedToken}`
    );

    websocket.onmessage = handleWebSocketMessage;

    return () => {
      websocket.close();
    };
  }, [navigate]);

  if (loading) {
    return <div></div>;
  }

  if (!isLoggedIn()) {
    return <Navigate to="/saturno/login/" />;
  }

  if (accessRole && roles.length > 0) {
    const userHasAccess = accessRole.some((role) => roles.includes(role));

    if (!userHasAccess) {
      return <Navigate to="/saturno/confirm-hash/" />;
    }
  }

  const MemoizedComponent = React.memo(Component);
  return <MemoizedComponent {...rest} />;
};

export default ProtectedRoute;
