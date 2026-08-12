# Grafana Alloy Sidecar

This directory contains the configuration for Grafana Alloy to run as a sidecar to the AirCheck backend.

## Usage

When deploying to a platform like Kubernetes or ECS, run the `grafana/alloy` image as a sidecar.

Ensure the following environment variables are set:
- `GRAFANA_REMOTE_WRITE_URL`
- `GRAFANA_INSTANCE_ID`
- `GRAFANA_WRITE_TOKEN`

Alloy will scrape `http://localhost:8080/metrics` every 15 seconds and push to Grafana Cloud.
