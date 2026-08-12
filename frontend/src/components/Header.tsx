import React from 'react';
import { Status } from '../types';
import { Shield, AlertTriangle, XCircle, Loader2 } from 'lucide-react';

interface HeaderProps {
  status: Status;
  isReconnecting: boolean;
}

const Header: React.FC<HeaderProps> = ({ status, isReconnecting }) => {
  const statusConfig = {
    healthy: { label: 'Healthy', icon: Shield, color: 'text-healthy bg-healthy/10 border-healthy/20' },
    degraded: { label: 'Degraded', icon: AlertTriangle, color: 'text-degraded bg-degraded/10 border-degraded/20' },
    critical: { label: 'Critical', icon: XCircle, color: 'text-critical bg-critical/10 border-critical/20' },
  };

  const current = statusConfig[status];
  const Icon = current.icon;

  return (
    <header className="flex items-center justify-between pb-4 border-b border-white/10">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
          <span className="font-bold text-background text-xl">A</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">AirCheck</h1>
      </div>

      <div className="flex items-center space-x-4">
        {isReconnecting && (
          <div className="flex items-center space-x-2 text-white/40 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Reconnecting...</span>
          </div>
        )}
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${current.color}`}>
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{current.label}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
