import { useEffect, useRef } from 'react';
import { Activity, TrendingUp, Shield, Clock } from 'lucide-react';

const DiseaseMonitoring = () => {
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

  const diseases = [
    'Chronic kidney disease',
    'Diabetes',
    'Thyroid disorders',
    'Heart disease',
    'Liver disease',
    'Cancer markers',
    'Hormonal imbalances',
    'Autoimmune conditions',
    'Nutritional deficiencies',
    'Infectious diseases',
    'PCOS',
    'Prostate issues',
    'Anemia',
    'Bone disorders',
    'Metabolic syndrome',
  ];

  const features = [
    {
      icon: Activity,
      title: 'Establish your baseline',
      description: 'Create a comprehensive health profile that serves as your reference point.',
    },
    {
      icon: TrendingUp,
      title: 'Tracked for life',
      description: 'Your health data is securely stored and accessible anytime, anywhere.',
    },
    {
      icon: Shield,
      title: 'Early detection',
      description: 'Catch potential health issues before they become serious problems.',
    },
    {
      icon: Clock,
      title: 'Monitor changes',
      description: 'See how your body changes over time with regular testing.',
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white section-padding overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-3xl lg:text-5xl font-bold text-[#242424] mb-6">
            Monitor early indicators of{' '}
            <span className="text-[#3e8cff]">1000s of diseases</span>
          </h2>
        </div>

        {/* Visual + Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Real Medical Image */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/modern-healthcare.jpg" 
                  alt="Modern healthcare facility"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                    <Shield className="text-red-500" size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#242424]">85%</p>
                    <p className="text-sm text-[#616161]">Early Detection Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="order-1 lg:order-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-center sm:text-left p-6 rounded-2xl bg-[#f6f6f6] hover:bg-white hover:shadow-lg transition-all duration-300 group"
                  style={{ transitionDelay: `${100 + index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#8ccfff] to-[#3e8cff] rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#242424] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#616161]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disease Tags Marquee */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Marquee Container */}
            <div className="overflow-hidden py-4">
              <div className="flex animate-marquee hover:[animation-play-state:paused]">
                {/* First set */}
                {diseases.map((disease, index) => (
                  <span
                    key={`first-${index}`}
                    className="inline-flex items-center px-5 py-2.5 mx-2 bg-[#f6f6f6] 
                             rounded-full text-sm font-medium text-[#616161] whitespace-nowrap
                             hover:bg-[#e6e6e6] transition-colors cursor-default"
                  >
                    {disease}
                  </span>
                ))}
                {/* Duplicate for seamless loop */}
                {diseases.map((disease, index) => (
                  <span
                    key={`second-${index}`}
                    className="inline-flex items-center px-5 py-2.5 mx-2 bg-[#f6f6f6] 
                             rounded-full text-sm font-medium text-[#616161] whitespace-nowrap
                             hover:bg-[#e6e6e6] transition-colors cursor-default"
                  >
                    {disease}
                  </span>
                ))}
              </div>
            </div>

            {/* Second Row - Reverse Direction */}
            <div className="overflow-hidden py-4">
              <div 
                className="flex hover:[animation-play-state:paused]"
                style={{
                  animation: 'marquee 35s linear infinite reverse',
                }}
              >
                {/* First set - reversed order */}
                {[...diseases].reverse().map((disease, index) => (
                  <span
                    key={`third-${index}`}
                    className="inline-flex items-center px-5 py-2.5 mx-2 bg-[#f6f6f6] 
                             rounded-full text-sm font-medium text-[#616161] whitespace-nowrap
                             hover:bg-[#e6e6e6] transition-colors cursor-default"
                  >
                    {disease}
                  </span>
                ))}
                {/* Duplicate */}
                {[...diseases].reverse().map((disease, index) => (
                  <span
                    key={`fourth-${index}`}
                    className="inline-flex items-center px-5 py-2.5 mx-2 bg-[#f6f6f6] 
                             rounded-full text-sm font-medium text-[#616161] whitespace-nowrap
                             hover:bg-[#e6e6e6] transition-colors cursor-default"
                  >
                    {disease}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseaseMonitoring;
