const express = require('express');
const client = require('prom-client');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Prometheus Metrics setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom Gauges
const streamBitrate = new client.Gauge({
  name: 'stream_bitrate_kbps',
  help: 'Current stream bitrate in kbps',
  registers: [register],
});

const streamBufferRatio = new client.Gauge({
  name: 'stream_buffer_ratio',
  help: 'Ratio of time spent buffering',
  registers: [register],
});

const cdnLatency = new client.Gauge({
  name: 'cdn_latency_ms',
  help: 'CDN latency in milliseconds',
  labelNames: ['region'],
  registers: [register],
});

const streamErrorRate = new client.Gauge({
  name: 'stream_error_rate',
  help: 'Percentage of stream requests resulting in errors',
  registers: [register],
});

const concurrentViewers = new client.Gauge({
  name: 'concurrent_viewers',
  help: 'Number of concurrent viewers',
  registers: [register],
});

// Baselines and State
const baselines = {
  bitrate: 6000,
  bufferRatio: 0.01,
  latency: { 'us-east': 45, 'us-west': 50, 'eu': 60, 'apac': 80 },
  errorRate: 0.1,
  viewers: 5000,
};

let activeIncidents = [];

// Helper for jitter
const jitter = (val, range) => val + (Math.random() * range * 2 - range);

// Metrics Update Loop
setInterval(() => {
  // Check for active incidents
  const now = Date.now();
  activeIncidents = activeIncidents.filter(incident => incident.endTime > now);

  const encoderFailure = activeIncidents.find(i => i.type === 'encoder_failure');
  const trafficSpike = activeIncidents.find(i => i.type === 'traffic_spike');

  // Bitrate
  if (encoderFailure) {
    streamBitrate.set(jitter(baselines.bitrate * 0.2, 50));
  } else {
    streamBitrate.set(jitter(baselines.bitrate, 200));
  }

  // Buffer Ratio
  if (encoderFailure) {
    streamBufferRatio.set(jitter(0.15, 0.02));
  } else {
    streamBufferRatio.set(Math.max(0, jitter(baselines.bufferRatio, 0.005)));
  }

  // CDN Latency & Error Rate
  Object.keys(baselines.latency).forEach(region => {
    const cdnFailure = activeIncidents.find(i => i.type === 'cdn_failure' && i.region === region);
    if (cdnFailure) {
      cdnLatency.set({ region }, jitter(baselines.latency[region] * 5, 20));
      streamErrorRate.set(jitter(5.0, 0.5)); // High error rate during CDN failure
    } else {
      cdnLatency.set({ region }, jitter(baselines.latency[region], 5));
    }
  });

  if (!activeIncidents.some(i => i.type === 'cdn_failure')) {
    streamErrorRate.set(Math.max(0, jitter(baselines.errorRate, 0.02)));
  }

  // Viewers (slow drift + spike simulation)
  if (trafficSpike) {
    baselines.viewers = Math.max(1000, baselines.viewers - 50); // Paradoxical drop for simulation
  } else {
    baselines.viewers += (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10);
  }
  concurrentViewers.set(Math.floor(baselines.viewers));

}, 2000);

// Endpoints
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/metrics.json', async (req, res) => {
  const metrics = await register.getMetricsAsJSON();
  const result = {};
  metrics.forEach(m => {
    if (m.type === 'gauge') {
      if (m.values.length > 1) {
        result[m.name] = m.values.map(v => ({ labels: v.labels, value: v.value }));
      } else {
        result[m.name] = m.values[0]?.value;
      }
    }
  });
  res.json(result);
});

app.post('/simulate-incident', (req, res) => {
  const { type, region, duration_seconds } = req.body;
  const duration = (duration_seconds || 30) * 1000;
  
  const incident = {
    type,
    region,
    startTime: Date.now(),
    endTime: Date.now() + duration
  };

  activeIncidents.push(incident);
  console.log(`Incident started: ${type} ${region || ''} for ${duration_seconds}s`);
  res.status(202).json({ message: 'Incident simulated', incident });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', incidents: activeIncidents.length });
});

app.listen(port, () => {
  console.log(`AirCheck backend listening at http://localhost:${port}`);
});
