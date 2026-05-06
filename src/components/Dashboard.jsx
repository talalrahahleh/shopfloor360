import { useState, useEffect } from 'react';
import { MACHINES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const STATUS_COLOR = { Running: 'var(--running)', Fault: 'var(--fault)', Idle: 'var(--idle)' };

function KpiCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: '18px 20px',
      flex: '1 1 160px',
      animation: 'fadeIn .4s ease forwards',
    }}>
      <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
        {label}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 500, color: accent || 'var(--text)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>{sub}</div>}
    </div>
  );
}

function MachineCard({ m }) {
  const pct = m.target > 0 ? Math.min((m.output / m.target) * 100, 100) : 0;
  const color = STATUS_COLOR[m.status];

  return (
    <div style={{
      background: 'var(--card)',
      border: `1px solid var(--border)`,
      borderRadius: '10px',
      padding: '18px',
      transition: 'background .15s, border-color .15s',
      animation: 'fadeIn .35s ease forwards',
      borderTop: `2px solid ${color}`,
    }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--card-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{m.name}</div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{m.id} · Line {m.line}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
            {m.status === 'Running' && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: color, animation: 'pulse-ring 1.8s ease-out infinite',
              }} />
            )}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }} />
          </div>
          <span style={{ fontSize: '11px', color, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
            {m.status}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Output</span>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>
            {m.output} <span style={{ color: 'var(--muted)' }}>/ {m.target}</span>
          </span>
        </div>
        <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: m.status === 'Fault' ? 'var(--fault)' : m.status === 'Idle' ? 'var(--idle)' : 'var(--running)',
            borderRadius: '2px',
            transition: 'width .6s ease',
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px' }}>Uptime</div>
          <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: m.uptime > 90 ? 'var(--running)' : m.uptime > 75 ? 'var(--idle)' : 'var(--fault)' }}>
            {m.uptime}%
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px' }}>Efficiency</div>
          <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>
            {m.efficiency}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [tick, setTick] = useState(0);

  const machines = user.role === 'Operator'
    ? MACHINES.filter(m => m.line === user.line)
    : MACHINES;

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const running  = machines.filter(m => m.status === 'Running').length;
  const faults   = machines.filter(m => m.status === 'Fault').length;
  const avgUptime = (machines.reduce((a, m) => a + m.uptime, 0) / machines.length).toFixed(1);
  const totalOut  = machines.reduce((a, m) => a + m.output, 0);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
          Production Overview
          {user.role === 'Operator' && <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 400, marginLeft: '10px' }}>Line {user.line}</span>}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Live · refreshes every 5s · {new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <KpiCard label="Machines Total"   value={machines.length}  sub={`${running} running`} />
        <KpiCard label="Running"          value={running}          sub="currently active"   accent="var(--running)" />
        <KpiCard label="Active Faults"    value={faults}           sub={faults > 0 ? 'requires attention' : 'all clear'} accent={faults > 0 ? 'var(--fault)' : 'var(--running)'} />
        <KpiCard label="Avg Uptime"       value={`${avgUptime}%`}  sub="this shift"         accent="var(--accent)" />
        <KpiCard label="Total Output"     value={totalOut.toLocaleString()} sub="units this shift" />
      </div>

      <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.08em' }}>
        Machine Status — {machines.length} stations
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
        {machines.map(m => <MachineCard key={m.id} m={m} />)}
      </div>

      {user.role === 'Operator' && (
        <div style={{
          marginTop: '20px', padding: '12px 16px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '8px', fontSize: '12px', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)',
        }}>
          role:operator · scope:line-{user.line} · full plant view requires Manager role
        </div>
      )}
    </div>
  );
}
