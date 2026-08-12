# AirCheck Backend - Gemini Instructions

## Purpose
Synthetic metrics generator for a broadcast stream health monitoring system. Simulates real-world stream telemetry including bitrates, latency, and error rates.

## Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Metrics:** `prom-client` (Prometheus exposition format)
- **Monitoring Sidecar:** Grafana Alloy
- **Deployment:** Google Cloud Run (Containerized via Docker)

## Architecture
- `src/index.js`: Main application logic, metrics generation, and incident simulation.
- `/metrics`: Standard Prometheus metrics endpoint.
- `/metrics.json`: JSON snapshot of current metrics for frontend consumption.
- `/simulate-incident`: POST endpoint to trigger synthetic failures.
- `alloy/`: Configuration for Grafana Alloy to scrape and remote-write to Grafana Cloud.

## Environment Variables
- `PORT`: Port to listen on (default 8080).
- `GRAFANA_REMOTE_WRITE_URL`: Target URL for metrics ingestion.
- `GRAFANA_INSTANCE_ID`: Grafana Cloud instance identifier.
- `GRAFANA_WRITE_TOKEN`: Authentication token for remote write.

## Conventions
- Use standard Prometheus gauge names and labels.
- Metrics should simulate natural jitter (±200 on bitrate, etc.).
- Incident simulation should be time-bound and automatically resolve.
