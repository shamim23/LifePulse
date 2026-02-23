import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Info, Utensils, Pill, AlertCircle, Stethoscope, FileText, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

// Sample data
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
  dates?: string[];
}

const sampleTestResults: TestResult[] = [
  { 
    id: '2', 
    testName: 'DHEA Sulfate', 
    value: 261, 
    unit: 'mcg/dL', 
    normalRange: { min: 19, max: 237 }, 
    date: '2026-02-15', 
    status: 'high', 
    category: 'Female Health',
    description: 'Dehydroepiandrosterone sulfate (DHEA-S) is the most abundant hormone in the human body. It is associated with longevity, positive reproductive outcomes, and immune system regulation.',
    history: [230, 245, 255, 261],
    dates: ['2022', '2023', '2023', '2024']
  },
  { 
    id: '3', 
    testName: 'Anti-Mullerian Hormone (AMH)', 
    value: 1.97, 
    unit: 'ng/mL', 
    normalRange: { min: 0.5, max: 4.0 }, 
    date: '2026-02-15', 
    status: 'normal', 
    category: 'Female Health',
    description: 'AMH is produced by the granulosa cells in ovarian follicles and is a marker of ovarian reserve.',
    history: [1.8, 1.85, 1.9, 1.97],
    dates: ['2022', '2023', '2023', '2024']
  },
  { 
    id: '8', 
    testName: 'LDL Medium', 
    value: 427, 
    unit: 'nmol/L', 
    normalRange: { min: 0, max: 350 }, 
    date: '2026-02-15', 
    status: 'high', 
    category: 'Heart',
    description: 'Medium-sized LDL particles are associated with increased cardiovascular risk compared to larger, buoyant LDL particles.',
    history: [400, 410, 420, 427],
    dates: ['2022', '2023', '2023', '2024']
  },
];

// Educational content for biomarkers
const biomarkerEducation: Record<string, {
  whyItMatters: string;
  causes: string[];
  foodsToEat: string[];
  foodsToLimit: string[];
  supplements: string[];
  symptoms: string[];
  additionalTests: string[];
}> = {
  'DHEA Sulfate': {
    whyItMatters: `Dehydroepiandrosterone sulfate (DHEA-S) is the most abundant hormone in the human body. It is associated with longevity, positive reproductive outcomes, and immune system regulation. DHEA-S production gradually increases from age 10, peaks during your 20s, and slowly decreases with age.

DHEA-S is one of three adrenal androgens produced in the adrenal gland. Androgens are steroid hormones that control the development and maintenance of masculine characteristics. The prominent androgen is testosterone.`,
    causes: [
      'Aging (natural decline after age 30)',
      'Adrenal insufficiency',
      'Chronic stress',
      'Certain medications',
      'Genetic factors'
    ],
    foodsToEat: [
      'Wild-caught fish (salmon, mackerel)',
      'Healthy fats (avocado, olive oil)',
      'Colorful vegetables',
      'Nuts and seeds',
      'Whole grains'
    ],
    foodsToLimit: [
      'Processed foods',
      'Excessive sugar',
      'Alcohol',
      'Trans fats',
      'Refined carbohydrates'
    ],
    supplements: [
      'DHEA (consult doctor)',
      'Omega-3 fatty acids',
      'Vitamin D',
      'Magnesium',
      'Zinc'
    ],
    symptoms: [
      'Fatigue',
      'Decreased muscle mass',
      'Mood changes',
      'Low libido',
      'Weakened immune system'
    ],
    additionalTests: [
      'Testosterone levels',
      'Cortisol levels',
      'Thyroid panel',
      'FSH and LH'
    ]
  }
};

export default function BiomarkerDetail() {
  const { id } = useParams<{ id: string }>();
  const biomarker = sampleTestResults.find(r => r.id === id) || sampleTestResults[0];
  const education = biomarkerEducation[biomarker.testName] || biomarkerEducation['DHEA Sulfate'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'high': return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'low': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
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

  // Prepare chart data
  const chartData = biomarker.dates?.map((date, index) => ({
    date,
    value: biomarker.history?.[index] || 0,
    fullDate: `${date}`
  })) || [];

  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/test-results">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <Link to="/dashboard" className="hover:text-teal-600">Your Health</Link>
                <ChevronLeft className="h-3 w-3 rotate-180" />
                <Link to="/test-results" className="hover:text-teal-600">{biomarker.category}</Link>
                <ChevronLeft className="h-3 w-3 rotate-180" />
                <span>Stress & Aging</span>
              </div>
              <h1 className="text-3xl font-serif text-slate-900 dark:text-white">{biomarker.testName}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Biomarker Card with Chart */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Left Info Panel */}
                  <div className="w-48 flex-shrink-0">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(biomarker.status)} mb-4`}>
                      <div className={`w-2 h-2 rounded-full ${biomarker.status === 'normal' ? 'bg-emerald-500' : biomarker.status === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                      <span className="text-sm font-medium">{getStatusLabel(biomarker.status)}</span>
                      <span className="text-sm">· {biomarker.value}</span>
                      <span className="text-xs">{biomarker.unit}</span>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {biomarker.description}
                    </p>

                    <div className="text-xs text-slate-400 mb-4">
                      Lab Reference Range<br />
                      {biomarker.normalRange.min}-{biomarker.normalRange.max} {biomarker.unit}
                    </div>

                    {/* Range Indicators */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-rose-400" />
                        <span className="text-slate-500">Above Range</span>
                        <span className="text-slate-400 ml-auto">&gt; {biomarker.normalRange.max}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-emerald-400" />
                        <span className="text-slate-500">In Range</span>
                        <span className="text-slate-400 ml-auto">{biomarker.normalRange.min} - {biomarker.normalRange.max}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-amber-400" />
                        <span className="text-slate-500">Below Range</span>
                        <span className="text-slate-400 ml-auto">&lt; {biomarker.normalRange.min}</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="flex-1 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                          domain={['dataMin - 20', 'dataMax + 20']}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        {/* Normal range area */}
                        <ReferenceArea 
                          y1={biomarker.normalRange.min} 
                          y2={biomarker.normalRange.max} 
                          fill="#10b981" 
                          fillOpacity={0.1}
                        />
                        <ReferenceLine 
                          y={biomarker.normalRange.max} 
                          stroke="#f43f5e" 
                          strokeDasharray="5 5"
                          strokeOpacity={0.5}
                        />
                        <ReferenceLine 
                          y={biomarker.normalRange.min} 
                          stroke="#f59e0b" 
                          strokeDasharray="5 5"
                          strokeOpacity={0.5}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={biomarker.status === 'normal' ? '#10b981' : '#f43f5e'}
                          strokeWidth={2}
                          dot={{ fill: biomarker.status === 'normal' ? '#10b981' : '#f43f5e', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content Tabs */}
            <Tabs defaultValue="why-it-matters" className="w-full">
              <TabsList className="grid grid-cols-4 lg:grid-cols-7 bg-white dark:bg-slate-900 p-1 rounded-lg">
                <TabsTrigger value="why-it-matters" className="text-xs">
                  <Info className="h-3 w-3 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Why it matters?</span>
                  <span className="lg:hidden">Why?</span>
                </TabsTrigger>
                <TabsTrigger value="causes" className="text-xs">
                  <AlertCircle className="h-3 w-3 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Causes</span>
                </TabsTrigger>
                <TabsTrigger value="foods" className="text-xs">
                  <Utensils className="h-3 w-3 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Foods</span>
                </TabsTrigger>
                <TabsTrigger value="supplements" className="text-xs">
                  <Pill className="h-3 w-3 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Supplements</span>
                </TabsTrigger>
                <TabsTrigger value="symptoms" className="text-xs">
                  <Stethoscope className="h-3 w-3 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Symptoms</span>
                </TabsTrigger>
                <TabsTrigger value="tests" className="text-xs">
                  <FileText className="h-3 w-3 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Tests</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="why-it-matters" className="mt-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">Why it matters?</h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {education.whyItMatters.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="causes" className="mt-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">Potential Causes</h2>
                    <ul className="space-y-3">
                      {education.causes.map((cause, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <ArrowUpRight className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 dark:text-slate-400">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="foods" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        Foods to Eat
                      </h3>
                      <ul className="space-y-2">
                        {education.foodsToEat.map((food, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {food}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-rose-700 mb-4 flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        Foods to Limit
                      </h3>
                      <ul className="space-y-2">
                        {education.foodsToLimit.map((food, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            {food}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="supplements" className="mt-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">Recommended Supplements</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {education.supplements.map((supplement, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <Pill className="h-5 w-5 text-teal-600" />
                          <span className="text-slate-700 dark:text-slate-300">{supplement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="symptoms" className="mt-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">Related Symptoms</h2>
                    <div className="flex flex-wrap gap-2">
                      {education.symptoms.map((symptom, i) => (
                        <Badge key={i} variant="secondary" className="px-3 py-1.5">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tests" className="mt-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">Additional Tests to Consider</h2>
                    <ul className="space-y-3">
                      {education.additionalTests.map((test, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-teal-600" />
                          <span className="text-slate-600 dark:text-slate-400">{test}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
                    <Utensils className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 group-hover:text-teal-700">Foods</p>
                    <p className="text-sm text-slate-500 truncate">Mackerel, Sardines, Herring...</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </Link>
                
                <Link to="/action-plan" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Pill className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 group-hover:text-indigo-700">Supplements</p>
                    <p className="text-sm text-slate-500 truncate">Omega-3 Fatty Acids...</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
