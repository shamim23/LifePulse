import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    setEmail('');
  };

  const companyLinks = [
    { name: 'Join Function', href: '/signup' },
    { name: 'Login', href: '/login' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact us', href: '/contact' },
  ];

  const exploreLinks = [
    { name: 'What we test', href: '/what-we-test' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Lab locations', href: '/lab-locations' },
    { name: 'FAQ', href: '/faq' },
  ];

  const communityLinks = [
    { name: 'Gift Function', href: '/gift' },
    { name: 'For employers', href: '/employers' },
    { name: 'For doctors', href: '/doctors' },
    { name: 'Share your story', href: '/share-story' },
  ];

  return (
    <footer className="bg-[#242424] text-white">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Function Bangladesh
            </Link>
            <p className="mt-4 text-[#929292] text-base max-w-sm">
              Advanced health screening for everyone. 100+ lab tests, expert insights, 
              and personalized protocols.
            </p>
            
            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-sm font-semibold mb-3">Subscribe for health tips</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 
                           text-white placeholder:text-white/50 focus:outline-none 
                           focus:border-[#8ccfff] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#8ccfff] text-[#242424] px-4 py-3 rounded-lg 
                           hover:bg-[#7bc4f5] transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#929292] hover:text-[#8ccfff] transition-colors text-[15px]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#929292] hover:text-[#8ccfff] transition-colors text-[15px]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#929292] hover:text-[#8ccfff] transition-colors text-[15px]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#929292] hover:text-[#8ccfff] hover:scale-110 transition-all"
              >
                <Facebook size={22} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#929292] hover:text-[#8ccfff] hover:scale-110 transition-all"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#929292] hover:text-[#8ccfff] hover:scale-110 transition-all"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#929292] hover:text-[#8ccfff] hover:scale-110 transition-all"
              >
                <Youtube size={22} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-[#929292] text-sm text-center">
              © 2026 Function Health Bangladesh. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <Link
                to="/privacy-policy"
                className="text-[#929292] hover:text-[#8ccfff] transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-[#929292] hover:text-[#8ccfff] transition-colors text-sm"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
