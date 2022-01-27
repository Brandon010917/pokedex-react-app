//Redux
import { useSelector } from "react-redux";

//React-router-dom
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  //Redux-hooks
  const userName = useSelector((state) => state.userName);

  if (userName) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
