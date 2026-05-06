import { useState } from 'react';
import { INCIDENTS, MACHINES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const SEV_COLOR  = { Critical: 'var(--fault)', High: '#fb923c', Medium: 'var(--idle)', Low: 'var(--muted)' };
const STAT_COLOR = { Open: 'var(--fault)', 'In Progress': 'var(--idle)', Resolved: 'var(--running)' };

const BADGE = (label, color) => ({
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '11px',
  fontFamily: 'var(--font-mono)',
  fontWeight: 500,
  color,
  background: `${color}18`,
  border: `1px solid ${color}30`,
});

export default function Incidents() {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState(INCIDENTS);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({
    machine: '', severity: 'Medium', category: 'Mechanical', description: '',
  });

  const availableMachines = user.role === 'Operator'
    ? MACHINES.filter(m => m.line === user.line)
    : MACHINES;

  const visibleIncidents = user.role === 'Operator'
    ? incidents.filter(i => availableMachines.some(m => m.id === i.machine))
    : incidents;

  const filtered = filter === 'All' ? visibleIncidents : visibleIncidents.filter(i => i.status === filter);

  function submitIncident(e) {
    e.preventDefault();
    const machine = MACHINES.find(m => m.id === form.machine);
    const newInc = {
      id: `INC-${String(incidents.length + 1).padStart(3, '0')}`,
      machine: form.machine,
      machineName: machine?.name || '—',
      line: machine?.line || '?',
      severity: form.severity,
      category: form.category,
      description: form.description,
      status: 'Open',
      assignee: user.name,
      created: new Date().toISOString(),
    };
    setIncidents(prev => [newInc, ...prev]);
    setForm({ machine: '', severity: 'Medium', category: 'Mechanical', description: '' });
    setShowForm(false);
  }

  const inputStyle = {
    width: '100%', padding: '8px 10px',
    background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: '6px', color: 'var(--text)', fontSize: '13px', outline: 'none',
  };
  const labelStyle = {
    display: 'block', fontSize: '11px', color: 'var(--muted)',
    textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '5px',
    fontFamily: 'var(--font-mono)',
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Incident Log</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            {filtered.length} incidents · {visibleIncidents.filter(i => i.status === 'Open').length} open
          </div>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          style={{
            padding: '8px 16px',
            background: showForm ? 'var(--surface)' : 'var(--accent)',
            color: showForm ? 'var(--text)' : '#07090f',
            border: `1px solid ${showForm ? 'var(--border)' : 'var(--accent)'}`,
            borderRadius: '6px', fontSize: '13px', fontWeight: 600,
            transition: 'all .15s',
          }}
        >
          {showForm ? '× Cancel' : '+ Log Incident'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={submitIncident}
          style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '20px', marginBottom: '20px',
            animation: 'slideDown .2s ease forwards',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
            New Incident Report
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={labelStyle}>Machine</label>
              <select required style={inputStyle} value={form.machine}
                onChange={e => setForm(p => ({ ...p, machine: e.target.value }))}>
                <option value="">Select machine</option>
                {availableMachines.map(m => (
                  <option key={m.id} value={m.id}>{m.id} — {m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Severity</label>
              <select style={inputStyle} value={form.severity}
                onChange={e => setForm(p => ({ ...p, severity: e.target.value }))}>
                {['Critical', 'High', 'Medium', 'Low'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {['Mechanical', 'Electrical', 'Software', 'Sensor', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Description</label>
            <textarea
              required
              style={{ ...inputStyle, minHeight: '72px', resize: 'vertical', lineHeight: 1.5 }}
              placeholder="Describe the fault or issue observed…"
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            />
          </div>
          <button type="submit" style={{
            padding: '8px 20px', background: 'var(--fault)', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600,
          }}>
            Submit Incident
          </button>
        </form>
      )}

      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        {['All', 'Open', 'In Progress', 'Resolved'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 12px',
            background: filter === f ? 'var(--surface)' : 'transparent',
            border: `1px solid ${filter === f ? 'var(--border-mid)' : 'transparent'}`,
            borderRadius: '20px', color: filter === f ? 'var(--text)' : 'var(--muted)',
            fontSize: '12px', fontFamily: 'var(--font-mono)', transition: 'all .15s',
          }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '90px 100px 130px 1fr 110px 120px',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase',
          letterSpacing: '.07em', fontFamily: 'var(--font-mono)',
        }}>
          <span>ID</span><span>Severity</span><span>Machine</span>
          <span>Description</span><span>Status</span><span>Created</span>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
            No incidents found.
          </div>
        )}

        {filtered.map((inc, i) => (
          <div key={inc.id} style={{
            display: 'grid',
            gridTemplateColumns: '90px 100px 130px 1fr 110px 120px',
            padding: '12px 16px',
            borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'center',
            animation: 'fadeIn .3s ease forwards',
            transition: 'background .12s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{inc.id}</span>
            <span><span style={BADGE(inc.severity, SEV_COLOR[inc.severity])}>{inc.severity}</span></span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 500 }}>{inc.machineName}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{inc.machine}</div>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text)', paddingRight: '16px', lineHeight: 1.4 }}>{inc.description}</span>
            <span><span style={BADGE(inc.status, STAT_COLOR[inc.status])}>{inc.status}</span></span>
            <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              {new Date(inc.created).toLocaleDateString('de-DE')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
