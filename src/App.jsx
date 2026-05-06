import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Incidents from './components/Incidents';
import Analytics from './components/Analytics';

export default function App() {
  const { user } = useAuth();
  const [tab, setTab] = useState('Dashboard');

  if (!user) return <Login />;

  const content = {
    Dashboard: <Dashboard />,
    Incidents: <Incidents />,
    Analytics: <Analytics />,
  }[tab];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar tab={tab} setTab={setTab} />
      <main key={tab} style={{ animation: 'fadeIn .25s ease forwards' }}>
        {content}
      </main>
    </div>
  );
}
