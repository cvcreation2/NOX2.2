import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrafficStats } from '../types';
import { formatBytes } from '../utils/formatters';

interface StatsGraphProps {
  data: TrafficStats['history'];
}

const StatsGraph: React.FC<StatsGraphProps> = ({ data }) => {
  return (
    <div className="w-full h-32 mt-4 glass-panel rounded-xl overflow-hidden p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[0, 'auto']} />
            <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ display: 'none' }}
                formatter={(value: number) => [formatBytes(value * 1024), 'Speed']}
            />
            <Area
              type="monotone"
              dataKey="download"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDown)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="upload"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUp)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
    </div>
  );
};

export default StatsGraph;