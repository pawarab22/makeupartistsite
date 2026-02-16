import { Outlet, useNavigate, Link } from 'react-router-dom';
import { logoutAdmin } from '../lib/auth';
import Logo from '../components/layout/Logo';
import Button from '../components/ui/Button';
import { LogOut, ExternalLink } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const handleReturnToSite = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-soft-blush">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin/dashboard">
              <div className="flex items-center gap-3">
                <Logo size="sm" />
                <span className="text-sm text-gray-600">– Admin</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 hover:text-rose-accent flex items-center gap-2 border-gray-200"
                onClick={handleReturnToSite}
              >
                <ExternalLink size={16} />
                <span className="hidden sm:inline">View Website</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 hover:text-red-500 flex items-center gap-2 border-gray-200"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

