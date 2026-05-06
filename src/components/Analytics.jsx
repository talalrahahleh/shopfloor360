import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import { OEE_WEEKLY, OEE_BY_MACHINE } from '../data/mockData';

const tooltipStyle = {
  contentStyle: {
    background: '#111827', border: '1px solid #1e2d45',
    borderRadius: '8px', fontSize: '12px', fontFamily: 'IBM Plex Mono, monospace',
    color: '#c8d8f0',
  },
  labelStyle: { color: '#4e6a8a', marginBottom: '4px' },
};

const axisStyle = {
  tick: { fill: '#4e6a8a', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace' },
  axisLine: { stroke: '#1e2d45' },
  tickLine: false,
};

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '3px' }}>{children}</div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{sub}</div>}
    </div>
  );
}

function OeeGauge({ value, label }) {
  const color = value >= 85 ? 'var(--running)' : value >= 65 ? 'var(--idle)' : 'var(--fault)';
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px',
      padding: '16px 18px', flex: '1 1 120px', animation: 'fadeIn .4s ease forwards',
    }}>
      <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '26px', fontWeight: 500, fontFamily: 'var(--font-mono)', color }}>{value.toFixed(1)}%</div>
      <div style={{ marginTop: '8px', height: '3px', background: 'var(--border)', borderRadius: '2px' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: '2px', transition: 'width .6s ease' }} />
      </div>
    </div>
  );
}

export default function Analytics() {
  const latest = OEE_WEEKLY[OEE_WEEKLY.length - 1];

  const oeeColors = OEE_BY_MACHINE.map(m =>
    m.oee >= 85 ? '#34d399' : m.oee >= 65 ? '#fbbf24' : '#f87171'
  );

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>OEE Analytics</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Overall Equipment Effectiveness · Availability × Performance × Quality
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <OeeGauge value={latest.oee}          label="OEE Score"    />
        <OeeGauge value={latest.availability} label="Availability" />
        <OeeGauge value={latest.performance}  label="Performance"  />
        <OeeGauge value={latest.quality}      label="Quality"      />
      </div>

      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: '10px', padding: '22px', marginBottom: '20px',
        animation: 'fadeIn .4s ease forwards',
      }}>
        <SectionTitle sub="8-week rolling trend across all production lines">
          OEE Component Trend
        </SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={OEE_WEEKLY} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
            <XAxis dataKey="week" {...axisStyle} />
            <YAxis domain={[60, 100]} {...axisStyle} />
            <Tooltip {...tooltipStyle} formatter={(v) => `${v.toFixed(1)}%`} />
            <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'IBM Plex Mono, monospace', color: '#4e6a8a' }} />
            <Line type="monotone" dataKey="oee"          stroke="#38bdf8" strokeWidth={2} dot={false} name="OEE"          />
            <Line type="monotone" dataKey="availability" stroke="#34d399" strokeWidth={1.5} dot={false} name="Availability" strokeDasharray="4 2" />
            <Line type="monotone" dataKey="performance"  stroke="#fbbf24" strokeWidth={1.5} dot={false} name="Performance"  strokeDasharray="4 2" />
            <Line type="monotone" dataKey="quality"      stroke="#a78bfa" strokeWidth={1.5} dot={false} name="Quality"      strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: '10px', padding: '22px',
        animation: 'fadeIn .5s ease forwards',
      }}>
        <SectionTitle sub="Current OEE score per production station">
          Machine OEE Comparison
        </SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={OEE_BY_MACHINE} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" vertical={false} />
            <XAxis dataKey="name" {...axisStyle} />
            <YAxis domain={[0, 100]} {...axisStyle} />
            <Tooltip
              {...tooltipStyle}
              formatter={(v, name) => [`${v.toFixed(1)}%`, name]}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div style={{ ...tooltipStyle.contentStyle, padding: '10px 14px' }}>
                    <div style={{ color: '#c8d8f0', fontWeight: 500, marginBottom: '6px' }}>{label}</div>
                    <div style={{ color: '#38bdf8' }}>OEE: {d.oee.toFixed(1)}%</div>
                    <div style={{ color: '#34d399', fontSize: '11px', marginTop: '2px' }}>Availability: {d.availability}%</div>
                    <div style={{ color: '#fbbf24', fontSize: '11px' }}>Performance: {d.performance}%</div>
                    <div style={{ color: '#a78bfa', fontSize: '11px' }}>Quality: {d.quality}%</div>
                  </div>
                );
              }}
            />
            <Bar dataKey="oee" radius={[4, 4, 0, 0]} name="OEE">
              {OEE_BY_MACHINE.map((_, i) => <Cell key={i} fill={oeeColors[i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', justifyContent: 'center' }}>
          {[['#34d399', '≥ 85% World-class'], ['#fbbf24', '65–84% Acceptable'], ['#f87171', '< 65% Needs attention']].map(([c, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: c }} />
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
