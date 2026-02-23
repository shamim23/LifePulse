import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, Search, Check, Clock, Utensils, Pill, 
  Leaf, Sparkles, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const foodsData = {
  enjoy: [
    { name: 'Mackerel', category: 'Fish', isTop: true },
    { name: 'Sardines', category: 'Fish', isTop: true },
    { name: 'Herring', category: 'Fish', isTop: true },
    { name: 'Walnut', category: 'Nuts', isTop: true },
    { name: 'Cashew', category: 'Nuts', isTop: true },
    { name: 'Acai', category: 'Fruits' },
    { name: 'Acorn Squash', category: 'Vegetables' },
    { name: 'Almonds', category: 'Nuts' },
    { name: 'Anchovies', category: 'Fish' },
    { name: 'Arugula', category: 'Vegetables' },
    { name: 'Asparagus', category: 'Vegetables' },
    { name: 'Avocado', category: 'Fruits' },
  ],
  limit: [
    { name: 'Processed Foods', category: 'General' },
    { name: 'Sugary Drinks', category: 'Beverages' },
    { name: 'Refined Carbs', category: 'Grains' },
    { name: 'Trans Fats', category: 'Fats' },
    { name: 'Excessive Alcohol', category: 'Beverages' },
  ]
};

const supplementsData = [
  { name: 'Omega-3 Fatty Acids', dosage: '1000mg daily', priority: 'high', reason: 'Supports heart health and reduces inflammation' },
  { name: 'Red Yeast Rice', dosage: '600mg twice daily', priority: 'high', reason: 'May help lower LDL cholesterol' },
  { name: 'CoQ10', dosage: '100mg daily', priority: 'medium', reason: 'Supports cardiovascular health' },
  { name: 'Vitamin D3', dosage: '2000 IU daily', priority: 'medium', reason: 'Supports immune function and bone health' },
  { name: 'Magnesium', dosage: '400mg daily', priority: 'medium', reason: 'Supports heart rhythm and blood pressure' },
];

export default function ActionPlan() {
  const [searchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('foods');

  // Filter foods based on search term (for future use)
  void searchTerm; // Mark as intentionally used

  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-serif text-slate-900 dark:text-white">Your Action Plan</h1>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">ALPHA</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Here is your personalized August 3rd Action Plan, targeting your{' '}
                  <span className="text-teal-700 font-medium underline cursor-pointer">19 vital biomarkers</span>.
                  The food recommendations are specific to your findings and will continually evolve as your biomarkers shift over time.
                </p>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white dark:bg-slate-900 p-1 rounded-lg mb-6">
                <TabsTrigger value="foods" className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Foods
                </TabsTrigger>
                <TabsTrigger value="supplements" className="flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  Supplements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="foods" className="mt-0">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    {/* Food Type Toggle */}
                    <div className="flex gap-2 mb-6">
                      <Button 
                        variant="default" 
                        className="flex-1 bg-teal-700 hover:bg-teal-800"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Enjoy these
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Limit these
                      </Button>
                    </div>

                    {/* Alphabet Filter */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-4 mb-4 text-sm">
                      <Search className="h-4 w-4 text-slate-400 mr-2" />
                      <span className="text-slate-400">#</span>
                      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                        <button
                          key={letter}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                        >
                          {letter}
                        </button>
                      ))}
                    </div>

                    {/* Top 5 Section */}
                    <div className="mb-8">
                      <h3 className="text-sm font-medium text-emerald-700 mb-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Your Top 5
                      </h3>
                      <div className="space-y-2">
                        {foodsData.enjoy.filter(f => f.isTop).map((food, index) => (
                          <div 
                            key={food.name}
                            className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100"
                          >
                            <span className="text-emerald-600 font-medium w-6">{index + 1}</span>
                            <span className="text-slate-700">{food.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* A Section */}
                    <div>
                      <h3 className="text-lg font-medium text-teal-700 mb-4">A</h3>
                      <div className="space-y-2">
                        {foodsData.enjoy.filter(f => f.name.startsWith('A')).map((food) => (
                          <div 
                            key={food.name}
                            className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            <Leaf className="h-4 w-4 text-teal-500" />
                            <span className="text-slate-700">{food.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="supplements" className="mt-0">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {supplementsData.map((supplement) => (
                        <div 
                          key={supplement.name}
                          className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <Pill className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">{supplement.name}</h4>
                                <p className="text-sm text-slate-500">{supplement.dosage}</p>
                              </div>
                            </div>
                            <Badge 
                              className={supplement.priority === 'high' 
                                ? 'bg-rose-100 text-rose-700' 
                                : 'bg-amber-100 text-amber-700'
                              }
                            >
                              {supplement.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 pl-[52px]">
                            {supplement.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Your Action Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <button 
                  onClick={() => setActiveTab('foods')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeTab === 'foods' ? 'bg-teal-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Utensils className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-slate-900">Foods</p>
                    <p className="text-sm text-slate-500 truncate">Mackerel, Sardines, Herring...</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </button>
                
                <button 
                  onClick={() => setActiveTab('supplements')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeTab === 'supplements' ? 'bg-indigo-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Pill className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-slate-900">Supplements</p>
                    <p className="text-sm text-slate-500 truncate">Omega-3 Fatty Acids...</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
