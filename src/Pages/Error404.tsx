import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("saturno/login");
  }, []);
  return null;
};

export default Error404;
