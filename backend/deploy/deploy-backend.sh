#!/bin/bash
set -e

PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="aircheck-backend"
REGION="us-central1"
IMAGE_TAG="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "Building container image..."
gcloud builds submit --tag "$IMAGE_TAG" .

echo "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_TAG" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --set-secrets="GRAFANA_REMOTE_WRITE_URL=aircheck-grafana-remote-write-url:latest" \
  --set-secrets="GRAFANA_INSTANCE_ID=aircheck-grafana-instance-id:latest" \
  --set-secrets="GRAFANA_WRITE_TOKEN=aircheck-grafana-write-token:latest"

echo "Deployment complete."
