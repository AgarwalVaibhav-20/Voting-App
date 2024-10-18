import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthState';


const ProtectedRoute = ({ element, allowedRoles }) => {
    const { loggedUser, isLoggedIn, logout, fetchUser, status } = useAuth();

  const canAccess = (userRole) => {
    if (!loggedUser) return allowedRoles.includes('GUEST');
    return allowedRoles.includes(loggedUser?.userType);
  };

  return canAccess(loggedUser?.userType) ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
