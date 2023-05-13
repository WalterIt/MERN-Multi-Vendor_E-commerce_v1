import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate;

  if (loading === false) {
    if (!isAuthenticated) {
      return navigate("/login");
    } else if (user.role !== "Admin") {
      return navigate("/");
    }
    return children;
  }
};

export default ProtectedAdminRoute;
