import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { loginAdmin, isAdminLoggedIn, requestPasswordReset, verifyResetOtp, updateAdminPassword } from '../lib/auth';
import Swal from 'sweetalert2';
import Logo from '../components/layout/Logo';
import { ArrowLeft, Eye, EyeOff, KeyRound, Mail, CheckCircle2 } from 'lucide-react';

type ResetStep = 'email' | 'otp' | 'newPassword';

export default function AdminLoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetStep, setResetStep] = useState<ResetStep>('email');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const loggedIn = await isAdminLoggedIn();
      if (loggedIn) {
        navigate('/admin/dashboard');
      }
    };
    checkStatus();

    if (window.location.hash && window.location.hash.includes('access_token')) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      if (params.get('type') === 'recovery') {
        setIsResetMode(true);
        setResetStep('newPassword');
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await loginAdmin(identifier, password);
      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back, Pooja!',
          timer: 2000,
          showConfirmButton: false,
          background: '#FFF5F7',
          color: '#4A0E2E',
          iconColor: '#E11D48'
        });
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials');
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your email/username and password.',
          confirmButtonColor: '#E11D48',
          background: '#FFF5F7',
          color: '#4A0E2E'
        });
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const success = await requestPasswordReset(identifier);
    if (success) {
      setResetStep('otp');
      Swal.fire({
        icon: 'info',
        title: 'OTP Sent',
        text: 'Please check your email for the recovery OTP.',
        confirmButtonColor: '#E11D48'
      });
    } else {
      setError('Failed to send reset email');
    }
    setIsSubmitting(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const success = await verifyResetOtp(identifier, otp);
    if (success) {
      setResetStep('newPassword');
    } else {
      setError('Invalid OTP. Please try again.');
    }
    setIsSubmitting(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const success = await updateAdminPassword(newPassword);
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        text: 'Your password has been reset successfully.',
        confirmButtonColor: '#E11D48'
      });
      setIsResetMode(false);
      setResetStep('email');
      setIdentifier('');
      setNewPassword('');
    } else {
      setError('Failed to update password');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-blush to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-rose-accent hover:text-rose-600 font-medium group transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <Logo size="lg" />
          <h2 className="text-2xl sm:text-3xl font-bold text-deep-plum mt-4 drop-shadow-sm">
            {isResetMode ? 'Reset Password' : 'Admin Login'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isResetMode
              ? 'Follow the steps to recover your account'
              : 'Secure access to your dashboard'}
          </p>
        </div>

        <Card className="shadow-xl border-rose-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-red-800 text-sm flex items-center gap-2">
                <span className="w-1 h-1 bg-red-500 rounded-full" />
                {error}
              </p>
            </div>
          )}

          {!isResetMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email or Username"
                type="text"
                placeholder="Enter your email or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <div className="space-y-1">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  rightContent={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 hover:bg-rose-50 rounded-full transition-colors text-gray-400 hover:text-rose-accent"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                />
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(true);
                      setError('');
                    }}
                    className="text-sm text-rose-accent hover:text-rose-700 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between mb-8">
                {[
                  { step: 'email', icon: Mail, label: 'Email' },
                  { step: 'otp', icon: KeyRound, label: 'OTP' },
                  { step: 'newPassword', icon: CheckCircle2, label: 'Reset' }
                ].map((s, idx) => (
                  <div key={s.step} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${resetStep === s.step
                      ? 'bg-rose-accent text-white shadow-md'
                      : idx < ['email', 'otp', 'newPassword'].indexOf(resetStep)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                      }`}>
                      <s.icon size={16} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">{s.label}</span>
                  </div>
                ))}
              </div>

              {resetStep === 'email' && (
                <form onSubmit={handleResetRequest} className="space-y-4">
                  <Input
                    label="Admin Email"
                    type="email"
                    placeholder="Enter registered email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send OTP'}
                  </Button>
                </form>
              )}

              {resetStep === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <Input
                    label="Enter OTP"
                    type="text"
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setResetStep('email')}
                    className="w-full text-sm text-gray-500 hover:text-rose-accent transition-colors"
                  >
                    Resend email?
                  </button>
                  <p className="text-center text-[11px] text-gray-400 mt-2">
                    Tip: You can also just click the <strong>Reset Password</strong> button in your email to skip this step.
                  </p>
                </form>
              )}

              {resetStep === 'newPassword' && (
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Set New Password'}
                  </Button>
                </form>
              )}

              <div className="pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(false);
                    setResetStep('email');
                    setError('');
                  }}
                  className="w-full text-sm text-gray-500 hover:text-rose-accent font-medium py-2 transition-colors"
                >
                  Return to Login
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

