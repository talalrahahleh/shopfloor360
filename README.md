# ShopFloor360 — Manufacturing Line Monitor

> Full-stack manufacturing operations dashboard simulating real-time shop floor monitoring for industrial production environments.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite)
![Recharts](https://img.shields.io/badge/Recharts-2-8884d8?style=flat)

---

## Features

- **Live Machine Grid** — 8 production stations with real-time status (Running / Idle / Fault), output vs. target progress bars, uptime %, and efficiency tracking
- **Incident Logger** — Log, filter, and track production faults with severity classification (Critical / High / Medium / Low) and status lifecycle (Open → In Progress → Resolved)
- **OEE Analytics** — Overall Equipment Effectiveness charts: 8-week rolling trend (Availability × Performance × Quality) + per-machine OEE comparison
- **JWT Authentication** — Simulated JWT tokens with role-based access control; Operators see only their assigned line, Managers see the full plant
- **Role-gated UI** — Operator and Manager roles with different data scopes, enforced at the component level

## Demo Credentials

| Username | Password   | Role     | Scope         |
|----------|------------|----------|---------------|
| operator | bosch2024  | Operator | Line A only   |
| manager  | bosch2024  | Manager  | Full plant    |

## Tech Stack

`React 18` · `Vite 5` · `Recharts` · `JWT (simulated)` · `GitHub Pages`

---

## Local Development

```bash
git clone https://github.com/talalrahahleh/shopfloor360.git
cd shopfloor360
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Push any commit to `main` — the workflow builds and deploys automatically
4. Live at: `https://talalrahahleh.github.io/shopfloor360/`

---

## Project Structure

```
src/
├── components/
│   ├── Login.jsx       # Auth form with JWT token creation
│   ├── Navbar.jsx      # Top nav with role badge and tab routing
│   ├── Dashboard.jsx   # KPI cards + machine status grid
│   ├── Incidents.jsx   # Incident table + log form
│   └── Analytics.jsx   # OEE charts with Recharts
├── context/
│   └── AuthContext.jsx # Auth state, JWT generation, role management
├── data/
│   └── mockData.js     # Machines, incidents, OEE datasets
├── App.jsx             # Root component with auth gate + tab routing
└── main.jsx            # React 18 entry point
```

## Architecture Notes

**JWT simulation:** The app creates properly structured JWTs (header.payload.signature in base64url) and stores them in localStorage. The token payload contains `sub`, `role`, `iat`, and `exp` claims — identical to a real JWT. In production, the signature would be HMAC-SHA256 verified server-side.

**Role-based access:** The Operator role filters machine and incident data to `line: 'A'` at the component level via `useAuth()`. In a real deployment this filtering would be enforced by the API.

**OEE formula:** OEE = Availability × Performance × Quality (all as decimals). World-class manufacturing targets ≥ 85% OEE.
