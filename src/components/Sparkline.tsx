import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
}

export function Sparkline({ data, color = '#0d9488', height = 40 }: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }));
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface MiniSparklineProps {
  data: number[];
  status: 'normal' | 'high' | 'low';
}

export function MiniSparkline({ data, status }: MiniSparklineProps) {
  const color = status === 'normal' ? '#10b981' : status === 'high' ? '#ef4444' : '#f59e0b';
  
  return (
    <div className="w-24 h-8">
      <Sparkline data={data} color={color} height={32} />
    </div>
  );
}
