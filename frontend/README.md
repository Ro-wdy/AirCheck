# AirCheck Frontend

A minimal, dark-themed dashboard for broadcast stream health monitoring.

## Getting Started

### Local Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    # Ensure your backend is running at http://localhost:8080 or set VITE_BACKEND_URL
    npm run dev
    ```

### Build

To create a production build:
```bash
npm run build
```

### Deployment

To deploy to Google Cloud Run:
```bash
./deploy/deploy-frontend.sh <YOUR_BACKEND_URL>
```
The script will build the Docker image using Cloud Build, push it to Artifact Registry, and deploy it to Cloud Run.

## Environment Variables

- `VITE_BACKEND_URL`: The URL of the AirCheck backend service. Defaults to `http://localhost:8080`.

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Recharts (Sparklines)
- Lucide React (Icons)
