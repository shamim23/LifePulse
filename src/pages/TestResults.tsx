import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MiniSparkline } from '@/components/Sparkline';

// Sample data (same as Dashboard)
interface TestResult {
  id: string;
  testName: string;
  value: number;
  unit: string;
  normalRange: { min: number; max: number };
  date: string;
  status: 'normal' | 'high' | 'low';
  category: string;
  description?: string;
  history?: number[];
}

const sampleTestResults: TestResult[] = [
  { id: '1', testName: 'Biological Age', value: 35.7, unit: 'years', normalRange: { min: 0, max: 100 }, date: '2026-02-15', status: 'normal', category: 'Biological Age', description: 'Your biological age is 15.6 years younger than your calendar age.', history: [42, 40, 38, 36, 35.7] },
  { id: '2', testName: 'DHEA Sulfate', value: 261, unit: 'mcg/dL', normalRange: { min: 19, max: 237 }, date: '2026-02-15', status: 'high', category: 'Female Health', description: 'Can help gauge reproductive function and the health of your adrenal gland.', history: [230, 245, 255, 261] },
  { id: '3', testName: 'Anti-Mullerian Hormone (AMH)', value: 1.97, unit: 'ng/mL', normalRange: { min: 0.5, max: 4.0 }, date: '2026-02-15', status: 'normal', category: 'Female Health', description: 'Indicator of ovarian reserve.', history: [1.8, 1.85, 1.9, 1.97] },
  { id: '4', testName: 'Prolactin', value: 12.8, unit: 'ng/mL', normalRange: { min: 4.8, max: 23.3 }, date: '2026-02-15', status: 'normal', category: 'Female Health', description: 'Hormone that affects milk production and reproductive function.', history: [11, 11.5, 12, 12.8] },
  { id: '5', testName: 'Sex Hormone Binding Globulin (SHBG)', value: 85, unit: 'nmol/L', normalRange: { min: 18, max: 114 }, date: '2026-02-15', status: 'normal', category: 'Female Health', description: 'Protein that binds to sex hormones.', history: [80, 82, 84, 85] },
  { id: '6', testName: 'Testosterone, Free', value: 2.6, unit: 'pg/mL', normalRange: { min: 0.8, max: 7.4 }, date: '2026-02-15', status: 'normal', category: 'Female Health', description: 'Free testosterone levels.', history: [2.4, 2.5, 2.55, 2.6] },
  { id: '7', testName: 'Testosterone, Total', value: 41, unit: 'ng/dL', normalRange: { min: 8, max: 60 }, date: '2026-02-15', status: 'normal', category: 'Female Health', description: 'Total testosterone levels.', history: [38, 39, 40, 41] },
  { id: '8', testName: 'LDL Medium', value: 427, unit: 'nmol/L', normalRange: { min: 0, max: 350 }, date: '2026-02-15', status: 'high', category: 'Heart', description: 'Medium-sized LDL particles.', history: [400, 410, 420, 427] },
  { id: '9', testName: 'LDL Particle Number', value: 2142, unit: 'nmol/L', normalRange: { min: 0, max: 2000 }, date: '2026-02-15', status: 'high', category: 'Heart', description: 'Total number of LDL particles.', history: [2000, 2050, 2100, 2142] },
  { id: '10', testName: 'LDL Small', value: 308, unit: 'nmol/L', normalRange: { min: 0, max: 250 }, date: '2026-02-15', status: 'high', category: 'Heart', description: 'Small dense LDL particles associated with higher cardiovascular risk.', history: [280, 290, 300, 308] },
  { id: '11', testName: 'LDL-Cholesterol', value: 119, unit: 'mg/dL', normalRange: { min: 0, max: 100 }, date: '2026-02-15', status: 'high', category: 'Heart', description: '"Bad" cholesterol that can build up in arteries.', history: [110, 115, 118, 119] },
  { id: '12', testName: 'Non-HDL Cholesterol', value: 145, unit: 'mg/dL', normalRange: { min: 0, max: 130 }, date: '2026-02-15', status: 'high', category: 'Heart', description: 'Total cholesterol minus HDL.', history: [135, 140, 142, 145] },
  { id: '13', testName: 'Blood Glucose', value: 95, unit: 'mg/dL', normalRange: { min: 70, max: 100 }, date: '2026-02-15', status: 'normal', category: 'Blood Sugar', description: 'Current blood sugar level.', history: [98, 96, 94, 95] },
  { id: '14', testName: 'HbA1c', value: 5.7, unit: '%', normalRange: { min: 4.0, max: 5.7 }, date: '2026-02-15', status: 'normal', category: 'Blood Sugar', description: '3-month average blood sugar.', history: [5.9, 5.8, 5.7, 5.7] },
  { id: '15', testName: 'Total Cholesterol', value: 185, unit: 'mg/dL', normalRange: { min: 0, max: 200 }, date: '2026-02-15', status: 'normal', category: 'Lipid Profile', description: 'Total cholesterol in blood.', history: [190, 188, 186, 185] },
  { id: '16', testName: 'HDL Cholesterol', value: 55, unit: 'mg/dL', normalRange: { min: 40, max: 200 }, date: '2026-02-15', status: 'normal', category: 'Lipid Profile', description: '"Good" cholesterol that helps remove bad cholesterol.', history: [50, 52, 54, 55] },
  { id: '17', testName: 'Triglycerides', value: 120, unit: 'mg/dL', normalRange: { min: 0, max: 150 }, date: '2026-02-15', status: 'normal', category: 'Lipid Profile', description: 'Type of fat in your blood.', history: [130, 128, 125, 120] },
];

const categories = [
  { name: 'Biological Age', count: 1 },
  { name: 'Female Health', count: 9 },
  { name: 'Heart', count: 15 },
  { name: 'Blood Sugar', count: 5 },
  { name: 'Lipid Profile', count: 6 },
];

export default function TestResults() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = sampleTestResults.filter(result =>
    result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getResultsByCategory = (category: string) => {
    return filteredResults.filter(r => r.category === category);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-emerald-500';
      case 'high': return 'bg-rose-500';
      case 'low': return 'bg-amber-500';
      default: return 'bg-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'normal': return 'In Range';
      case 'high': return 'Above Range';
      case 'low': return 'Below Range';
      default: return '';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-emerald-600';
      case 'high': return 'text-rose-600';
      case 'low': return 'text-amber-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Test Results</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            View all your biomarkers and their trends
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search biomarkers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 text-lg bg-white border-0 shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const results = getResultsByCategory(category.name);
            if (results.length === 0) return null;

            const outOfRangeCount = results.filter(r => r.status !== 'normal').length;

            return (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{category.name}</h2>
                    <span className="text-sm text-slate-500">
                      {category.count} Biomarkers · {outOfRangeCount}
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>

                <Card className="border-0 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    {results.map((result, index) => (
                      <Link
                        key={result.id}
                        to={`/biomarker/${result.id}`}
                        className={`flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          index !== results.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''
                        }`}
                      >
                        {/* Status Bar */}
                        <div className={`w-1 h-14 rounded-full ${getStatusColor(result.status)}`} />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-900 dark:text-white">
                            {result.testName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-sm font-medium ${getStatusTextColor(result.status)}`}>
                              {getStatusLabel(result.status)}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {result.value} {result.unit}
                            </span>
                          </div>
                        </div>

                        {/* Sparkline */}
                        {result.history && (
                          <div className="hidden sm:block">
                            <MiniSparkline data={result.history} status={result.status} />
                          </div>
                        )}

                        <ChevronRight className="h-5 w-5 text-slate-300" />
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
