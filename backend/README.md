# AirCheck Backend

Synthetic metrics generator for broadcast stream health monitoring.

## Features
- Prometheus-compatible metrics endpoint (`/metrics`).
- JSON metrics endpoint for frontend integration (`/metrics.json`).
- Synthetic incident simulation (`/simulate-incident`).
- Grafana Alloy sidecar configuration for remote writing.

## Local Development

```bash
npm install
npm start
```

### Endpoints
- `GET /metrics`: Prometheus metrics.
- `GET /metrics.json`: Current metrics in JSON format.
- `GET /health`: Liveness check.
- `POST /simulate-incident`: Trigger a failure event.
  ```bash
  curl -X POST http://localhost:8080/simulate-incident \
    -H "Content-Type: application/json" \
    -d '{"type": "cdn_failure", "region": "eu", "duration_seconds": 30}'
  ```

## Deployment
See the `deploy/` directory for scripts to deploy to Google Cloud Run.
