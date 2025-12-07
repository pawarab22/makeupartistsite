import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { loginAdmin } from '../lib/auth';
import Logo from '../components/layout/Logo';
import { ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (loginAdmin(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-blush to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Home/Back Button */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-deep-plum hover:text-rose-accent transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <Logo size="lg" />
          <h2 className="text-2xl sm:text-3xl font-bold text-deep-plum mt-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Admin Login</h2>
        </div>
        
        <Card>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" size="lg" className="w-full">
              Login
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

