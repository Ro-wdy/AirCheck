import React from 'react';
import { Zap, AlertOctagon, TrendingUp } from 'lucide-react';

interface IncidentPanelProps {
  onIncident: (type: string) => void;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

const IncidentPanel: React.FC<IncidentPanelProps> = () => {
  const triggerIncident = async (type: string) => {
    try {
      await fetch(`${BACKEND_URL}/simulate-incident`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
    } catch (error) {
      console.error('Failed to trigger incident:', error);
    }
  };

  return (
    <div className="bg-surface/90 backdrop-blur border border-white/10 p-4 rounded-2xl shadow-2xl flex space-x-2">
      <button 
        onClick={() => triggerIncident('cdn_failure')}
        className="p-2 hover:bg-critical/20 text-critical rounded-lg transition-colors flex flex-col items-center space-y-1"
        title="Simulate CDN Failure"
      >
        <AlertOctagon className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase">CDN</span>
      </button>
      <button 
        onClick={() => triggerIncident('encoder_failure')}
        className="p-2 hover:bg-degraded/20 text-degraded rounded-lg transition-colors flex flex-col items-center space-y-1"
        title="Simulate Encoder Failure"
      >
        <Zap className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase">ENC</span>
      </button>
      <button 
        onClick={() => triggerIncident('traffic_spike')}
        className="p-2 hover:bg-teal/20 text-teal rounded-lg transition-colors flex flex-col items-center space-y-1"
        title="Simulate Traffic Spike"
      >
        <TrendingUp className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase">TRAF</span>
      </button>
    </div>
  );
};

export default IncidentPanel;
