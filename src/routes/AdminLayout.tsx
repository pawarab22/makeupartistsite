import { Outlet, useNavigate, Link } from 'react-router-dom';
import { logoutAdmin } from '../lib/auth';
import Logo from '../components/layout/Logo';
import Button from '../components/ui/Button';

export default function AdminLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
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
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

