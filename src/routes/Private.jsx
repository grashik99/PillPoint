import { Navigate, useLocation } from "react-router";
import useAuthInfo from "../hooks/useAuthInfo";

const Private = ({ children }) => {
  const { user, loading } = useAuthInfo();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default Private;
