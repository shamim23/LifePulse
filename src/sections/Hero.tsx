import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartPulse, Utensils, Pill, Dumbbell, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '100+', label: 'lab tests', sublabel: 'Total each year' },
    { value: 'Whole body', label: 'Tested 2x per year', sublabel: '' },
    { value: '৳82', label: 'per day', sublabel: '৳30,000 per year' },
  ];

  // Video Header Component
  const VideoHeader = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
      const video = videoRef.current;
      if (video) {
        video.play().catch(() => {
          // Auto-play was prevented, show play button
          setIsPlaying(false);
        });
      }
    }, []);

    const togglePlay = () => {
      const video = videoRef.current;
      if (video) {
        if (isPlaying) {
          video.pause();
        } else {
          video.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const toggleMute = () => {
      const video = videoRef.current;
      if (video) {
        video.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    return (
      <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 lg:pl-8">
        <div className="relative">
          {/* Main Video Container */}
          <div className="relative z-10 rounded-3xl shadow-2xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              src="/videos/hero-video.mov"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[500px] object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause size={18} className="text-[#242424]" />
                  ) : (
                    <Play size={18} className="text-[#242424] ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX size={18} className="text-[#242424]" />
                  ) : (
                    <Volume2 size={18} className="text-[#242424]" />
                  )}
                </button>
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#242424] shadow-lg">
                Watch how it works
              </div>
            </div>
          </div>

          {/* Floating Badge - Lab Locations */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 z-20 animate-float">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-[#242424]">50+</p>
                <p className="text-xs text-[#616161]">Lab Locations</p>
              </div>
            </div>
          </div>

          {/* Floating Badge - Health Score */}
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 z-20 animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <HeartPulse className="text-[#3e8cff]" size={24} />
              </div>
              <div>
                <p className="text-lg font-bold text-[#242424]">94%</p>
                <p className="text-xs text-[#616161]">Health Score</p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#8ccfff]/30 rounded-full blur-xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#3e8cff]/20 rounded-full blur-xl" />
        </div>
      </div>
    );
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-b from-[#8ccfff] via-[#c8e8ff] to-white overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#3e8cff]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-[#8ccfff]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative z-10 pt-16 lg:pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm 
                           text-[#242424] px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Now Available in Bangladesh
              </span>
            </div>

            {/* Headline */}
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#242424] leading-[1.1]">
                Your advanced{' '}
                <span className="text-[#3e8cff]">health check</span>
              </h1>
            </div>

            {/* Subheadline */}
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
              <p className="text-lg lg:text-xl text-[#616161] leading-relaxed max-w-lg">
                Every year. Starting with{' '}
                <span className="font-bold text-[#242424]">100+ lab tests</span>{' '}
                detecting 1000+ conditions. Just{' '}
                <span className="font-bold text-[#242424]">৳30,000</span> per year—
                <span className="font-bold text-[#242424]">৳82</span> per day.
              </p>
            </div>

            {/* CTA Button */}
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300">
              <Link
                to="/signup"
                className="inline-flex items-center gap-3 bg-[#242424] text-white px-8 py-4 
                         rounded-xl text-lg font-semibold hover:scale-[1.02] hover:shadow-xl 
                         transition-all duration-200 group"
              >
                Start testing
                <ArrowRight 
                  size={20} 
                  className="group-hover:translate-x-1 transition-transform" 
                />
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400">
              <div className="flex flex-wrap gap-6 lg:gap-10 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-left">
                    <div className="text-2xl lg:text-3xl font-bold text-[#242424]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#616161]">{stat.label}</div>
                    {stat.sublabel && (
                      <div className="text-xs text-[#929292]">{stat.sublabel}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Video Header */}
          <VideoHeader />
        </div>
      </div>

      {/* Testing is Easy Section - New Design */}
      <section className="bg-[#FDF8F0] py-20">
        <div className="container-custom">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-[#2D2D2D]">
              Testing is <span className="italic text-[#A8645A]">easy</span>
            </h2>
          </div>

          {/* Three Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Lab Tests */}
            <div className="bg-[#F5F0E8] rounded-3xl p-8 flex flex-col min-h-[420px]">
              <div className="text-center mb-6">
                <span className="text-[#A8645A] font-semibold text-lg">01</span>
                <h3 className="text-2xl font-serif text-[#2D2D2D] mt-2">160+ lab tests</h3>
                <p className="text-[#6B6B6B] text-sm mt-2">Schedule at top diagnostic centers across Bangladesh</p>
              </div>
              
              {/* Calendar UI */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-center gap-2 mb-4">
                  {['TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
                    <div 
                      key={day}
                      className={`w-12 h-16 rounded-xl flex flex-col items-center justify-center border-2 transition-all
                        ${i === 2 
                          ? 'bg-[#A8645A] border-[#A8645A] text-white shadow-lg' 
                          : 'bg-white border-[#E5E0D8] text-[#6B6B6B]'
                        }`}
                    >
                      <span className="text-[10px] font-medium">{day}</span>
                      <span className={`text-xl font-semibold ${i === 2 ? 'text-white' : 'text-[#2D2D2D]'}`}>
                        {5 + i}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Time Slots */}
                <div className="flex justify-center gap-2 flex-wrap">
                  {['8:50', '9:00', '9:10', '9:20', '9:30'].map((time, i) => (
                    <button
                      key={time}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                        ${i === 1 
                          ? 'bg-[#A8645A] text-white shadow-md' 
                          : 'bg-white text-[#6B6B6B] border border-[#E5E0D8] hover:border-[#A8645A]'
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Results Explained */}
            <div className="bg-[#F5F0E8] rounded-3xl p-8 flex flex-col min-h-[420px]">
              <div className="text-center mb-6">
                <span className="text-[#A8645A] font-semibold text-lg">02</span>
                <h3 className="text-2xl font-serif text-[#2D2D2D] mt-2">Results explained</h3>
                <p className="text-[#6B6B6B] text-sm mt-2">By top doctors and research teams</p>
              </div>
              
              {/* Chart UI */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-full max-w-[240px]">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-[#6B6B6B] py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-8 bg-[#A8645A]/30 rounded-full"></div>
                      <span>ABOVE<br/>RANGE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-10 bg-[#A8645A] rounded-full"></div>
                      <span>IN<br/>RANGE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-8 bg-[#A8645A]/30 rounded-full"></div>
                      <span>BELOW<br/>RANGE</span>
                    </div>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="ml-16 relative h-[180px]">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="border-t border-dashed border-[#D5D0C8]"></div>
                      ))}
                    </div>
                    
                    {/* Data points and line */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 180" preserveAspectRatio="none">
                      <line x1="40" y1="50" x2="100" y2="110" stroke="#A8645A" strokeWidth="2" />
                      <line x1="100" y1="110" x2="160" y2="90" stroke="#A8645A" strokeWidth="2" />
                      
                      <circle cx="40" cy="50" r="8" fill="#A8645A" />
                      <circle cx="100" cy="110" r="8" fill="#A8645A" />
                      <circle cx="160" cy="90" r="8" fill="#A8645A" />
                    </svg>
                    
                    {/* Value labels */}
                    <div className="absolute top-8 left-8 text-xs font-semibold text-[#2D2D2D]">16.7</div>
                    <div className="absolute top-[100px] left-[88px] text-xs font-semibold text-[#2D2D2D]">10.0</div>
                    <div className="absolute top-[70px] right-2 text-xs font-semibold text-[#2D2D2D]">12.5</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Follow Protocol */}
            <div className="bg-[#F5F0E8] rounded-3xl p-8 flex flex-col min-h-[420px]">
              <div className="text-center mb-6">
                <span className="text-[#A8645A] font-semibold text-lg">03</span>
                <h3 className="text-2xl font-serif text-[#2D2D2D] mt-2">Follow your protocol</h3>
                <p className="text-[#6B6B6B] text-sm mt-2">Take action. Test again.</p>
              </div>
              
              {/* Protocol Items */}
              <div className="flex-1 flex flex-col justify-center space-y-3">
                {/* Foods */}
                <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 bg-[#A8645A] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Utensils className="text-white" size={22} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[#2D2D2D] text-sm">Foods</h4>
                    <p className="text-[#6B6B6B] text-xs truncate">Wild Salmon, Organic Parsley...</p>
                  </div>
                </div>

                {/* Supplements */}
                <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 bg-[#A8645A] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Pill className="text-white" size={22} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[#2D2D2D] text-sm">Supplements</h4>
                    <p className="text-[#6B6B6B] text-xs truncate">Inositol, CoQ10, Vitamin D3...</p>
                  </div>
                </div>

                {/* Daily Health */}
                <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 bg-[#A8645A] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="text-white" size={22} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[#2D2D2D] text-sm">Daily health</h4>
                    <p className="text-[#6B6B6B] text-xs truncate">Stretching, muscle growth...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-[#A8645A] text-white px-8 py-4 
                       rounded-full text-base font-semibold hover:bg-[#955A52] 
                       transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Start testing
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center bg-transparent text-[#A8645A] px-8 py-4 
                       rounded-full text-base font-semibold border-2 border-[#A8645A]
                       hover:bg-[#A8645A] hover:text-white transition-all duration-200"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hero;
