#!/bin/bash

# This script shows how to create the secrets required by the AirCheck backend.
# Run these commands manually with your real credentials.

# gcloud secrets create aircheck-grafana-remote-write-url --replication-policy="automatic"
# echo -n "https://your-remote-write-url" | gcloud secrets versions add aircheck-grafana-remote-write-url --data-file=-

# gcloud secrets create aircheck-grafana-instance-id --replication-policy="automatic"
# echo -n "123456" | gcloud secrets versions add aircheck-grafana-instance-id --data-file=-

# gcloud secrets create aircheck-grafana-write-token --replication-policy="automatic"
# echo -n "your-token-here" | gcloud secrets versions add aircheck-grafana-write-token --data-file=-

echo "Secret setup placeholder script. Uncomment and run commands with your own values."
