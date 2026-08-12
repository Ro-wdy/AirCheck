import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Status, CDNMetrics } from '../types';

interface MetricCardProps {
  title: string;
  value: string;
  data: number[];
  status: Status;
  subValues?: CDNMetrics;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, data, status, subValues }) => {
  const statusColors = {
    healthy: 'border-healthy/30',
    degraded: 'border-degraded/30',
    critical: 'border-critical/30',
  };

  const chartData = data.map((val, i) => ({ val, i }));
  const lineColor = status === 'healthy' ? '#3DDC84' : status === 'degraded' ? '#F5A623' : '#F55050';

  return (
    <div className={`bg-surface border ${statusColors[status]} p-6 rounded-xl space-y-4 shadow-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider">{title}</h3>
          <div className="text-2xl font-bold mt-1">{value}</div>
        </div>
      </div>

      <div className="h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={lineColor} 
              strokeWidth={2} 
              dot={false} 
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {subValues && (
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
          {Object.entries(subValues).map(([region, val]) => (
            <div key={region} className="flex justify-between text-xs">
              <span className="text-white/40 uppercase">{region.replace('_', ' ')}</span>
              <span className="text-white/70">{val}ms</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
