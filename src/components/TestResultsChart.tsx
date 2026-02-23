import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import type { TestResult } from '@/pages/Dashboard';

interface TestResultsChartProps {
  testResults: TestResult[];
  category: string;
  height?: number;
  showLegend?: boolean;
}

interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export function TestResultsChart({ 
  testResults, 
  category, 
  height = 300,
  showLegend = false 
}: TestResultsChartProps) {
  // Process data for the chart
  const { chartData, testNames, ranges } = useMemo(() => {
    // Filter by category
    const categoryResults = testResults.filter(r => r.category === category);
    
    // Get unique test names and dates
    const testNamesSet = new Set(categoryResults.map(r => r.testName));
    const testNames = Array.from(testNamesSet);
    
    // Get unique dates sorted
    const dates = Array.from(new Set(categoryResults.map(r => r.date))).sort();
    
    // Build chart data
    const chartData: ChartDataPoint[] = dates.map(date => {
      const point: ChartDataPoint = { date };
      testNames.forEach(testName => {
        const result = categoryResults.find(r => r.date === date && r.testName === testName);
        if (result) {
          point[testName] = result.value;
        }
      });
      return point;
    });

    // Get normal ranges for each test
    const ranges: Record<string, { min: number; max: number }> = {};
    testNames.forEach(testName => {
      const result = categoryResults.find(r => r.testName === testName);
      if (result) {
        ranges[testName] = result.normalRange;
      }
    });

    return { chartData, testNames, ranges };
  }, [testResults, category]);

  // Color palette
  const colors = ['#0d9488', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981', '#f97316'];

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
            {formatDate(label || '')}
          </p>
          {payload.map((entry, index) => {
            const testName = entry.name;
            const range = ranges[testName];
            const isNormal = range && entry.value >= range.min && entry.value <= range.max;
            
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-600 dark:text-slate-400">{testName}:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {entry.value}
                </span>
                {range && (
                  <span className={`text-xs ${isNormal ? 'text-green-500' : 'text-red-500'}`}>
                    {isNormal ? '✓' : '⚠'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px] text-slate-500 dark:text-slate-400">
        <p>No data available</p>
      </div>
    );
  }

  // For single test, show area under the curve
  if (testNames.length === 1) {
    const testName = testNames[0];
    const color = colors[0];
    const range = ranges[testName];

    return (
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${testName}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {range && (
            <>
              <ReferenceLine 
                y={range.max} 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                strokeOpacity={0.5}
              />
              <ReferenceLine 
                y={range.min} 
                stroke="#22c55e" 
                strokeDasharray="5 5" 
                strokeOpacity={0.5}
              />
            </>
          )}
          <Area 
            type="monotone" 
            dataKey={testName} 
            stroke={color} 
            fill={`url(#gradient-${testName})`}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey={testName} 
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  // Multiple tests - line chart
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDate}
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
        )}
        {testNames.map((testName, index) => (
          <Line 
            key={testName}
            type="monotone" 
            dataKey={testName} 
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
