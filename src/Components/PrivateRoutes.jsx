import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const PrivateRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
