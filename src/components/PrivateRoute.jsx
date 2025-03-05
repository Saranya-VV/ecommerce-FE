import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("accessToken"); 
  };
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    element: PropTypes.node.isRequired,
};

export default PrivateRoute;
