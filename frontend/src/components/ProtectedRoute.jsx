import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (roles && !roles.includes(user.role)) {
    const dest =
      user.role === 'admin'
        ? '/dashboard-admin'
        : user.role === 'teacher'
        ? '/dashboard-teacher'
        : '/dashboard-parent';
    return <Navigate to={dest} replace />;
  }
  return children;
}
