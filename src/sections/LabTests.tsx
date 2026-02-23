import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const LabTests = () => {
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

  const categories = [
    {
      title: 'Hormones\n& thyroid',
      count: '10',
      tests: [
        'Thyroxine (T4) Free',
        'Thyroglobulin Antibodies (TgAb)',
        'Testosterone, Total',
        'Anti-Müllerian Hormone',
      ],
    },
    {
      title: 'Cancer & other\nsilent risks',
      count: '34',
      tests: [
        'GRAIL Cancer Test',
        'Prostate Specific Antigen (PSA), Total',
        'Rheumatoid Factor (RF)',
        'Mercury',
      ],
    },
    {
      title: 'Heart\n& metabolic',
      count: '18',
      tests: [
        'LDL Small',
        'Lipoprotein (a)',
        'Apolipoprotein B (ApoB)',
        'Omega-3 Total',
        'Insulin',
      ],
    },
    {
      title: 'Aging',
      count: '25',
      tests: [
        'Sex Hormone Binding Globulin (SHBG)',
        'DHEA-Sulfate',
        'Insulin-like Growth Factor (IGF-1)',
        'Homocysteine',
      ],
    },
    {
      title: 'Mental health\n& focus',
      count: '36',
      tests: [
        'Cortisol',
        'High-Sensitivity C-Reactive Protein (hs-CRP)',
        'Iron',
        'Ferritin',
        'Methylmalonic Acid (MMA) (B12 Marker)',
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#FDF8F0] py-20 lg:py-28">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-3xl lg:text-5xl font-serif text-[#2D2D2D]">
            160+ lab tests <span className="italic text-[#A8645A]">chosen by top doctors</span>
          </h2>

          {/* Testimonial */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 flex items-center justify-center gap-4 mt-8">
            <p className="text-[#6B6B6B] text-sm max-w-xs text-left">
              <span className="text-[#2D2D2D]">"</span>
              The most powerful approach I've seen in my career. Uncompromising depth with no shortcuts.
              <span className="text-[#2D2D2D]">"</span>
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E5E0D8] overflow-hidden">
                <img 
                  src="/images/doctor-avatar.jpg" 
                  alt="Doctor avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="w-full h-full bg-[#A8645A]/20 flex items-center justify-center">
                  <span className="text-[#A8645A] font-semibold text-sm">MH</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-[#2D2D2D] font-semibold text-sm">Mark Hyman, M.D.</p>
                <p className="text-[#6B6B6B] text-xs">Former Cleveland Clinic physician</p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
          <div className="grid md:grid-cols-3 relative">
            {/* Vertical Dividers */}
            <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-[#E5E0D8]" />
            <div className="hidden md:block absolute left-2/3 top-0 bottom-0 w-px bg-[#E5E0D8]" />
            
            {/* Horizontal Divider */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-[#E5E0D8]" />

            {categories.map((category, index) => (
              <div 
                key={index}
                className="p-8 lg:p-10"
              >
                <h3 className="text-xl lg:text-2xl font-serif text-[#2D2D2D] whitespace-pre-line leading-tight mb-2">
                  {category.title}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-3 bg-[#A8645A] rounded-sm" />
                    <div className="w-1 h-3 bg-[#A8645A] rounded-sm" />
                  </div>
                  <span className="text-[#A8645A] text-xs font-medium">{category.count} Biomarkers</span>
                </div>
                
                <ul className="space-y-2">
                  {category.tests.map((test, testIndex) => (
                    <li 
                      key={testIndex}
                      className="text-[#6B6B6B] text-sm leading-relaxed"
                    >
                      {test}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* More Card */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-[#A8645A] font-medium mb-2">+More</p>
              <h3 className="text-xl lg:text-2xl font-serif italic text-[#A8645A] mb-6">
                All-in-one<br />lab testing
              </h3>
              <Link
                to="/what-we-test"
                className="inline-flex items-center justify-center w-fit px-6 py-2.5 rounded-full border-2 border-[#A8645A] text-[#A8645A] text-sm font-semibold hover:bg-[#A8645A] hover:text-white transition-all duration-200"
              >
                See all tests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabTests;
