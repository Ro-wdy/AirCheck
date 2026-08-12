export type Status = 'healthy' | 'degraded' | 'critical';

export interface CDNMetrics {
  us_east: number;
  us_west: number;
  eu_central: number;
  ap_southeast: number;
}

export interface MetricSnapshot {
  timestamp: string;
  bitrate_kbps: number;
  buffer_ratio: number;
  cdn_latency_ms: CDNMetrics;
  error_rate: number;
  concurrent_viewers: number;
}

export interface ActivityLog {
  timestamp: string;
  message: string;
  type?: 'info' | 'warning' | 'error';
}
