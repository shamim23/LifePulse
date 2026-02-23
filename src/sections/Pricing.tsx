import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const Pricing = () => {
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

  const features = [
    '100+ lab tests annually',
    'Testing 2x/year and on-demand',
    'Insights from top doctors',
    'All-in-one for your whole body',
    'Tracked in one secure place',
    'Clinicians review every result',
    'Personalized health protocol',
    'Add scans anytime',
    'No insurance, transparent pricing',
  ];

  const comparisonFeatures = [
    { feature: 'Lab tests annually', function: '100+', standard: '~15' },
    { feature: 'Testing frequency', function: '2x/year', standard: '1x/year' },
    { feature: 'Personalized protocol', function: 'Yes', standard: 'No' },
    { feature: 'Doctor insights', function: 'Included', standard: 'Extra cost' },
    { feature: 'Price', function: '৳30,000', standard: '৳15,000-50,000' },
  ];

  return (
    <section ref={sectionRef} className="bg-white section-padding">
      <div className="container-custom">
        {/* Pricing Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-3xl lg:text-5xl font-bold text-[#242424] mb-4">
            What could cost you{' '}
            <span className="text-[#929292] line-through">৳150,000</span>
            <br />
            is <span className="text-[#3e8cff]">৳30,000</span>
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-lg text-[#616161]">
            Your health shouldn't depend on insurance.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-[#242424] to-[#3a3a3a] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3e8cff]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8ccfff]/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                            px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Sparkles size={16} className="text-[#8ccfff]" />
                Most Popular Plan
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left - Price */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl lg:text-7xl font-extrabold">৳82</span>
                    <span className="text-xl text-white/70">/day</span>
                  </div>
                  <p className="text-white/70 mb-6">
                    Charged annually at ৳30,000
                  </p>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-3 bg-[#8ccfff] text-[#242424] 
                             px-8 py-4 rounded-xl text-lg font-bold
                             hover:scale-[1.02] hover:shadow-lg transition-all duration-200 group"
                  >
                    Join Function
                    <ArrowRight 
                      size={20} 
                      className="group-hover:translate-x-1 transition-transform" 
                    />
                  </Link>
                </div>

                {/* Right - Features */}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
                    What's included
                  </p>
                  <ul className="space-y-3">
                    {features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#8ccfff] rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-[#242424]" />
                        </div>
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Features List */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 max-w-3xl mx-auto mb-20">
          <h3 className="text-xl font-bold text-[#242424] mb-6 text-center">
            Everything you get with Function
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-[#f6f6f6] rounded-xl">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-white" />
                </div>
                <span className="text-[#242424] font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400">
          <h3 className="text-2xl font-bold text-[#242424] mb-8 text-center">
            Not your average checkup
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto">
              <thead>
                <tr className="border-b-2 border-[#242424]">
                  <th className="text-left py-4 px-4 font-bold text-[#242424]">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-[#3e8cff]">Function</th>
                  <th className="text-center py-4 px-4 font-bold text-[#929292]">Standard Checkup</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr key={index} className="border-b border-[#e6e6e6]">
                    <td className="py-4 px-4 text-[#616161]">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-2 font-semibold text-[#242424]">
                        {row.function === 'Yes' || row.function === 'Included' ? (
                          <Check size={18} className="text-green-500" />
                        ) : null}
                        {row.function}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-[#929292]">{row.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final CTA */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500 text-center mt-16">
          <p className="text-2xl lg:text-3xl font-bold text-[#242424] mb-6">
            Life is short? <span className="text-[#3e8cff]">We disagree.</span>
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 bg-[#242424] text-white 
                     px-10 py-5 rounded-xl text-lg font-bold
                     hover:scale-[1.02] hover:shadow-xl transition-all duration-200 group"
          >
            Start testing
            <ArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
