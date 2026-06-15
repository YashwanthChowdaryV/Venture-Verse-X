import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Building2, Calendar, Shield, LogOut, CheckCircle2, Key } from 'lucide-react';
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
    : 'March 2024';

  const accountFields = [
    { label: 'Full Name', value: user.fullName, icon: User },
    { label: 'Email Address', value: user.email, icon: User },
    { label: 'Workspace ID', value: 'VWX-2024-ENTERPRISE', icon: Key },
    { label: 'Account Role', value: 'Founder / Administrator', icon: Shield },
    { label: 'Member Since', value: memberSince, icon: Calendar },
  ];

  const securityItems = [
    { label: 'Founder Verified', status: 'Verified' },
    { label: 'Email Verified', status: 'Verified' },
    { label: 'Secure Authentication', status: 'Enabled' },
    { label: 'Workspace Protection', status: 'Active' },
  ];

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
                  <p className="text-sm mt-0.5" style={{ color: '#5C5C5C' }}>
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border"
                  style={{ background: 'rgba(255,191,0,0.06)', borderColor: 'rgba(255,191,0,0.15)', color: '#FFBF00' }}>
                  Verified Founder
                </span>
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
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#10B981' }} />
                      <span className="text-sm" style={{ color: '#1E1E1E' }}>{item.label}</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                      style={{ background: 'rgba(16,185,129,0.06)', color: '#10B981' }}>
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