import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Building2, Calendar, Shield, LogOut, CheckCircle2, Key, AtSign, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import FaultyTerminal from '../components/FaultyTerminal';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out.');
    navigate('/login');
  };

  if (!user) return null;

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const accountFields = [
    { label: 'Full Name', value: user.fullName || 'Not set', icon: User },
    { label: 'Username', value: user.username ? `@${user.username}` : 'Not set', icon: AtSign },
    { label: 'Email Address', value: user.email || 'Not set', icon: Mail },
    { label: 'Workspace ID', value: `VWX-${user.id || '2024'}-ENTERPRISE`, icon: Key },
    { label: 'Account Role', value: 'Founder / Administrator', icon: Shield },
    { label: 'Member Since', value: memberSince, icon: Calendar },
  ];

  const securityItems = [
    { label: 'Founder Verified', status: 'Verified' },
    { label: 'Email Verified', status: user.emailVerified ? 'Verified' : 'Pending' },
    { label: 'Secure Authentication', status: 'Enabled' },
    { label: 'Workspace Protection', status: 'Active' },
  ];

  // Check if user signed up with Google
  const isGoogleAccount = user.email && !user.password;

  return (
    <div className="relative -m-4 sm:-m-6" style={{ height: 'calc(100vh - 3rem)', overflow: 'hidden' }}>
      {/* Dimmed Terminal Background */}
      <div className="absolute inset-0 z-0 opacity-[0.10] pointer-events-none">
        <FaultyTerminal
          scale={1.2}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.4}
          pause={false}
          scanlineIntensity={0.4}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.08}
          tint="#F2CF7E"
          mouseReact={false}
          mouseStrength={0}
          pageLoadAnimation
          brightness={0.35}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6 sm:p-8 animate-fade-in-up">

        {/* Header */}
        <div className="mb-8 flex-shrink-0">
          <h1 className="text-2xl font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>
            Settings
          </h1>
          <p className="mt-2 text-sm leading-6 max-w-xl" style={{ color: '#5C5C5C' }}>
            Manage your VentureVerseX account, workspace access, security settings, and subscription preferences.
          </p>
        </div>

        {/* Main Content - Horizontal Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0">

          {/* Left Column */}
          <div className="flex flex-col gap-5 min-h-0">
            {/* Profile Section */}
            <div
              className="rounded-2xl border p-6 flex-shrink-0 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(30,30,30,0.04)]"
              style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg border flex-shrink-0"
                  style={{ background: 'rgba(255,191,0,0.1)', borderColor: 'rgba(255,191,0,0.2)', color: '#FFBF00' }}
                >
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-black tracking-[-0.02em]" style={{ color: '#1E1E1E' }}>
                    {user.fullName}
                  </h2>
                  {user.username && (
                    <p className="text-sm mt-0.5" style={{ color: '#FF7900' }}>
                      @{user.username}
                    </p>
                  )}
                  <p className="text-sm mt-0.5" style={{ color: '#5C5C5C' }}>
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border"
                  style={{ background: 'rgba(255,191,0,0.06)', borderColor: 'rgba(255,191,0,0.15)', color: '#FFBF00' }}>
                  Verified Founder
                </span>
                {isGoogleAccount && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border flex items-center gap-1"
                    style={{ background: 'rgba(66,133,244,0.06)', borderColor: 'rgba(66,133,244,0.15)', color: '#4285F4' }}>
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google Account
                  </span>
                )}
                <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border"
                  style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
                  Enterprise
                </span>
              </div>
            </div>

            {/* Security */}
            <div
              className="rounded-2xl border overflow-hidden flex-1 flex flex-col"
              style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}
            >
              <div className="px-6 py-4 border-b flex-shrink-0" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <h3 className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: '#5C5C5C' }}>
                  Security & Access
                </h3>
              </div>
              <div className="divide-y flex-1" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                {securityItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-6 py-3.5 transition-colors duration-150 hover:bg-zinc-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: item.status === 'Verified' || item.status === 'Enabled' || item.status === 'Active' ? '#10B981' : '#F59E0B' }} />
                      <span className="text-sm" style={{ color: '#1E1E1E' }}>{item.label}</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                      style={{
                        background: item.status === 'Pending' ? 'rgba(245,158,11,0.06)' : 'rgba(16,185,129,0.06)',
                        color: item.status === 'Pending' ? '#F59E0B' : '#10B981'
                      }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 min-h-0">
            {/* Account Information */}
            <div
              className="rounded-2xl border overflow-hidden flex-1 flex flex-col"
              style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}
            >
              <div className="px-6 py-4 border-b flex-shrink-0" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <h3 className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: '#5C5C5C' }}>
                  Account Information
                </h3>
              </div>
              <div className="divide-y flex-1 overflow-y-auto" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                {accountFields.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center justify-between px-6 py-3.5 transition-colors duration-150 hover:bg-zinc-50/50"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <field.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#5C5C5C' }} />
                      <span className="text-sm" style={{ color: '#5C5C5C' }}>{field.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-right ml-4 truncate" style={{ color: '#1E1E1E' }}>
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sign Out */}
            <div className="flex-shrink-0">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black border transition-all duration-200 hover:bg-red-50"
                style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)', color: '#5C5C5C' }}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Account</span>
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-[10px] flex-shrink-0" style={{ color: '#5C5C5C' }}>
              VentureVerseX Enterprise &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;