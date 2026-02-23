import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'How it works', href: '/how-it-works' },
    { name: 'What we test', href: '/what-we-test' },
    { name: 'Scans', href: '/scans' },
    { name: 'FAQ', href: '/faq' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#242424] text-white text-center py-2.5 px-4">
        <Link 
          to="/signup" 
          className="text-sm font-medium hover:underline transition-all"
        >
          Use your health savings to join Function Bangladesh
        </Link>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-bold text-[#242424] hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Function
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-[15px] font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-[#3e8cff]'
                      : 'text-[#242424] hover:text-[#3e8cff]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/login"
                className="text-[15px] font-medium text-[#242424] hover:text-[#3e8cff] transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-[#242424] text-white px-6 py-2.5 rounded-lg text-[15px] font-semibold
                         hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
              >
                Start testing
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#242424] hover:bg-[#f6f6f6] rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-[112px] bg-white border-t border-[#e6e6e6] 
                     transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="container-custom py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 ${
                    isActive(link.href)
                      ? 'text-[#3e8cff]'
                      : 'text-[#242424]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-[#e6e6e6] my-2" />
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-[#242424] py-2"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#242424] text-white px-6 py-3 rounded-lg text-lg font-semibold
                         text-center mt-2"
              >
                Start testing
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
