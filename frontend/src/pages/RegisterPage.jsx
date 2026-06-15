import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Lock, Mail, User, ArrowRight, Sparkles } from 'lucide-react';
import DotGrid from '../components/DotGrid';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(fullName, email, password);

      toast.success('Registration successful! Please log in.');

      navigate('/login');
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        'Registration failed';

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

      {/* Content */}
      <div className="relative z-10">

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center animate-fade-in-up">

          <h2 className="text-3xl font-extrabold text-black tracking-tight">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-black">
            Join{' '}
            <span className="font-semibold text-black">
              VentureVerseX
            </span>{' '}
            or{' '}
            <Link
              to="/login"
              className="font-medium text-[#FF7900] hover:text-[#FFBF00] transition-colors"
            >
              sign in to existing account
            </Link>
          </p>
        </div>

        <div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="bg-[#FCFAF5] border border-[#F2CF7E]/40 py-8 px-4 shadow-xl rounded-2xl sm:px-10">

            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >

              {/* Full Name */}
              <div>
                <label
                  htmlFor="reg-fullName"
                  className="block text-sm font-medium text-black mb-1.5"
                >
                  Full Name
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-[#5C5C5C]" />
                  </div>

                  <input
                    id="reg-fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    className="block w-full pl-10 pr-3 py-2.5 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-xl text-black placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/40 focus:border-[#FFBF00] transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-sm font-medium text-black mb-1.5"
                >
                  Email Address
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-[#5C5C5C]" />
                  </div>

                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="block w-full pl-10 pr-3 py-2.5 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-xl text-black placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/40 focus:border-[#FFBF00] transition-all text-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="reg-password"
                  className="block text-sm font-medium text-black mb-1.5"
                >
                  Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[#5C5C5C]" />
                  </div>

                  <input
                    id="reg-password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="block w-full pl-10 pr-3 py-2.5 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-xl text-black placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/40 focus:border-[#FFBF00] transition-all text-sm"
                    placeholder="Min. 6 characters"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-black bg-[#FFBF00] hover:bg-[#FFE642] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer"
              >
                {loading
                  ? 'Registering...'
                  : 'Create Account'}

                {!loading && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-black">
              <Sparkles className="w-3 h-3 text-[#FF7900]" />
              <span>
                Powered by multi-agent AI intelligence
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;

