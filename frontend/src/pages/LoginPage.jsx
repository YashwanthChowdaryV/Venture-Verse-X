import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import DotGrid from '../components/DotGrid';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Signing In...');
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { login: authLogin, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle OAuth2 callback
  useEffect(() => {
    const token = searchParams.get('token');
    const username = searchParams.get('username');
    const email = searchParams.get('email');
    const fullName = searchParams.get('fullName');
    const id = searchParams.get('id');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', id);
      navigate('/dashboard');
    }
  }, [searchParams, navigate]);

  const loadingMessages = [
    'Authenticating Credentials...',
    'Connecting AI Workspace...',
    'Loading Intelligence Dashboard...',
    'Preparing Your Agents...',
    'Almost Ready...'
  ];

  useEffect(() => {
    if (loading) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[messageIndex]);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!login || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await authLogin(login, password);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Login failed';

      if (errMsg.toLowerCase().includes('no account') ||
        errMsg.toLowerCase().includes('not found') ||
        errMsg.toLowerCase().includes('does not exist')) {
        setErrorMessage('No account found. Please check your email/username or create an account.');
      } else if (errMsg.toLowerCase().includes('password') ||
        err.response?.status === 401) {
        setErrorMessage('Incorrect password. Please enter the correct password.');
      } else if (errMsg.toLowerCase().includes('disabled')) {
        setErrorMessage('Account is disabled. Please contact support.');
      } else {
        setErrorMessage(errMsg);
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F6F3EA] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <DotGrid dotSize={4} gap={18} baseColor="#F2CF7E" activeColor="#FF7900" proximity={120} shockRadius={250} shockStrength={5} resistance={750} returnDuration={1.5} />
        </div>
        <div className="relative z-10 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.1 }} className="mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-500 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="space-y-2">
            <h2 className="text-2xl font-bold text-[#1E1E1E]">✓ Authentication Successful</h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.5 }} className="text-[#5C5C5C]">✓ Workspace Ready</motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F3EA] flex flex-col justify-center relative overflow-hidden">

      <div className="absolute inset-0 opacity-50">
        <DotGrid dotSize={4} gap={18} baseColor="#F2CF7E" activeColor="#FF7900" proximity={120} shockRadius={250} shockStrength={5} resistance={750} returnDuration={1.5} />
      </div>

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFBF00]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF7900]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#1E1E1E] tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-[#5C5C5C]">
            Sign in to{' '}
            <span className="font-bold text-[#FF7900]">VentureVerseX</span>
            {' '}or{' '}
            <Link to="/register" className="font-semibold text-[#FF7900] hover:text-[#FFBF00] transition-colors">create account</Link>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="bg-[#FCFAF5] border border-[#F2CF7E]/40 rounded-[28px] p-6 shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-4">

              {errorMessage && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-800">
                      {errorMessage.includes('No account') ? 'No Account Found' : errorMessage.includes('password') ? 'Wrong Password' : 'Error'}
                    </p>
                    <p className="text-xs text-red-600 mt-0.5">{errorMessage}</p>
                    {errorMessage.includes('No account') && (
                      <Link to="/register" className="inline-block mt-1 text-xs font-semibold text-[#FF7900]">Create an account →</Link>
                    )}
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">Email or Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {login.includes('@') ? <Mail className="h-4 w-4 text-[#FF7900]/70" /> : <User className="h-4 w-4 text-[#FF7900]/70" />}
                  </div>
                  <input
                    type="text"
                    required
                    value={login}
                    onChange={(e) => { setLogin(e.target.value); setErrorMessage(''); }}
                    onFocus={() => setFocusedField('login')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="email@example.com or username"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-sm text-[#1E1E1E] placeholder-[#777] transition-all duration-250
                      ${focusedField === 'login' ? 'bg-white border-[#FFBF00] ring-2 ring-[#FFBF00]/20' :
                        errorMessage ? 'bg-red-50 border-red-300' : 'bg-[#F9F6EE] border-[#F2CF7E]/40'} border`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[#FF7900]/70" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-sm text-[#1E1E1E] placeholder-[#777] transition-all duration-250
                      ${focusedField === 'password' ? 'bg-white border-[#FFBF00] ring-2 ring-[#FFBF00]/20' :
                        errorMessage?.includes('password') ? 'bg-red-50 border-red-300' : 'bg-[#F9F6EE] border-[#F2CF7E]/40'} border`}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 rounded-xl text-sm font-bold bg-[#FFBF00] hover:bg-[#FFE642] text-[#1E1E1E] transition-all disabled:opacity-50 shadow-md">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    {loadingMessage}
                  </span>
                ) : (<>Sign In <ArrowRight className="w-4 h-4" /></>)}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#F2CF7E]/40"></div>
                <span className="text-xs text-[#5C5C5C]">or</span>
                <div className="flex-1 h-px bg-[#F2CF7E]/40"></div>
              </div>

              {/* Google Sign-In Button */}
              <button type="button" onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border border-[#F2CF7E]/40 bg-white hover:bg-gray-50 transition-all text-sm font-semibold text-[#1E1E1E]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

            </form>

            <div className="mt-5 pt-4 border-t border-[#F2CF7E]/20 flex items-center justify-center gap-2 text-xs text-[#5C5C5C]">
              <Sparkles className="w-3 h-3 text-[#FF7900]" />
              <span>Powered by 6 AI Startup Intelligence Agents</span>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;