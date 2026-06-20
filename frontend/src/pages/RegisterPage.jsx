import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, Sparkles, CheckCircle, AtSign, AlertCircle, Check, X } from 'lucide-react';
import DotGrid from '../components/DotGrid';
import { authAPI } from '../api/api';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Registering...');
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const loadingMessages = [
    'Initializing Account...',
    'Connecting Intelligence Engine...',
    'Creating Workspace...',
    'Setting Up AI Agents...',
    'Almost Ready...'
  ];

  useEffect(() => {
    if (loading) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[messageIndex]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null);
      setUsernameError('');
      return;
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      setUsernameError('Only letters, numbers, and underscores allowed');
      setUsernameAvailable(false);
      return;
    }
    setUsernameError('');
    const timeoutId = setTimeout(async () => {
      setCheckingUsername(true);
      try {
        const result = await authAPI.checkUsername(username);
        setUsernameAvailable(result.available);
      } catch (error) {
        setUsernameAvailable(null);
      } finally {
        setCheckingUsername(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [username]);

  useEffect(() => {
    if (!email || !email.includes('@')) {
      setEmailAvailable(null);
      return;
    }
    const timeoutId = setTimeout(async () => {
      setCheckingEmail(true);
      try {
        const result = await authAPI.checkEmail(email);
        setEmailAvailable(result.available);
      } catch (error) {
        setEmailAvailable(null);
      } finally {
        setCheckingEmail(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !username || !email || !password) { toast.error('Please fill in all fields'); return; }
    if (username.length < 3) { toast.error('Username must be at least 3 characters'); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) { toast.error('Username can only contain letters, numbers, and underscores'); return; }
    if (usernameAvailable === false) { toast.error('Username is already taken'); return; }
    if (emailAvailable === false) { toast.error('Email is already registered'); return; }
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) { toast.error('Password must contain uppercase, lowercase, and number'); return; }

    setLoading(true);
    try {
      await register(fullName, username, email, password);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed');
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'https://ventureversex-backend-deploy.onrender.com/oauth2/authorization/google';
  };

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    return strength;
  };
  const passwordStrength = getPasswordStrength(password);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F6F3EA] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <DotGrid dotSize={4} gap={18} baseColor="#F2CF7E" activeColor="#FF7900" proximity={120} shockRadius={250} shockStrength={5} resistance={750} returnDuration={1.5} />
        </div>
        <div className="relative z-10 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }} className="mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-500 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="space-y-2">
            <h2 className="text-2xl font-black text-[#1E1E1E]">✓ Account Created</h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }} className="text-[#5C5C5C]">✓ AI Workspace Initialized</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.0 }} className="text-sm text-[#5C5C5C] mt-2">Redirecting to dashboard...</motion.p>
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
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFBF00]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF7900]/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-6">
          <h2 className="text-2xl font-black text-[#1E1E1E] tracking-tight">Create your account</h2>
          <p className="mt-2 text-sm text-[#5C5C5C]">
            Join <span className="font-bold text-[#FF7900]">VentureVerseX</span> or{' '}
            <Link to="/login" className="font-semibold text-[#FF7900] hover:text-[#FFBF00] transition-colors">sign in</Link>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="bg-[#FCFAF5] border border-[#F2CF7E]/40 rounded-[24px] p-5 shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-4 w-4 transition-colors duration-300 ${focusedField === 'fullName' ? 'text-[#FF7900]' : 'text-[#5C5C5C]'}`} />
                  </div>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} onFocus={() => setFocusedField('fullName')} onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    className={`w-full pl-9 pr-3 py-2 bg-[#F9F6EE] border rounded-lg text-sm placeholder-[#5C5C5C] transition-all duration-300
                      ${focusedField === 'fullName' ? 'border-[#FFBF00] ring-2 ring-[#FFBF00]/20' : 'border-[#F2CF7E]/40'}`} />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className={`h-4 w-4 ${focusedField === 'username' ? 'text-[#FF7900]' : 'text-[#5C5C5C]'}`} />
                  </div>
                  <input type="text" required value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_]/g, ''))}
                    onFocus={() => setFocusedField('username')} onBlur={() => setFocusedField(null)}
                    placeholder="your_username"
                    className={`w-full pl-9 pr-9 py-2 bg-[#F9F6EE] border rounded-lg text-sm placeholder-[#5C5C5C] transition-all duration-300
                      ${focusedField === 'username' ? 'border-[#FFBF00] ring-2 ring-[#FFBF00]/20' :
                        usernameAvailable === true ? 'border-green-400' : usernameAvailable === false || usernameError ? 'border-red-400' : 'border-[#F2CF7E]/40'}`} />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {checkingUsername ? <div className="w-3.5 h-3.5 border-2 border-[#FF7900] border-t-transparent rounded-full animate-spin" /> :
                      usernameAvailable === true && username.length >= 3 ? <Check className="w-3.5 h-3.5 text-green-500" /> :
                        usernameAvailable === false || usernameError ? <X className="w-3.5 h-3.5 text-red-500" /> : null}
                  </div>
                </div>
                {usernameAvailable === true && username.length >= 3 && <p className="mt-0.5 text-xs text-green-600">Username available</p>}
                {usernameAvailable === false && !usernameError && <p className="mt-0.5 text-xs text-red-500">Username taken</p>}
                {usernameError && <p className="mt-0.5 text-xs text-red-500">{usernameError}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-4 w-4 ${focusedField === 'email' ? 'text-[#FF7900]' : 'text-[#5C5C5C]'}`} />
                  </div>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    placeholder="name@company.com"
                    className={`w-full pl-9 pr-9 py-2 bg-[#F9F6EE] border rounded-lg text-sm placeholder-[#5C5C5C] transition-all duration-300
                      ${focusedField === 'email' ? 'border-[#FFBF00] ring-2 ring-[#FFBF00]/20' :
                        emailAvailable === true ? 'border-green-400' : emailAvailable === false ? 'border-red-400' : 'border-[#F2CF7E]/40'}`} />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {checkingEmail ? <div className="w-3.5 h-3.5 border-2 border-[#FF7900] border-t-transparent rounded-full animate-spin" /> :
                      emailAvailable === true ? <Check className="w-3.5 h-3.5 text-green-500" /> :
                        emailAvailable === false ? <X className="w-3.5 h-3.5 text-red-500" /> : null}
                  </div>
                </div>
                {emailAvailable === true && <p className="mt-0.5 text-xs text-green-600">Email available</p>}
                {emailAvailable === false && <p className="mt-0.5 text-xs text-red-500">Email already registered</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-4 w-4 ${focusedField === 'password' ? 'text-[#FF7900]' : 'text-[#5C5C5C]'}`} />
                  </div>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
                    placeholder="Min. 8 characters"
                    className={`w-full pl-9 pr-3 py-2 bg-[#F9F6EE] border rounded-lg text-sm placeholder-[#5C5C5C] transition-all duration-300
                      ${focusedField === 'password' ? 'border-[#FFBF00] ring-2 ring-[#FFBF00]/20' : 'border-[#F2CF7E]/40'}`} />
                </div>
                {password.length > 0 && (
                  <div className="mt-1.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div key={level} className={`h-1 flex-1 rounded-full ${passwordStrength >= level ? level <= 2 ? 'bg-red-400' : level === 3 ? 'bg-yellow-400' : 'bg-green-500' : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <p className="mt-0.5 text-xs text-[#5C5C5C]">
                      {passwordStrength <= 1 && 'Weak'}
                      {passwordStrength === 2 && 'Fair'}
                      {passwordStrength === 3 && 'Good'}
                      {passwordStrength === 4 && 'Strong!'}
                    </p>
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading || usernameAvailable === false || emailAvailable === false}
                className="w-full flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-bold bg-[#FFBF00] hover:bg-[#FFE642] text-[#1E1E1E] transition-all disabled:opacity-50 shadow-md">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {loadingMessage}
                  </span>
                ) : (<>Create Account <ArrowRight className="w-3.5 h-3.5" /></>)}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#F2CF7E]/40" />
                <span className="text-xs text-[#5C5C5C]">or</span>
                <div className="flex-1 h-px bg-[#F2CF7E]/40" />
              </div>

              {/* Google Sign-Up */}
              <button type="button" onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-[#F2CF7E]/40 bg-white hover:bg-gray-50 transition-all text-sm font-semibold text-[#1E1E1E]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

            </form>

            <div className="mt-4 pt-3 border-t border-[#F2CF7E]/20 flex items-center justify-center gap-1.5 text-xs text-[#5C5C5C]">
              <Sparkles className="w-3 h-3 text-[#FF7900]" />
              <span>Powered by multi-agent AI intelligence</span>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;