import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Hourglass, 
  Heart, 
  Brain, 
  Activity, 
  Dna, 
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const Longevity = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [biologicalAge, setBiologicalAge] = useState(35);
  const [chronologicalAge] = useState(42);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Animate biological age counter
  useEffect(() => {
    const targetAge = 35;
    const startAge = 45;
    let current = startAge;
    const duration = 2000;
    const steps = 60;
    const increment = (startAge - targetAge) / steps;
    
    const timer = setInterval(() => {
      current -= increment;
      if (current <= targetAge) {
        setBiologicalAge(targetAge);
        clearInterval(timer);
      } else {
        setBiologicalAge(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const longevityMetrics = [
    {
      icon: <Dna className="w-6 h-6" />,
      title: 'Telomere Length',
      value: '7.2 kb',
      status: 'optimal',
      description: 'Cellular aging marker'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Inflammation Score',
      value: 'Low',
      status: 'excellent',
      description: 'C-reactive protein levels'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Heart Age',
      value: '32 yrs',
      status: 'optimal',
      description: 'Cardiovascular health'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Cognitive Reserve',
      value: 'High',
      status: 'excellent',
      description: 'Brain health indicator'
    }
  ];

  const longevityPillars = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Preventive Screening',
      description: 'Early detection of age-related diseases through comprehensive biomarker analysis',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Cellular Optimization',
      description: 'Targeted interventions to support mitochondrial health and cellular repair',
      color: 'from-violet-400 to-purple-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Metabolic Mastery',
      description: 'Optimize glucose regulation, insulin sensitivity, and metabolic flexibility',
      color: 'from-amber-400 to-orange-500'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Sleep & Recovery',
      description: 'Enhance restorative sleep patterns for optimal cellular regeneration',
      color: 'from-blue-400 to-indigo-500'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white via-[#f8fafc] to-white overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 
                           text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Hourglass className="w-4 h-4" />
              Longevity Science
            </span>
          </div>
          
          <h2 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100
                       text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
            Live Longer, Live{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Better
            </span>
          </h2>
          
          <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200
                      text-lg text-[#616161] leading-relaxed">
            Advanced biomarker testing meets longevity science. Track your biological age, 
            optimize your healthspan, and add quality years to your life.
          </p>
        </div>

        {/* Biological Age Calculator Card */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 mb-20">
          <div className="bg-gradient-to-br from-[#242424] to-[#3a3a3a] rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Age Display */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Your Biological Age</h3>
                <p className="text-gray-400 mb-8">Based on 100+ biomarkers and epigenetic markers</p>
                
                <div className="flex items-center justify-center lg:justify-start gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-6xl lg:text-7xl font-bold text-white mb-2">
                      {biologicalAge}
                    </div>
                    <div className="text-emerald-400 font-medium">Biological</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-0.5 bg-gray-600 mb-2" />
                    <span className="text-emerald-400 text-sm font-bold">-{chronologicalAge - biologicalAge} yrs</span>
                    <div className="w-16 h-0.5 bg-gray-600 mt-2" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl lg:text-7xl font-bold text-gray-500 mb-2">
                      {chronologicalAge}
                    </div>
                    <div className="text-gray-400 font-medium">Chronological</div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 
                              px-4 py-2 rounded-full text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  You're aging slower than average
                </div>
              </div>

              {/* Right - Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {longevityMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10
                             hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center
                                    text-emerald-400">
                        {metric.icon}
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full
                        ${metric.status === 'excellent' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-blue-500/20 text-blue-400'}`}>
                        {metric.status}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-400 mb-1">{metric.title}</div>
                    <div className="text-xs text-gray-500">{metric.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Longevity Pillars */}
        <div className="mb-16">
          <h3 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700
                       text-2xl font-bold text-center text-[#242424] mb-10">
            The Four Pillars of Longevity
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {longevityPillars.map((pillar, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 group"
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 
                              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} 
                                flex items-center justify-center text-white mb-5
                                group-hover:scale-110 transition-transform duration-300`}>
                    {pillar.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#242424] mb-3">{pillar.title}</h4>
                  <p className="text-sm text-[#616161] leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Unlock Your Longevity Potential?
            </h3>
            <p className="text-emerald-100 max-w-2xl mx-auto mb-8">
              Join thousands optimizing their healthspan with personalized longevity protocols 
              based on comprehensive biomarker analysis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/longevity"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 
                         rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200
                         hover:scale-[1.02] hover:shadow-lg group"
              >
                Explore Longevity Program
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-emerald-600/30 text-white px-8 py-4 
                         rounded-xl font-semibold hover:bg-emerald-600/40 transition-all duration-200"
              >
                View Your Metrics
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Longevity;
