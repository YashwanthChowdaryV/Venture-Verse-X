import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut } from 'lucide-react';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getBreadcrumb = () => {
    const path = location.pathname;

    if (path.includes('/dashboard')) return 'Portfolio Dashboard';
    if (path.includes('/create-startup')) return 'New Venture';
    if (path.includes('/knowledge')) return 'Knowledge Base';
    if (path.includes('/settings')) return 'Settings';

    if (path.includes('/startups/')) {
      if (path.includes('/executive-summary')) return 'Executive Summary';
      if (path.includes('/investor')) return 'Investor Analysis';
      if (path.includes('/competitor')) return 'Competitor Intel';
      if (path.includes('/finance')) return 'Finance CFO';
      if (path.includes('/customer')) return 'Customer Insights';
      if (path.includes('/risk')) return 'Risk Assessment';
      if (path.includes('/product-strategy')) return 'Product Strategy';
      if (path.includes('/history')) return 'Evaluation History';

      return 'Overview';
    }

    return 'VentureVerse';
  };

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 border-b backdrop-blur-xl"
      style={{
        background: 'rgba(252,250,245,0.70)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: 'rgba(0,0,0,0.06)',
        color: '#1E1E1E',
        boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
      }}
    >
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-lg lg:hidden transition-colors hover:bg-white/10"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: '#A6C8FF' }}
          >
            Workspace
          </span>

          <span
            className="text-xs font-semibold"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            /
          </span>

          <span
            className="text-xs font-bold tracking-tight"
            style={{ color: '#FFFFFF' }}
          >
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 focus:outline-none cursor-pointer"
            >
              <div className="hidden sm:block text-right">
                <p
                  className="text-xs font-semibold leading-tight"
                  style={{ color: '#FFFFFF' }}
                >
                  {user.fullName}
                </p>

                <p
                  className="text-[10px]"
                  style={{ color: '#B8C5E0' }}
                >
                  {user.email}
                </p>
              </div>

              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border"
                style={{
                  background: 'rgba(166,200,255,0.15)',
                  borderColor: 'rgba(166,200,255,0.25)',
                  color: '#A6C8FF',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {user.fullName
                  ? user.fullName.charAt(0).toUpperCase()
                  : 'U'}
              </div>
            </button>

            {dropdownOpen && (
              <>
                <div
                  onClick={() => setDropdownOpen(false)}
                  className="fixed inset-0 z-10"
                />

                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl border shadow-2xl z-20 overflow-hidden"
                  style={{
                    background: 'rgba(15,20,45,0.95)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div
                    className="px-4 py-3 border-b"
                    style={{
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <p
                      className="text-xs font-bold"
                      style={{ color: '#FFFFFF' }}
                    >
                      {user.fullName}
                    </p>

                    <p
                      className="text-[10px] truncate mt-1"
                      style={{ color: '#B8C5E0' }}
                    >
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-xs text-left transition-colors hover:bg-red-500/10"
                    style={{ color: '#FF9FFC' }}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-xs font-semibold rounded-lg border transition-all"
            style={{
              background:
                'linear-gradient(135deg,#5227FF,#A6C8FF)',
              borderColor: 'rgba(255,255,255,0.08)',
              color: '#FFFFFF',
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;