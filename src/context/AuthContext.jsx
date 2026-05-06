import { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext(null);

function createJWT(username, role, name) {
  const header  = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '');
  const payload = btoa(JSON.stringify({
    sub: username,
    name,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 28800,
  })).replace(/=/g, '');
  const sig = btoa('shopfloor360-hmac-sha256-signature').replace(/=/g, '');
  return `${header}.${payload}.${sig}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('sf360_token');
    if (stored) {
      try {
        const payload = JSON.parse(atob(stored.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setUser({ username: payload.sub, role: payload.role, name: payload.name, token: stored });
        } else {
          localStorage.removeItem('sf360_token');
        }
      } catch {
        localStorage.removeItem('sf360_token');
      }
    }
  }, []);

  function login(username, password) {
    const record = USERS[username];
    if (!record || record.password !== password) return false;
    const token = createJWT(username, record.role, record.name);
    localStorage.setItem('sf360_token', token);
    setUser({ username, role: record.role, name: record.name, line: record.line, token });
    return true;
  }

  function logout() {
    localStorage.removeItem('sf360_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
