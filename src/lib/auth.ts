const ADMIN_AUTH_KEY = 'pooja_aura_admin_auth';
const ADMIN_EMAIL = 'admin@poojasaura.com';
const ADMIN_PASSWORD = 'AuraGlow123!';

export function loginAdmin(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_AUTH_KEY);
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

