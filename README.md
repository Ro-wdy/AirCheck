# AirCheck

An AI crew that watches your broadcast, catches trouble, and fixes it live.

AirCheck is a multi-agent broadcast stream health monitoring system built
for the Google Cloud "Summer Blockbuster" hackathon (Grafana partner
track). It watches live stream metrics, diagnoses what's actually wrong
when something degrades, takes real corrective action, and reports back
in plain English — all powered by Gemini Enterprise Agent Platform on
Google Cloud.

## Live URLs

- **Backend API**: https://aircheck-backend-kl2bjzwvkq-uc.a.run.app
- **Frontend dashboard**: <add once deployed>

## Architecture

- **backend/** — Node.js/Express service exposing synthetic broadcast
  metrics (bitrate, buffer ratio, CDN latency by region, error rate,
  concurrent viewers) in both Prometheus format (`/metrics`) and a
  clean JSON format (`/metrics.json`). Includes `/simulate-incident` to
  trigger realistic failure scenarios for demo purposes. Deployed on
  Cloud Run, metrics pushed to Grafana Cloud via remote_write.
- **frontend/** — React + Vite + Tailwind dashboard visualizing live
  metric health with a real-time agent activity feed.
- **agents/** — Gemini Enterprise Agent Platform integration: Monitor,
  Diagnose, Remediate, and Report playbooks, connected to Grafana via a
  custom tool that queries metrics through Grafana's API at runtime.

## Tech stack

Google Cloud Run, Cloud Build, Secret Manager, Gemini Enterprise Agent
Platform (Agent Builder), Grafana Cloud, Node.js, React, Vite, Tailwind.

## Running locally

### Backend
```bash
cd backend
npm install
npm start
```
Listens on port 8080. Requires environment variables:
`GRAFANA_REMOTE_WRITE_URL`, `GRAFANA_INSTANCE_ID`, `GRAFANA_WRITE_TOKEN`.

### Frontend
```bash
cd frontend
npm install
echo "VITE_BACKEND_URL=http://localhost:8080" > .env
npm run dev
```

### Testing the incident simulation
```bash
curl -X POST https://aircheck-backend-kl2bjzwvkq-uc.a.run.app/simulate-incident \
  -H "Content-Type: application/json" \
  -d '{"type": "cdn_failure", "region": "eu", "duration_seconds": 45}'
```

## Deploying

```bash
# Set up secrets first (see deploy/setup-secrets.sh for the pattern)
cd backend && bash deploy/deploy-backend.sh
cd ../frontend && bash deploy/deploy-frontend.sh
```

## License

MIT — see [LICENSE](./LICENSE).
