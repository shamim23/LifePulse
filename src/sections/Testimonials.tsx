import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const testimonials = [
    {
      name: 'Rahman Ahmed',
      location: 'Dhaka',
      image: '/images/testimonial-1.jpg',
      rating: 5,
      title: 'Helped me identify health issues early',
      quote: 'Function helped me discover my thyroid issue before I even had symptoms. The detailed reports and doctor recommendations were invaluable. I have recommended it to my entire family.',
      result: 'Thyroid condition managed',
    },
    {
      name: 'Fatima Khan',
      location: 'Chittagong',
      image: '/images/testimonial-2.jpg',
      rating: 5,
      title: 'Best investment in my family\'s health',
      quote: 'I got Function for my parents and husband. The comprehensive testing caught my father\'s high cholesterol early. The convenience of testing at home and getting results online is amazing.',
      result: 'Family health optimized',
    },
    {
      name: 'Karim Hossain',
      location: 'Sylhet',
      image: '/images/testimonial-3.jpg',
      rating: 5,
      title: 'Found my vitamin deficiency',
      quote: 'I was always feeling tired but my regular checkups showed nothing. Function\'s comprehensive panel found severe Vitamin D and B12 deficiency. After following their protocol, my energy is back!',
      result: 'Energy levels restored',
    },
    {
      name: 'Nasrin Jahan',
      location: 'Rajshahi',
      image: '/images/testimonial-4.jpg',
      rating: 5,
      title: 'The detailed reports are incredible',
      quote: 'As a healthcare professional myself, I am impressed by the depth of testing and the clarity of reports. The doctor notes explain everything in simple terms. Worth every taka.',
      result: 'Complete health clarity',
    },
    {
      name: 'Mohammad Ali',
      location: 'Khulna',
      image: '/images/testimonial-5.jpg',
      rating: 5,
      title: 'Caught diabetes in pre-diabetes stage',
      quote: 'My HbA1c was in the pre-diabetic range. Function\'s early detection allowed me to make lifestyle changes before it became full diabetes. The retesting shows my progress.',
      result: 'Prevented diabetes onset',
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-3xl lg:text-5xl font-bold text-[#242424]">
              Real people.{' '}
              <span className="text-[#3e8cff]">Real results.</span>
            </h2>
            <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 mt-4 text-lg text-[#616161] max-w-xl">
              Join thousands of Bangladeshis who have taken control of their health with Function.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center
                       transition-all duration-200 ${
                         canScrollLeft
                           ? 'border-[#242424] text-[#242424] hover:bg-[#242424] hover:text-white'
                           : 'border-[#e6e6e6] text-[#929292] cursor-not-allowed'
                       }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center
                       transition-all duration-200 ${
                         canScrollRight
                           ? 'border-[#242424] text-[#242424] hover:bg-[#242424] hover:text-white'
                           : 'border-[#e6e6e6] text-[#929292] cursor-not-allowed'
                       }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 flex-shrink-0 w-[360px] md:w-[400px] snap-start"
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="bg-[#f6f6f6] rounded-3xl overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                {/* Real Person Image */}
                <div className="h-56 overflow-hidden">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  {/* Quote Icon */}
                  <Quote size={32} className="text-[#8ccfff] mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#242424] mb-3">
                    {testimonial.title}
                  </h3>

                  {/* Quote */}
                  <p className="text-[#616161] leading-relaxed flex-1 mb-6">
                    "{testimonial.quote}"
                  </p>

                  {/* Result Badge */}
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 
                                px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {testimonial.result}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[#e6e6e6]">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#8ccfff] to-[#3e8cff]">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#242424]">{testimonial.name}</p>
                      <p className="text-sm text-[#929292]">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
