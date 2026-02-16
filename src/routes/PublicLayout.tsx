import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { logoutAdmin, isAdminLoggedIn } from '../lib/auth';

export default function PublicLayout() {
  useEffect(() => {
    const enforceLogout = async () => {
      const loggedIn = await isAdminLoggedIn();
      if (loggedIn) {
        await logoutAdmin();
      }
    };
    enforceLogout();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

