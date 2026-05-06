import { useAuth } from '../context/AuthContext';

const TABS = ['Dashboard', 'Incidents', 'Analytics'];

const roleColor = { Manager: '#38bdf8', Operator: '#34d399' };

export default function Navbar({ tab, setTab }) {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      background: 'var(--card)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      height: '52px',
      gap: '32px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <div style={{
          width: '24px', height: '24px', background: 'var(--accent)',
          borderRadius: '4px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '11px', fontWeight: 600,
          color: '#07090f', fontFamily: 'var(--font-mono)',
        }}>S3</div>
        <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-.2px' }}>
          ShopFloor360
        </span>
      </div>

      <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '6px 14px',
              background: tab === t ? 'var(--surface)' : 'transparent',
              border: tab === t ? '1px solid var(--border)' : '1px solid transparent',
              borderRadius: '6px',
              color: tab === t ? 'var(--text)' : 'var(--muted)',
              fontSize: '13px',
              fontWeight: tab === t ? 500 : 400,
              transition: 'all .15s',
            }}
            onMouseEnter={e => { if (tab !== t) e.target.style.color = 'var(--text)'; }}
            onMouseLeave={e => { if (tab !== t) e.target.style.color = 'var(--muted)'; }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <span style={{
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          padding: '3px 8px',
          borderRadius: '20px',
          border: `1px solid ${roleColor[user.role]}30`,
          color: roleColor[user.role],
          background: `${roleColor[user.role]}12`,
        }}>
          {user.role.toUpperCase()}
        </span>
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{user.name}</span>
        <button
          onClick={logout}
          style={{
            padding: '5px 12px',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '5px',
            color: 'var(--muted)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            transition: 'color .15s, border-color .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--fault)'; e.currentTarget.style.borderColor = 'var(--fault)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          logout
        </button>
      </div>
    </nav>
  );
}
