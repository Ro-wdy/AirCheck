import React from 'react';
import { ActivityLog } from '../types';

interface ActivityFeedProps {
  activities: ActivityLog[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Agent Activity</h3>
      </div>
      <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="px-6 py-8 text-center text-white/30 text-sm italic">
            Waiting for activity logs...
          </div>
        ) : (
          activities.map((log, i) => (
            <div key={i} className="px-6 py-3 flex space-x-4 items-start hover:bg-white/5 transition-colors">
              <span className="text-xs font-mono text-white/20 whitespace-nowrap mt-0.5">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <p className="text-sm text-white/80 leading-relaxed">{log.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
