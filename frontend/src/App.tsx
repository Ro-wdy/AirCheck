import React, { useState, useEffect } from 'react';
import { Activity, Shield, AlertTriangle, XCircle, Zap } from 'lucide-react';
import { MetricSnapshot, ActivityLog, Status } from './types';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import IncidentPanel from './components/IncidentPanel';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricSnapshot[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [status, setStatus] = useState<Status>('healthy');
  const [isReconnecting, setIsReconnecting] = useState(false);

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/metrics.json`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: MetricSnapshot = await response.json();
      
      setMetrics(prev => [...prev.slice(-29), data]);
      setIsReconnecting(false);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      setIsReconnecting(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMetrics, 3000);
    fetchMetrics();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (metrics.length === 0) return;
    
    const latest = metrics[metrics.length - 1];
    
    // Threshold calculations
    const getStatus = (): Status => {
      if (latest.error_rate > 0.05 || latest.buffer_ratio > 0.1) return 'critical';
      if (latest.error_rate > 0.01 || latest.buffer_ratio > 0.03) return 'degraded';
      return 'healthy';
    };
    
    setStatus(getStatus());
  }, [metrics]);

  const addActivity = (message: string, type: ActivityLog['type'] = 'info') => {
    setActivities(prev => [{ timestamp: new Date().toISOString(), message, type }, ...prev]);
  };

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      <Header status={status} isReconnecting={isReconnecting} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard 
          title="Bitrate" 
          value={`${metrics[metrics.length - 1]?.bitrate_kbps || 0} kbps`}
          data={metrics.map(m => m.bitrate_kbps)}
          status={status}
        />
        <MetricCard 
          title="Buffer Ratio" 
          value={`${(metrics[metrics.length - 1]?.buffer_ratio * 100).toFixed(2) || 0}%`}
          data={metrics.map(m => m.buffer_ratio)}
          status={status}
        />
        <MetricCard 
          title="Error Rate" 
          value={`${(metrics[metrics.length - 1]?.error_rate * 100).toFixed(2) || 0}%`}
          data={metrics.map(m => m.error_rate)}
          status={status}
        />
        <MetricCard 
          title="Viewers" 
          value={metrics[metrics.length - 1]?.concurrent_viewers.toString() || '0'}
          data={metrics.map(m => m.concurrent_viewers)}
          status={status}
        />
        <MetricCard 
          title="CDN Latency" 
          value={metrics[metrics.length - 1]?.cdn_latency_ms ? 
            `${Math.max(...Object.values(metrics[metrics.length - 1].cdn_latency_ms))}ms` : '0ms'}
          subValues={metrics[metrics.length - 1]?.cdn_latency_ms}
          data={metrics.map(m => Math.max(...Object.values(m.cdn_latency_ms)))}
          status={status}
        />
      </div>

      <ActivityFeed activities={activities} />
      
      <div className="fixed bottom-6 right-6">
        <IncidentPanel onIncident={() => {}} />
      </div>
    </div>
  );
};

export default App;
