import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAdminLoggedIn } from '../lib/auth';

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const status = await isAdminLoggedIn();
      setIsLoggedIn(status);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-blush/20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-accent"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

