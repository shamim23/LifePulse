import { useEffect, useRef } from 'react';
import { Award, GraduationCap, Stethoscope } from 'lucide-react';

const MedicalBoard = () => {
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

  const doctors = [
    {
      name: 'Dr. Ahsan Habib',
      title: 'Chief of Cardiology',
      institution: 'BSMMU, Dhaka',
      specialty: 'Preventive Cardiology',
      image: '/images/doctor-1.jpg',
    },
    {
      name: 'Dr. Farhana Rahman',
      title: 'Endocrinology Specialist',
      institution: 'Square Hospital, Dhaka',
      specialty: 'Hormonal Disorders',
      image: '/images/doctor-2.jpg',
    },
    {
      name: 'Dr. Kamal Uddin',
      title: 'Pathology Expert',
      institution: 'LabAid Diagnostics',
      specialty: 'Laboratory Medicine',
      image: '/images/doctor-3.jpg',
    },
    {
      name: 'Dr. Shahana Alam',
      title: "Women's Health Specialist",
      institution: 'Apollo Hospital, Dhaka',
      specialty: 'Gynecological Health',
      image: '/images/doctor-4.jpg',
    },
    {
      name: 'Dr. Mohammad Ali',
      title: 'Internal Medicine',
      institution: 'United Hospital, Dhaka',
      specialty: 'Comprehensive Care',
      image: '/images/doctor-1.jpg',
    },
    {
      name: 'Dr. Nusrat Jahan',
      title: 'Laboratory Medicine',
      institution: 'Ibn Sina Diagnostic',
      specialty: 'Clinical Pathology',
      image: '/images/doctor-2.jpg',
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#f6f6f6] section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-3xl lg:text-5xl font-bold text-[#242424] mb-4">
            Built with Bangladesh's{' '}
            <span className="text-[#3e8cff]">top doctors</span>
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-lg text-[#616161]">
            Function's Medical & Scientific Board
          </p>
        </div>

        {/* Doctors Grid with Real Photos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 group"
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl overflow-hidden h-full hover:shadow-xl hover:-translate-y-2 
                            transition-all duration-300">
                {/* Doctor Photo */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Stethoscope icon */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Stethoscope className="text-[#3e8cff]" size={20} />
                    </div>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#242424]">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-[#3e8cff] font-medium">
                      {doctor.title}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 pt-4 border-t border-[#e6e6e6]">
                    <div className="flex items-center gap-2 text-sm text-[#616161]">
                      <GraduationCap size={16} className="text-[#929292]" />
                      {doctor.institution}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#616161]">
                      <Award size={16} className="text-[#929292]" />
                      {doctor.specialty}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-700 mt-16">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#242424]">50+</div>
                <div className="text-sm text-[#616161]">Lab locations</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-[#e6e6e6]" />
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#242424]">100K+</div>
                <div className="text-sm text-[#616161]">Tests completed</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-[#e6e6e6]" />
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#242424]">ISO</div>
                <div className="text-sm text-[#616161]">Certified labs</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-[#e6e6e6]" />
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#242424]">4.9</div>
                <div className="text-sm text-[#616161]">Customer rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalBoard;
