import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Auth/Auth";

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout(navigate);
  }, []);
  return null;
};

export default Error404;
