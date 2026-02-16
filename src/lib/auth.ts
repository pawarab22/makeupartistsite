import { supabase } from './supabase';

const ADMIN_AUTH_KEY = 'pooja_aura_admin_auth';

export async function loginAdmin(email: string, password: string): Promise<boolean> {
  try {
    // Support for username login
    let loginIdentifier = email;
    if (email === 'pooja_saura') {
      loginIdentifier = 'info.pooja.saura.artistry@gmail.com';
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginIdentifier,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      return false;
    }

    if (data.user) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Unexpected login error:', error);
    return false;
  }
}

export async function logoutAdmin(): Promise<void> {
  await supabase.auth.signOut();
  localStorage.removeItem(ADMIN_AUTH_KEY);
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  const isLoggedIn = !!session;

  // Sync local storage for existing logic that might use it
  if (isLoggedIn) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }

  return isLoggedIn;
}
export async function requestPasswordReset(email: string): Promise<boolean> {
  try {
    let loginIdentifier = email;
    if (email === 'poojasaura') {
      loginIdentifier = 'info.pooja.saura.artistry@gmail.com';
    }

    const { error } = await supabase.auth.resetPasswordForEmail(loginIdentifier, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    if (error) {
      console.error('Reset request error:', error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Unexpected reset request error:', error);
    return false;
  }
}

export async function verifyResetOtp(email: string, otp: string): Promise<boolean> {
  try {
    let loginIdentifier = email;
    if (email === 'poojasaura') {
      loginIdentifier = 'info.pooja.saura.artistry@gmail.com';
    }

    const { error } = await supabase.auth.verifyOtp({
      email: loginIdentifier,
      token: otp,
      type: 'recovery',
    });
    if (error) {
      console.error('OTP verification error:', error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Unexpected OTP verification error:', error);
    return false;
  }
}

export async function updateAdminPassword(password: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      console.error('Password update error:', error.message);
      return false;
    }
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    return true;
  } catch (error) {
    console.error('Unexpected password update error:', error);
    return false;
  }
}
