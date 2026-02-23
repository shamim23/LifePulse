import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Activity, Calendar, 
  ChevronRight, Leaf, Pill, Stethoscope, Sparkles, ArrowRight
} from 'lucide-react';
import { TestUpload } from '@/components/TestUpload';
import { MiniSparkline } from '@/components/Sparkline';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

// Sample data - in real app, this would come from backend
export interface TestResult {
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
  // Biological Age
  { id: '1', testName: 'Biological Age', value: 35.7, unit: 'years', normalRange: { min: 0, max: 100 }, date: '2026-02-15', status: 'normal', category: 'Biological Age', description: 'Your biological age is 15.6 years younger than your calendar age.', history: [42, 40, 38, 36, 35.7] },
  
  // Female Health
  { id: '2', testName: 'DHEA Sulfate', value: 261, unit: 'mcg/dL', normalRange: { min: 19, max: 237 }, date: '2026-02-15', status: 'high', category: 'Female Health', description: 'Can help gauge reproductive function and the health of your adrenal gland.', history: [230, 245, 255, 261] },
  { id: '3', testName: 'Anti-Mullerian Hormone (AMH)', value: 1.97, unit: 'ng/mL', normalRange: { min: 0.5, max: 4.0 }, date: '2026-02-15', status: 'normal', category: 'Female Health', description: 'Indicator of ovarian reserve.', history: [1.8, 1.85, 1.9, 1.97] },
  { id: '4', testName: 'Prolactin', value: 12.8, unit: 'ng/mL', normalRange: { min: 4.8, max: 23.3 }, date: '2026-02-15', status: 'normal', category: 'Female Health', description: 'Hormone that affects milk production and reproductive function.', history: [11, 11.5, 12, 12.8] },
  { id: '5', testName: 'Sex Hormone Binding Globulin (SHBG)', value: 85, unit: 'nmol/L', normalRange: { min: 18, max: 114 }, date: '2026-02-15', status: 'normal', category: 'Female Health', description: 'Protein that binds to sex hormones.', history: [80, 82, 84, 85] },
  
  // Heart
  { id: '6', testName: 'LDL Medium', value: 427, unit: 'nmol/L', normalRange: { min: 0, max: 350 }, date: '2026-02-15', status: 'high', category: 'Heart', description: 'Medium-sized LDL particles.', history: [400, 410, 420, 427] },
  { id: '7', testName: 'LDL Particle Number', value: 2142, unit: 'nmol/L', normalRange: { min: 0, max: 2000 }, date: '2026-02-15', status: 'high', category: 'Heart', description: 'Total number of LDL particles.', history: [2000, 2050, 2100, 2142] },
  { id: '8', testName: 'LDL Small', value: 308, unit: 'nmol/L', normalRange: { min: 0, max: 250 }, date: '2026-02-15', status: 'high', category: 'Heart', description: 'Small dense LDL particles associated with higher cardiovascular risk.', history: [280, 290, 300, 308] },
  { id: '9', testName: 'LDL-Cholesterol', value: 119, unit: 'mg/dL', normalRange: { min: 0, max: 100 }, date: '2026-02-15', status: 'high', category: 'Heart', description: '"Bad" cholesterol that can build up in arteries.', history: [110, 115, 118, 119] },
  { id: '10', testName: 'Non-HDL Cholesterol', value: 145, unit: 'mg/dL', normalRange: { min: 0, max: 130 }, date: '2026-02-15', status: 'high', category: 'Heart', description: 'Total cholesterol minus HDL.', history: [135, 140, 142, 145] },
  
  // Blood Sugar
  { id: '11', testName: 'Blood Glucose', value: 95, unit: 'mg/dL', normalRange: { min: 70, max: 100 }, date: '2026-02-15', status: 'normal', category: 'Blood Sugar', description: 'Current blood sugar level.', history: [98, 96, 94, 95] },
  { id: '12', testName: 'HbA1c', value: 5.7, unit: '%', normalRange: { min: 4.0, max: 5.7 }, date: '2026-02-15', status: 'normal', category: 'Blood Sugar', description: '3-month average blood sugar.', history: [5.9, 5.8, 5.7, 5.7] },
  
  // Lipid Profile
  { id: '13', testName: 'Total Cholesterol', value: 185, unit: 'mg/dL', normalRange: { min: 0, max: 200 }, date: '2026-02-15', status: 'normal', category: 'Lipid Profile', description: 'Total cholesterol in blood.', history: [190, 188, 186, 185] },
  { id: '14', testName: 'HDL Cholesterol', value: 55, unit: 'mg/dL', normalRange: { min: 40, max: 200 }, date: '2026-02-15', status: 'normal', category: 'Lipid Profile', description: '"Good" cholesterol that helps remove bad cholesterol.', history: [50, 52, 54, 55] },
  { id: '15', testName: 'Triglycerides', value: 120, unit: 'mg/dL', normalRange: { min: 0, max: 150 }, date: '2026-02-15', status: 'normal', category: 'Lipid Profile', description: 'Type of fat in your blood.', history: [130, 128, 125, 120] },
];

// Categories with counts
const categories = [
  { name: 'Biological Age', count: 1 },
  { name: 'Female Health', count: 9 },
  { name: 'Heart', count: 15 },
  { name: 'Blood Sugar', count: 5 },
  { name: 'Lipid Profile', count: 6 },
  { name: 'Thyroid', count: 8 },
  { name: 'Liver', count: 7 },
  { name: 'Kidney', count: 5 },
];

export default function Dashboard() {
  const [testResults] = useState<TestResult[]>(sampleTestResults);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // Calculate biomarker summary
  const biomarkerSummary = useMemo(() => {
    const inRange = testResults.filter(r => r.status === 'normal').length;
    const outOfRange = testResults.filter(r => r.status !== 'normal').length;
    const improving = 12; // Mock value
    const total = testResults.length;
    
    return { inRange, outOfRange, improving, total };
  }, [testResults]);

  // Get biological age
  const biologicalAge = testResults.find(r => r.testName === 'Biological Age');

  // Get recent results by category
  const getResultsByCategory = (category: string) => {
    return testResults
      .filter(r => r.category === category)
      .slice(0, 5);
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

  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Activity className="h-8 w-8 text-teal-600" />
                Your Health
              </h1>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Track and visualize your biomarkers over time
              </p>
            </div>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-700 hover:bg-teal-800 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Results
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle>Upload Test Results</DialogTitle>
                  <DialogDescription>
                    Upload your lab report PDF or image. We'll extract the test values automatically.
                  </DialogDescription>
                </DialogHeader>
                <TestUpload onUploadComplete={() => setUploadDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Biomarker Summary & Biological Age Row */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Biomarker Summary Card */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">All Biomarkers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-4">
                    {/* In Range - Large Bar */}
                    <div className="flex-1">
                      <div className="text-center mb-2">
                        <span className="text-3xl font-bold text-emerald-600">{biomarkerSummary.inRange}</span>
                        <p className="text-xs text-slate-500">In Range</p>
                      </div>
                      <div className="h-32 bg-emerald-100 rounded-lg relative overflow-hidden">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-b-lg transition-all"
                          style={{ height: `${(biomarkerSummary.inRange / biomarkerSummary.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Out of Range */}
                    <div className="flex-1">
                      <div className="text-center mb-2">
                        <span className="text-2xl font-bold text-rose-600">{biomarkerSummary.outOfRange}</span>
                        <p className="text-xs text-slate-500">Out of Range</p>
                      </div>
                      <div className="h-24 bg-rose-100 rounded-lg relative overflow-hidden">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-rose-500 rounded-b-lg transition-all"
                          style={{ height: `${(biomarkerSummary.outOfRange / biomarkerSummary.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Improving */}
                    <div className="flex-1">
                      <div className="text-center mb-2">
                        <span className="text-2xl font-bold text-cyan-600">{biomarkerSummary.improving}</span>
                        <p className="text-xs text-slate-500">Improving</p>
                      </div>
                      <div className="h-20 bg-cyan-100 rounded-lg relative overflow-hidden">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-cyan-500 rounded-b-lg transition-all"
                          style={{ height: `${(biomarkerSummary.improving / biomarkerSummary.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Link to="/test-results">
                    <Button variant="ghost" className="w-full mt-4 text-teal-700">
                      View all <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Biological Age Card */}
              {biologicalAge && (
                <Card className="border-0 shadow-sm bg-gradient-to-br from-teal-600 to-teal-700 text-white">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-teal-100 text-sm mb-1">Biological Age</p>
                      <div className="text-5xl font-light mb-2">{biologicalAge.value}</div>
                      <p className="text-teal-100 text-sm mb-4">years</p>
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-sm">
                          Your biological age is <span className="font-semibold text-teal-200">15.6 years younger</span> than your calendar age.
                        </p>
                      </div>
                      <p className="text-xs text-teal-200 mt-3">Based on lab tests from May 2024</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Categories</h2>
                <Button variant="ghost" size="sm" className="text-teal-700">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {['Biological Age', 'Female Health', 'Heart'].map((category) => {
                  const results = getResultsByCategory(category);
                  const catInfo = categories.find(c => c.name === category);
                  if (results.length === 0) return null;
                  
                  return (
                    <div key={category} className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white">{category}</h3>
                          {catInfo && (
                            <span className="text-sm text-slate-500">
                              {catInfo.count} Biomarkers · {results.filter(r => r.status !== 'normal').length}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                      
                      <div className="space-y-3">
                        {results.map((result) => (
                          <Link 
                            key={result.id} 
                            to={`/biomarker/${result.id}`}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            {/* Status Bar */}
                            <div className={`w-1 h-12 rounded-full ${getStatusColor(result.status)}`} />
                            
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900 dark:text-white truncate">
                                  {result.testName}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs ${result.status === 'normal' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                  {getStatusLabel(result.status)}
                                </span>
                                <span className="text-xs text-slate-400">·</span>
                                <span className="text-xs text-slate-500">
                                  {result.value} {result.unit}
                                </span>
                              </div>
                            </div>
                            
                            {/* Sparkline */}
                            {result.history && (
                              <MiniSparkline data={result.history} status={result.status} />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Action Plan */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Your Action Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/action-plan" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 group-hover:text-teal-700">Foods</p>
                    <p className="text-sm text-slate-500 truncate">Mackerel, Sardines, Herring, Walnuts...</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </Link>
                
                <Link to="/action-plan" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Pill className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 group-hover:text-indigo-700">Supplements</p>
                    <p className="text-sm text-slate-500 truncate">Omega-3 Fatty Acids, Red Yeast Rice...</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </Link>
              </CardContent>
            </Card>

            {/* Feedback Card */}
            <Card className="border-0 shadow-sm bg-slate-900 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How are we doing?</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Please take a moment to tell us how we can make this experience better for you.
                </p>
                <Button variant="secondary" className="w-full bg-slate-800 hover:bg-slate-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Share Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Clinician Notes Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-teal-600" />
                  Clinician Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/clinician-notes" className="block p-3 bg-teal-50 rounded-lg border border-teal-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-teal-600" />
                      <span className="text-sm font-medium text-teal-900">Aug 3, 2024</span>
                      <Badge className="bg-teal-600 text-white text-xs">Latest</Badge>
                    </div>
                    <p className="text-sm text-teal-800 line-clamp-2">
                      Overall really positive and reassuring findings here. Keep up the good work!...
                    </p>
                  </Link>
                  <Link to="/clinician-notes" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600">May 17, 2024</span>
                    </div>
                  </Link>
                </div>
                <Link to="/clinician-notes">
                  <Button variant="ghost" className="w-full mt-4 text-teal-700">
                    View all notes <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
