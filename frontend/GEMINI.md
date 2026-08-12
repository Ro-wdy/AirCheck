# AirCheck Frontend

Broadcast stream health monitoring dashboard.

## Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React (standard choice for clean UI)
- **Charts:** Recharts (for sparklines)
- **State Management:** React Hooks (simple enough for this scope)

## Project Structure
- `src/components/`: UI components (Header, MetricCard, ActivityFeed, IncidentPanel)
- `src/hooks/`: Custom hooks for data fetching and polling
- `src/utils/`: Helper functions for status calculation and formatting
- `src/App.tsx`: Main dashboard layout and logic
- `GEMINI.md`: Architecture and instructions (this file)

## Integration
- Consumes Backend: `GET /metrics.json`
- Commands Backend: `POST /simulate-incident`
- Configurable via `VITE_BACKEND_URL` environment variable.

## Design System
- **Dark Background:** #0B0F14
- **Card Surface:** #151B23
- **Teal Accent:** #4FD1C5
- **Status Healthy:** #3DDC84
- **Status Degraded:** #F5A623
- **Status Critical:** #F55050
