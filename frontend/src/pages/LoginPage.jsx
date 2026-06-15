import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Lock,
  Mail,
  Brain,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import DotGrid from '../components/DotGrid';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);

      toast.success('Successfully logged in!');

      navigate('/dashboard');
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        'Login failed';

      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F3EA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Dot Grid Background */}
      <div className="absolute inset-0 opacity-50">
        <DotGrid
          dotSize={4}
          gap={18}
          baseColor="#F2CF7E"
          activeColor="#FF7900"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFBF00]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF7900]/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10">

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">

          <h2 className="text-4xl font-black text-[#1E1E1E] tracking-tight">
            Welcome Back
          </h2>

          <p className="mt-3 text-[#5C5C5C]">
            Sign in to your{' '}
            <span className="font-bold text-[#FF7900]">
              VentureVerseX
            </span>{' '}
            account or{' '}
            <Link
              to="/register"
              className="font-semibold text-[#FF7900] hover:text-[#FFBF00] transition-colors"
            >
              create a new one
            </Link>
          </p>

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">

          <div className="bg-[#FCFAF5] border border-[#F2CF7E]/40 rounded-[32px] p-8 shadow-xl">

            <form
              className="space-y-6"
              onSubmit={handleSubmit}
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-semibold text-[#1E1E1E] mb-2"
                >
                  Email Address
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#FF7900]" />
                  </div>

                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-3 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-2xl text-[#1E1E1E] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/40 focus:border-[#FFBF00] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-[#1E1E1E] mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#FF7900]" />
                  </div>

                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-2xl text-[#1E1E1E] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/40 focus:border-[#FFBF00] transition-all"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 rounded-2xl font-bold bg-[#FFBF00] hover:bg-[#FFE642] text-[#1E1E1E] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading
                  ? 'Signing In...'
                  : 'Sign In'}

                {!loading && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>

            </form>

            {/* Bottom Info */}
            <div className="mt-8 pt-6 border-t border-[#F2CF7E]/20">

              <div className="flex items-center justify-center gap-2 text-sm text-[#5C5C5C]">

                <Sparkles className="w-4 h-4 text-[#FF7900]" />

                <span>
                  Powered by 6 AI Startup Intelligence Agents
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;