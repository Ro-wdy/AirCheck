#!/bin/bash
set -e

PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="aircheck-frontend"
REGION="us-central1"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"
BACKEND_URL=$1

if [ -z "$BACKEND_URL" ]; then
  echo "Usage: ./deploy-frontend.sh <BACKEND_URL>"
  exit 1
fi

echo "Building and pushing image..."
gcloud builds submit --tag "$IMAGE" --build-arg VITE_BACKEND_URL="$BACKEND_URL" .

echo "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars VITE_BACKEND_URL="$BACKEND_URL"
