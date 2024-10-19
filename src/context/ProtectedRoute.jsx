import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthState';
import { useNavigate } from 'react-router-dom';
import VerifyUser from '../Component/VerifyUser';


const ProtectedRoute = ({ element, allowedRoles }) => {
  const navigate = useNavigate();
    const { loggedUser, isLoggedIn, logout, fetchUser, status } = useAuth();

    const isUserVerified = () => {
      if(!loggedUser) return true;
      return loggedUser?.isVerified; 
    };
  

    if (!isUserVerified()) {
      if (window.location.pathname !== '/verify') {
        return <Navigate to="/verify" />;
      }
    }

  const canAccess = (userRole) => {
    if (!loggedUser) return allowedRoles.includes('GUEST');
    return allowedRoles.includes(loggedUser?.userType);
  };

  return canAccess(loggedUser?.userType) ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
