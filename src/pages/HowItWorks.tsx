import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarCheck, 
  FileSearch, 
  HeartPulse, 
  TrendingUp,
  Check,
  ArrowRight,
  MapPin,
  Shield,
  Download,
  Clock,
  Activity
} from 'lucide-react';

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Schedule tests',
      subtitle: 'schedule tests',
      headline: 'Start with 100+ lab tests every year',
      description: 'Across your heart, hormones, kidneys, liver, thyroid, and more.',
      icon: CalendarCheck,
      color: 'from-blue-400 to-blue-600',
      features: [
        { icon: Check, text: '100+ lab tests included' },
        { icon: MapPin, text: '50+ lab locations to choose from' },
        { icon: Shield, text: 'No insurance needed' },
      ],
      cta: 'Start testing',
      ctaLink: '/signup',
    },
    {
      number: '02',
      title: 'Get insights',
      subtitle: 'get INSIGHTS',
      headline: 'Review results with expert analysis',
      description: 'Your results are reviewed by clinicians who look at your health history to surface what matters and what to do next.',
      icon: FileSearch,
      color: 'from-purple-400 to-purple-600',
      features: [
        { icon: Shield, text: 'Built to HIPAA-standards' },
        { icon: Activity, text: 'Deeper insights than average checkup' },
        { icon: Download, text: 'Download and share results' },
      ],
      cta: 'Unlock your insights',
      ctaLink: '/signup',
    },
    {
      number: '03',
      title: 'Take action',
      subtitle: 'take action',
      headline: 'Follow your personalized protocol',
      description: 'Test again to track progress and see how your body is changing.',
      icon: HeartPulse,
      color: 'from-green-400 to-green-600',
      features: [
        { icon: Check, text: '60+ lab tests included mid-year' },
        { icon: TrendingUp, text: 'See how your body is changing' },
        { icon: Clock, text: 'Retest anytime to track progress' },
      ],
      cta: 'Test your levels',
      ctaLink: '/signup',
    },
    {
      number: '04',
      title: 'Monitor for life',
      subtitle: 'monitor for life',
      headline: 'Spot patterns and red flags',
      description: 'Most testing starts after a problem. Function tracks your data over time to reveal patterns and early signs unique to you.',
      icon: TrendingUp,
      color: 'from-amber-400 to-amber-600',
      features: [
        { icon: Activity, text: 'Monitor for indicators of diseases' },
        { icon: TrendingUp, text: 'Spot trends as biomarkers change' },
        { icon: Clock, text: 'Get re-tests to track progress' },
      ],
      cta: 'Take action',
      ctaLink: '/signup',
    },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#8ccfff] via-[#c8e8ff] to-white pt-20 pb-16">
        <div className="container-custom text-center">
          <h1 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#242424] mb-6">
            How it <span className="text-[#3e8cff]">works</span>
          </h1>
          <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-lg lg:text-xl text-[#616161] max-w-2xl mx-auto">
            Your journey to better health in 4 simple steps
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    {/* Step Number & Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl lg:text-7xl font-extrabold text-[#e6e6e6]">
                        {step.number}
                      </span>
                      <div>
                        <span className="text-sm font-bold uppercase tracking-wider text-[#929292]">
                          STEP {step.number}
                        </span>
                        <span className="mx-2 text-[#929292]">•</span>
                        <span className={`text-sm font-bold uppercase tracking-wider bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                          {step.subtitle}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-2xl lg:text-4xl font-bold text-[#242424] mb-4">
                      {step.headline}
                    </h2>
                    <p className="text-lg text-[#616161] mb-8">
                      {step.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <div className={`w-8 h-8 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <feature.icon size={16} className="text-white" />
                          </div>
                          <span className="text-[#242424] font-medium">{feature.text}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to={step.ctaLink}
                      className={`inline-flex items-center gap-3 bg-gradient-to-r ${step.color} text-white 
                               px-8 py-4 rounded-xl text-lg font-semibold
                               hover:scale-[1.02] hover:shadow-lg transition-all duration-200 group`}
                    >
                      {step.cta}
                      <ArrowRight 
                        size={20} 
                        className="group-hover:translate-x-1 transition-transform" 
                      />
                    </Link>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="relative">
                      {/* Main Card */}
                      <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 relative z-10">
                        <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6`}>
                          <step.icon size={40} className="text-white" />
                        </div>

                        <h3 className="text-2xl font-bold text-[#242424] mb-4">
                          {step.title}
                        </h3>

                        {/* Mock Content based on step */}
                        {index === 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-[#f6f6f6] rounded-lg">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <MapPin size={18} className="text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-[#242424]">Popular Diagnostic</p>
                                <p className="text-xs text-[#929292]">Dhanmondi, Dhaka</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-[#f6f6f6] rounded-lg">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <CalendarCheck size={18} className="text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-[#242424]">Appointment Booked</p>
                                <p className="text-xs text-[#929292]">Tomorrow, 10:00 AM</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {index === 1 && (
                          <div className="space-y-3">
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Check size={16} className="text-green-600" />
                                <span className="font-semibold text-green-800">All Clear</span>
                              </div>
                              <p className="text-sm text-green-700">Your thyroid function is within normal range.</p>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Activity size={16} className="text-amber-600" />
                                <span className="font-semibold text-amber-800">Attention Needed</span>
                              </div>
                              <p className="text-sm text-amber-700">Vitamin D levels are slightly low. Consider supplementation.</p>
                            </div>
                          </div>
                        )}

                        {index === 2 && (
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-[#616161]">Protocol Completion</span>
                                <span className="font-semibold text-[#242424]">75%</span>
                              </div>
                              <div className="h-2 bg-[#e6e6e6] rounded-full overflow-hidden">
                                <div className="h-full w-[75%] bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#616161]">
                              <TrendingUp size={16} className="text-green-500" />
                              <span>Cholesterol improved by 15%</span>
                            </div>
                          </div>
                        )}

                        {index === 3 && (
                          <div className="space-y-3">
                            <div className="h-32 flex items-end gap-2">
                              {[40, 55, 45, 60, 50, 65, 70].map((height, i) => (
                                <div
                                  key={i}
                                  className="flex-1 bg-gradient-to-t from-[#8ccfff] to-[#3e8cff] rounded-t-lg"
                                  style={{ height: `${height}%` }}
                                />
                              ))}
                            </div>
                            <div className="flex justify-between text-xs text-[#929292]">
                              <span>Jan</span>
                              <span>Mar</span>
                              <span>Jun</span>
                              <span>Sep</span>
                              <span>Dec</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Decorative Elements */}
                      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${step.color} opacity-20 rounded-full blur-xl`} />
                      <div className={`absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br ${step.color} opacity-20 rounded-full blur-xl`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#f6f6f6] py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#242424] mb-6">
            Ready to take control of your health?
          </h2>
          <p className="text-lg text-[#616161] mb-8 max-w-2xl mx-auto">
            Join thousands of Bangladeshis who are already monitoring their health with Function.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 bg-[#242424] text-white 
                     px-10 py-5 rounded-xl text-lg font-bold
                     hover:scale-[1.02] hover:shadow-xl transition-all duration-200 group"
          >
            Start testing today
            <ArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
