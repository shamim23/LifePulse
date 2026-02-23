import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  MessageCircle,
  HelpCircle,
  Apple,
  Smartphone
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, show error
      setError('Invalid email or password. Please try again.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#242424] to-[#3a3a3a] 
                    flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#8ccfff] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3e8cff] rounded-full blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link 
            to="/" 
            className="text-3xl font-bold text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Function Bangladesh
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold text-white mb-6">
            Your health journey starts here
          </h2>
          <p className="text-lg text-white/70">
            Access your comprehensive health reports, track your progress, 
            and get personalized insights from top doctors.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          <div>
            <div className="text-3xl font-bold text-white">100K+</div>
            <div className="text-sm text-white/60">Tests completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-sm text-white/60">Lab locations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">4.9</div>
            <div className="text-sm text-white/60">Customer rating</div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-6">
          <Link 
            to="/" 
            className="text-2xl font-bold text-[#242424]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Function Bangladesh
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-3xl font-bold text-[#242424] mb-2">
              Welcome back
            </h1>
            <p className="text-[#616161] mb-8">
              Sign in to access your health dashboard
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-[#242424] mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3.5 bg-white border border-[#e6e6e6] rounded-xl
                           text-[#242424] placeholder:text-[#929292]
                           focus:outline-none focus:border-[#3e8cff] focus:ring-2 focus:ring-[#3e8cff]/20
                           transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-[#242424] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3.5 bg-white border border-[#e6e6e6] rounded-xl
                             text-[#242424] placeholder:text-[#929292]
                             focus:outline-none focus:border-[#3e8cff] focus:ring-2 focus:ring-[#3e8cff]/20
                             transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#929292]
                             hover:text-[#616161] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#242424] text-white py-4 rounded-xl font-semibold
                         hover:scale-[1.01] hover:shadow-lg transition-all duration-200
                         disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Log in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Reset Password */}
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-[#3e8cff] hover:underline"
              >
                Reset password
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e6e6e6]" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-[#f6f6f6] text-sm text-[#929292]">
                  or
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mb-8">
              <p className="text-[#616161]">
                Not a member yet?{' '}
                <Link 
                  to="/signup" 
                  className="text-[#3e8cff] font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Help Links */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link 
                to="/faq" 
                className="flex items-center gap-2 text-[#616161] hover:text-[#3e8cff] transition-colors"
              >
                <HelpCircle size={16} />
                FAQs
              </Link>
              <button 
                type="button"
                className="flex items-center gap-2 text-[#616161] hover:text-[#3e8cff] transition-colors"
              >
                <MessageCircle size={16} />
                Open a chat
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-12 lg:px-16 py-6 border-t border-[#e6e6e6]">
          <div className="max-w-md mx-auto">
            {/* App Download */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <a
                href="#"
                className="flex items-center gap-2 bg-[#242424] text-white px-4 py-2.5 rounded-lg
                         hover:opacity-90 transition-opacity"
              >
                <Apple size={20} />
                <div className="text-left">
                  <div className="text-[10px] leading-none">Download on the</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-[#242424] text-white px-4 py-2.5 rounded-lg
                         hover:opacity-90 transition-opacity"
              >
                <Smartphone size={20} />
                <div className="text-left">
                  <div className="text-[10px] leading-none">Get it on</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center justify-center gap-6 text-sm text-[#929292]">
              <Link to="/privacy-policy" className="hover:text-[#3e8cff] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-[#3e8cff] transition-colors">
                Terms & Conditions
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-center text-xs text-[#929292] mt-4">
              © 2026 Function Health Bangladesh. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
