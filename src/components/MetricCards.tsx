import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, Minus, Activity, Droplets, Heart, FlaskConical } from 'lucide-react';
import type { TestResult } from '@/pages/Dashboard';

interface MetricCardsProps {
  testResults: TestResult[];
}

interface MetricSummary {
  testName: string;
  latestValue: number;
  previousValue: number | null;
  unit: string;
  status: 'normal' | 'high' | 'low';
  change: number;
  icon: React.ReactNode;
  color: string;
}

export function MetricCards({ testResults }: MetricCardsProps) {
  // Get latest and previous values for key metrics
  const getMetricSummary = (testName: string): MetricSummary | null => {
    const results = testResults
      .filter(r => r.testName === testName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (results.length === 0) return null;

    const latest = results[0];
    const previous = results[1] || null;
    const change = previous ? ((latest.value - previous.value) / previous.value) * 100 : 0;

    const icons: Record<string, React.ReactNode> = {
      'Blood Glucose': <Droplets className="h-5 w-5" />,
      'HbA1c': <Activity className="h-5 w-5" />,
      'Total Cholesterol': <FlaskConical className="h-5 w-5" />,
      'LDL Cholesterol': <Heart className="h-5 w-5" />,
      'HDL Cholesterol': <Heart className="h-5 w-5" />,
      'Triglycerides': <FlaskConical className="h-5 w-5" />,
    };

    const colors: Record<string, string> = {
      'Blood Glucose': 'bg-blue-500',
      'HbA1c': 'bg-purple-500',
      'Total Cholesterol': 'bg-amber-500',
      'LDL Cholesterol': 'bg-red-500',
      'HDL Cholesterol': 'bg-green-500',
      'Triglycerides': 'bg-orange-500',
    };

    return {
      testName,
      latestValue: latest.value,
      previousValue: previous?.value || null,
      unit: latest.unit,
      status: latest.status,
      change,
      icon: icons[testName] || <Activity className="h-5 w-5" />,
      color: colors[testName] || 'bg-slate-500',
    };
  };

  const metrics = [
    getMetricSummary('Blood Glucose'),
    getMetricSummary('HbA1c'),
    getMetricSummary('Total Cholesterol'),
    getMetricSummary('LDL Cholesterol'),
  ].filter((m): m is MetricSummary => m !== null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Normal</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">High</Badge>;
      case 'low':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Low</Badge>;
      default:
        return null;
    }
  };

  const getTrendIcon = (change: number) => {
    if (Math.abs(change) < 1) {
      return <Minus className="h-4 w-4 text-slate-400" />;
    }
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    }
    return <TrendingDown className="h-4 w-4 text-green-500" />;
  };

  const getTrendColor = (change: number) => {
    if (Math.abs(change) < 1) return 'text-slate-500';
    // For metrics where lower is better (like LDL), reverse the colors
    const lowerIsBetter = ['LDL Cholesterol', 'Triglycerides', 'Blood Glucose'];
    const isLowerBetter = lowerIsBetter.some(name => metrics.some(m => m.testName === name));
    
    if (change > 0) {
      return isLowerBetter ? 'text-red-600' : 'text-green-600';
    }
    return isLowerBetter ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.testName} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-start justify-between p-5">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {metric.testName}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {metric.latestValue}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {metric.unit}
                  </span>
                </div>
                <div className="mt-2">
                  {getStatusBadge(metric.status)}
                </div>
              </div>
              <div className={`${metric.color} text-white p-2 rounded-lg`}>
                {metric.icon}
              </div>
            </div>
            
            {/* Trend indicator */}
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {getTrendIcon(metric.change)}
                <span className={`text-sm font-medium ${getTrendColor(metric.change)}`}>
                  {Math.abs(metric.change).toFixed(1)}%
                </span>
                <span className="text-xs text-slate-400">
                  vs last test
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Quick Add Card */}
      <Card className="border-dashed border-2 border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
        <CardContent className="flex flex-col items-center justify-center h-full py-6 text-center">
          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-3">
            <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Add New Metric
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track custom health markers
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
