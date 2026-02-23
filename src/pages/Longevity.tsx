import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Hourglass, 
  Heart, 
  Brain, 
  Activity, 
  Dna, 
  TrendingUp,
  Shield,
  Leaf,
  Zap,
  Moon,
  Beaker,
  Target,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Info
} from 'lucide-react';

const LongevityPage = () => {
  const [activeTab, setActiveTab] = useState('biomarkers');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const biomarkers = [
    {
      category: 'Cellular Aging',
      icon: <Dna className="w-5 h-5" />,
      tests: [
        { name: 'Telomere Length', description: 'Measures cellular replicative capacity', frequency: 'Annually' },
        { name: 'DNA Methylation', description: 'Epigenetic clock for biological age', frequency: 'Annually' },
        { name: 'Senescence Markers', description: 'Zombie cell accumulation', frequency: 'Bi-annually' }
      ]
    },
    {
      category: 'Metabolic Health',
      icon: <Activity className="w-5 h-5" />,
      tests: [
        { name: 'HbA1c & Glucose', description: 'Long-term glucose control', frequency: 'Quarterly' },
        { name: 'Insulin Sensitivity', description: 'HOMA-IR and fasting insulin', frequency: 'Quarterly' },
        { name: 'Lipid Panel', description: 'Advanced cholesterol profiling', frequency: 'Bi-annually' }
      ]
    },
    {
      category: 'Inflammation',
      icon: <Shield className="w-5 h-5" />,
      tests: [
        { name: 'hs-CRP', description: 'Systemic inflammation marker', frequency: 'Quarterly' },
        { name: 'IL-6', description: 'Pro-inflammatory cytokine', frequency: 'Bi-annually' },
        { name: 'TNF-alpha', description: 'Chronic inflammation indicator', frequency: 'Bi-annually' }
      ]
    },
    {
      category: 'Organ Function',
      icon: <Heart className="w-5 h-5" />,
      tests: [
        { name: 'GFR & Creatinine', description: 'Kidney function assessment', frequency: 'Bi-annually' },
        { name: 'Liver Enzymes', description: 'ALT, AST, GGT levels', frequency: 'Bi-annually' },
        { name: 'NT-proBNP', description: 'Cardiac stress marker', frequency: 'Annually' }
      ]
    }
  ];

  const interventions = [
    {
      title: 'Nutritional Optimization',
      icon: <Leaf className="w-6 h-6" />,
      description: 'Personalized nutrition plans based on your metabolic profile and genetic markers.',
      actions: ['Caloric restriction mimetics', 'Intermittent fasting protocols', 'Micronutrient optimization'],
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Exercise Prescription',
      icon: <Zap className="w-6 h-6" />,
      description: 'Targeted exercise protocols to maintain muscle mass and cardiovascular health.',
      actions: ['Zone 2 cardio optimization', 'Resistance training protocols', 'VO2 max improvement'],
      color: 'from-orange-400 to-red-500'
    },
    {
      title: 'Sleep Enhancement',
      icon: <Moon className="w-6 h-6" />,
      description: 'Science-backed strategies to improve sleep quality and recovery.',
      actions: ['Sleep hygiene protocols', 'Circadian rhythm optimization', 'REM sleep enhancement'],
      color: 'from-indigo-400 to-purple-500'
    },
    {
      title: 'Stress Management',
      icon: <Brain className="w-6 h-6" />,
      description: 'Cognitive and emotional health strategies for longevity.',
      actions: ['Meditation & mindfulness', 'Cognitive training', 'Social connection protocols'],
      color: 'from-blue-400 to-cyan-500'
    }
  ];

  const faqs = [
    {
      question: 'What is biological age and how is it different from chronological age?',
      answer: 'Biological age reflects how old your body appears to be based on biomarkers, cellular health, and organ function, while chronological age is simply the number of years you\'ve lived. Through lifestyle interventions, you can lower your biological age below your chronological age, indicating healthier aging.'
    },
    {
      question: 'How often should I test my longevity biomarkers?',
      answer: 'Core biomarkers like inflammation markers and metabolic panels should be tested quarterly. Comprehensive panels including telomere length and DNA methylation are recommended annually. We create a personalized testing schedule based on your baseline results and health goals.'
    },
    {
      question: 'Can I really reverse my biological age?',
      answer: 'Research shows that biological age can be reversed through targeted lifestyle interventions. Studies demonstrate reductions of 3-5 years in biological age within 8-12 weeks of implementing comprehensive longevity protocols including diet, exercise, sleep, and stress management changes.'
    },
    {
      question: 'What makes LifePulse\'s longevity program different?',
      answer: 'Our program combines comprehensive biomarker testing with personalized interventions tailored to your unique biological profile. We track 100+ biomarkers, provide actionable protocols, and continuously monitor your progress to optimize your healthspan.'
    },
    {
      question: 'Is this program suitable for all ages?',
      answer: 'Yes! While it\'s never too early to start focusing on longevity, we recommend starting in your 30s or 40s for optimal prevention. However, significant benefits can be achieved at any age through our personalized protocols.'
    }
  ];

  const stats = [
    { value: '5+', label: 'Years reduced', sublabel: 'Average biological age reversal' },
    { value: '100+', label: 'Biomarkers', sublabel: 'Tracked continuously' },
    { value: '89%', label: 'Success rate', sublabel: 'Members improve healthspan' },
    { value: '24/7', label: 'Monitoring', sublabel: 'Wearable integration' }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#242424] via-[#2a2a2a] to-[#1a1a1a] pt-24 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 
                           px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Hourglass className="w-4 h-4" />
              Longevity Science
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Extend Your{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Healthspan
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Science-backed longevity program combining advanced biomarker testing with 
              personalized interventions to help you live longer, healthier, and more vibrant life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white 
                         px-8 py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-200
                         hover:scale-[1.02] hover:shadow-lg"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => document.getElementById('biomarkers')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white 
                         px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="container-custom py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-emerald-400 font-medium">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#242424] mb-4">
              Your Longevity Journey
            </h2>
            <p className="text-lg text-[#616161]">
              A comprehensive approach to optimizing your biological age and extending healthspan
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Assess', description: 'Comprehensive biomarker testing to establish your baseline biological age', icon: <Beaker className="w-6 h-6" /> },
              { step: '02', title: 'Analyze', description: 'AI-powered analysis of 100+ biomarkers to identify optimization opportunities', icon: <Target className="w-6 h-6" /> },
              { step: '03', title: 'Act', description: 'Personalized intervention protocols targeting your specific biomarker profile', icon: <Zap className="w-6 h-6" /> },
              { step: '04', title: 'Track', description: 'Continuous monitoring and quarterly retesting to measure progress', icon: <TrendingUp className="w-6 h-6" /> }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold text-gray-100">{item.step}</span>
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#242424] mb-3">{item.title}</h3>
                  <p className="text-[#616161]">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biomarkers Section */}
      <section id="biomarkers" className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#242424] mb-4">
                Comprehensive Biomarker Panel
              </h2>
              <p className="text-lg text-[#616161] mb-8">
                We track the key biomarkers scientifically proven to predict longevity and healthspan. 
                Our panel goes far beyond standard blood tests.
              </p>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#242424] mb-2">Why These Biomarkers?</h4>
                    <p className="text-sm text-[#616161]">
                      Each biomarker is selected based on peer-reviewed research linking it to aging, 
                      disease risk, and overall longevity. We track both standard metrics and advanced 
                      markers not typically included in regular checkups.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                View Your Biomarkers
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="space-y-4">
              {biomarkers.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setActiveTab(activeTab === `cat-${index}` ? '' : `cat-${index}`)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                        {category.icon}
                      </div>
                      <span className="font-semibold text-[#242424]">{category.category}</span>
                    </div>
                    {activeTab === `cat-${index}` ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {activeTab === `cat-${index}` && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 pt-4 space-y-4">
                        {category.tests.map((test, testIndex) => (
                          <div key={testIndex} className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-[#242424]">{test.name}</div>
                              <div className="text-sm text-[#616161]">{test.description}</div>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {test.frequency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interventions Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#242424] mb-4">
              Personalized Interventions
            </h2>
            <p className="text-lg text-[#616161]">
              Evidence-based protocols tailored to your unique biomarker profile and biological age
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {interventions.map((intervention, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 
                              hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${intervention.color} 
                                flex items-center justify-center text-white mb-6
                                group-hover:scale-110 transition-transform duration-300`}>
                    {intervention.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#242424] mb-3">{intervention.title}</h3>
                  <p className="text-[#616161] mb-6">{intervention.description}</p>
                  <ul className="space-y-3">
                    {intervention.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-center gap-3 text-sm text-[#242424]">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#242424] text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-[#242424] pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-[#616161] leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Start Your Longevity Journey Today
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-8">
            Join thousands who are taking control of their aging process and optimizing their healthspan 
            with science-backed longevity medicine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 
                       rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200
                       hover:scale-[1.02] hover:shadow-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 bg-emerald-600/30 text-white px-8 py-4 
                       rounded-xl font-semibold hover:bg-emerald-600/40 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LongevityPage;
