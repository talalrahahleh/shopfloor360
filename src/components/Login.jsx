import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const S = {
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg)',
    padding: '24px',
  },
  box: {
    width: '100%',
    maxWidth: '400px',
    animation: 'fadeIn .4s ease forwards',
  },
  brand: {
    marginBottom: '40px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    background: 'var(--accent)',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 600,
    color: '#07090f',
    fontFamily: 'var(--font-mono)',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--text)',
    letterSpacing: '-.3px',
  },
  subtitle: {
    fontSize: '13px',
    color: 'var(--muted)',
    fontFamily: 'var(--font-mono)',
  },
  card: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '28px',
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--muted)',
    marginBottom: '6px',
    letterSpacing: '.05em',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-mono)',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    color: 'var(--text)',
    fontSize: '14px',
    marginBottom: '18px',
    outline: 'none',
    transition: 'border-color .15s',
  },
  btn: {
    width: '100%',
    padding: '11px',
    background: 'var(--accent)',
    color: '#07090f',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '.02em',
    transition: 'opacity .15s, transform .1s',
  },
  error: {
    color: 'var(--fault)',
    fontSize: '12px',
    marginBottom: '14px',
    fontFamily: 'var(--font-mono)',
  },
  hint: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '12px',
    color: 'var(--muted)',
    fontFamily: 'var(--font-mono)',
    lineHeight: '1.8',
  },
  hintTitle: {
    color: 'var(--dim)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '.08em',
    fontSize: '11px',
  },
};

export default function Login() {
  const { login } = useAuth();
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(creds.username.trim(), creds.password);
    if (!ok) setError('Invalid credentials.');
  }

  return (
    <div style={S.wrap}>
      <div style={S.box}>
        <div style={S.brand}>
          <div style={S.logo}>
            <div style={S.logoIcon}>S3</div>
            <span style={S.logoText}>ShopFloor360</span>
          </div>
          <div style={S.subtitle}>Manufacturing Line Intelligence Platform</div>
        </div>

        <form style={S.card} onSubmit={handleSubmit}>
          <label style={S.label}>Username</label>
          <input
            style={S.input}
            type="text"
            placeholder="operator / manager"
            value={creds.username}
            onChange={e => { setError(''); setCreds(p => ({ ...p, username: e.target.value })); }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            autoComplete="username"
          />
          <label style={S.label}>Password</label>
          <input
            style={S.input}
            type="password"
            placeholder="••••••••"
            value={creds.password}
            onChange={e => { setError(''); setCreds(p => ({ ...p, password: e.target.value })); }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            autoComplete="current-password"
          />
          {error && <div style={S.error}>{error}</div>}
          <button
            style={S.btn}
            type="submit"
            onMouseEnter={e => (e.target.style.opacity = '.85')}
            onMouseLeave={e => (e.target.style.opacity = '1')}
          >
            Sign in
          </button>
        </form>

        <div style={S.hint}>
          <div style={S.hintTitle}>Demo credentials</div>
          operator / Talal2003 → Line A view<br />
          manager &nbsp;/ Talal2003 → Full plant view
        </div>
      </div>
    </div>
  );
}
