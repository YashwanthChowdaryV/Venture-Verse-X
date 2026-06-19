import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Plus, ChevronDown, Check, X, Brain, Settings,
  Building2, FileText, TrendingUp, Target, BarChart2, Users, Shield,
  Layers, History, Sparkles, LogOut, Menu, Database
} from 'lucide-react';
import { startupAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { gsap } from 'gsap';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const [startups, setStartups] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const match = location.pathname.match(/^\/startups\/([^/]+)/);
  const activeStartupId = match ? match[1] : null;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!plusH || !plusV || !icon || !textInner) return;
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
    });
    return () => ctx.revert();
  }, []);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
    } else {
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  }, []);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift, duration: 0.5 + lineCount * 0.07, ease: 'power4.out'
    });
  }, []);

  const handleToggle = useCallback(() => {
    const newState = !isOpen;
    setIsOpen(newState);
    animateIcon(newState);
    animateText(newState);
  }, [isOpen, setIsOpen, animateIcon, animateText]);

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Portfolio Dashboard';
    if (path.includes('/create-startup')) return 'New Venture';
    if (path.includes('/knowledge')) return 'Knowledge Intelligence';
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

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const data = await startupAPI.getMyStartups();
        setStartups(data || []);
      } catch (err) {
        console.error('Failed to load startups for sidebar:', err);
      }
    };
    fetchStartups();
  }, []);

  useEffect(() => {
    if (activeStartupId && startups.length > 0) {
      const exists = startups.some(s => String(s.id) === String(activeStartupId));
      if (!exists) {
        startupAPI.getMyStartups().then(data => setStartups(data || []));
      }
    }
  }, [activeStartupId, startups]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeStartup = startups.find(s => String(s.id) === String(activeStartupId));

  const workspaceTabs = activeStartupId ? [
    { name: 'Overview', path: `/startups/${activeStartupId}`, icon: Building2, end: true },
    { name: 'Executive Summary', path: `/startups/${activeStartupId}/executive-summary`, icon: FileText },
    { name: 'Investor Analysis', path: `/startups/${activeStartupId}/investor`, icon: TrendingUp },
    { name: 'Competitor Intel', path: `/startups/${activeStartupId}/competitor`, icon: Target },
    { name: 'Finance CFO', path: `/startups/${activeStartupId}/finance`, icon: BarChart2 },
    { name: 'Customer Insights', path: `/startups/${activeStartupId}/customer`, icon: Users },
    { name: 'Risk Assessment', path: `/startups/${activeStartupId}/risk`, icon: Shield },
    { name: 'Product Strategy', path: `/startups/${activeStartupId}/product-strategy`, icon: Layers },
    { name: 'History', path: `/startups/${activeStartupId}/history`, icon: History }
  ] : [];

  const globalTabs = [
    { name: 'Portfolio Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Knowledge Intelligence', path: '/knowledge', icon: Database },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const filteredStartups = startups.filter(s =>
    s.startupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div
        className="hidden lg:block fixed left-0 top-0 h-screen w-3 z-50"
        onMouseEnter={() => { setIsOpen(true); animateIcon(true); animateText(true); }}
      />

      {!isOpen && (
        <button
          onClick={handleToggle}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden transition-colors"
          style={{ background: 'rgba(252,250,245,0.90)', borderColor: 'rgba(0,0,0,0.08)', border: '1px solid', backdropFilter: 'blur(10px)' }}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" style={{ color: '#1E1E1E' }} />
        </button>
      )}

      {isOpen && (
        <div
          onClick={() => { setIsOpen(false); animateIcon(false); animateText(false); }}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        onMouseLeave={() => { if (window.innerWidth >= 1024) { setIsOpen(false); animateIcon(false); animateText(false); } }}
        className={`fixed top-0 left-0 h-screen z-[60] w-64 border-r flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.08)' }}
      >
        {/* HEADER */}
        <div className="p-4 border-b space-y-3" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-2 px-1">
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#4A4A4A' }}>Workspace</span>
            <span className="text-[10px] font-bold" style={{ color: 'rgba(0,0,0,0.35)' }}>/</span>
            <span className="text-[10px] font-black tracking-tight truncate" style={{ color: '#1E1E1E' }}>{getBreadcrumb()}</span>
          </div>

          <div ref={dropdownRef} className="relative">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex-1 flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer focus:outline-none border"
                style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,191,0,0.12)', border: '1px solid rgba(255,191,0,0.2)' }}>
                    <Building2 className="w-3.5 h-3.5" style={{ color: '#FFBF00' }} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-black text-xs block truncate leading-normal" style={{ color: '#1E1E1E' }}>
                      {activeStartup ? activeStartup.startupName : 'Select Venture'}
                    </span>
                    <span className="text-[10px] font-bold block truncate leading-tight" style={{ color: '#4A4A4A' }}>
                      {activeStartup ? activeStartup.industry : 'VentureVerse AI'}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 ml-1.5" style={{ color: '#4A4A4A' }} />
              </button>

              <button
                onClick={handleToggle}
                className="p-2 rounded-lg lg:hidden hover:bg-zinc-200/50 focus:outline-none transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <span ref={iconRef} aria-hidden="true" style={{ display: 'inline-flex', width: '14px', height: '14px', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                  <span ref={plusHRef} style={{ position: 'absolute', left: '50%', top: '50%', width: '100%', height: '2px', background: '#4A4A4A', borderRadius: '2px', transform: 'translate(-50%, -50%)' }} />
                  <span ref={plusVRef} style={{ position: 'absolute', left: '50%', top: '50%', width: '100%', height: '2px', background: '#4A4A4A', borderRadius: '2px', transform: 'translate(-50%, -50%)' }} />
                </span>
              </button>
            </div>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-lg shadow-xl overflow-hidden py-1 border animate-fade-in-up"
                style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="px-2 pb-1.5 pt-1 border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <input
                    type="text" placeholder="Search ventures..." value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md px-2.5 py-1.5 text-xs placeholder-zinc-400 focus:outline-none border font-bold"
                    style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
                  />
                </div>
                <div className="max-h-40 overflow-y-auto py-1">
                  {filteredStartups.map((s) => (
                    <button key={s.id}
                      onClick={() => { navigate(`/startups/${s.id}`); setDropdownOpen(false); setIsOpen(false); }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-left text-xs font-bold transition-colors hover:bg-zinc-100"
                      style={{
                        color: String(s.id) === String(activeStartupId) ? '#1E1E1E' : '#4A4A4A',
                        fontWeight: String(s.id) === String(activeStartupId) ? '800' : '600',
                        background: String(s.id) === String(activeStartupId) ? 'rgba(255,191,0,0.06)' : 'transparent',
                      }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Building2 className="w-3.5 h-3.5" style={{ color: '#4A4A4A' }} />
                        <span className="truncate">{s.startupName}</span>
                      </div>
                      {String(s.id) === String(activeStartupId) && (
                        <Check className="w-3 h-3 flex-shrink-0 ml-1.5" style={{ color: '#FFBF00' }} />
                      )}
                    </button>
                  ))}
                  {filteredStartups.length === 0 && (
                    <p className="text-[10px] italic px-3 py-2 text-center font-bold" style={{ color: '#4A4A4A' }}>No ventures found</p>
                  )}
                </div>
                <div className="h-px my-1" style={{ background: 'rgba(0,0,0,0.08)' }} />
                <div className="px-1 py-0.5">
                  <Link to="/dashboard"
                    onClick={() => { setDropdownOpen(false); setIsOpen(false); }}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-colors hover:bg-zinc-100 font-bold"
                    style={{ color: '#4A4A4A' }}>
                    <LayoutDashboard className="w-3.5 h-3.5" style={{ color: '#4A4A4A' }} />
                    <span>Portfolio Dashboard</span>
                  </Link>
                  <Link to="/create-startup"
                    onClick={() => { setDropdownOpen(false); setIsOpen(false); }}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-colors hover:bg-zinc-100 font-black"
                    style={{ color: '#FF7900' }}>
                    <Plus className="w-3.5 h-3.5" style={{ color: '#FF7900' }} />
                    <span>Create New Venture</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {activeStartupId && (
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest px-3 mb-2" style={{ color: '#4A4A4A' }}>Venture Intelligence</p>
              {workspaceTabs.map((item) => (
                <NavLink
                  key={item.name} to={item.path} end={item.end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-bold transition-all border ${isActive ? 'border-transparent shadow-sm' : 'border-transparent'}`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? '#FCFAF5' : 'transparent',
                    color: isActive ? '#1E1E1E' : '#4A4A4A',
                    borderColor: isActive ? 'rgba(0,0,0,0.08)' : 'transparent',
                  })}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: '#FFBF00' }} />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          )}

          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest px-3 mb-2" style={{ color: '#4A4A4A' }}>Platform Workspace</p>
            {globalTabs.map((item) => (
              <NavLink
                key={item.name} to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-bold transition-all border ${isActive ? 'border-transparent shadow-sm' : 'border-transparent'}`
                }
                style={({ isActive }) => ({
                  background: isActive ? '#FCFAF5' : 'transparent',
                  color: isActive ? '#1E1E1E' : '#4A4A4A',
                  borderColor: isActive ? 'rgba(0,0,0,0.08)' : 'transparent',
                })}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: '#FFBF00' }} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* FOOTER */}
        <div className="border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
          {user && (
            <div className="p-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }} ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-zinc-100/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border flex-shrink-0"
                  style={{ background: 'rgba(255,191,0,0.12)', borderColor: 'rgba(255,191,0,0.3)', color: '#FFBF00' }}>
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-black truncate" style={{ color: '#1E1E1E' }}>{user.fullName}</p>
                  <p className="text-[10px] font-bold truncate" style={{ color: '#4A4A4A' }}>{user.email}</p>
                </div>
                <ChevronDown className="w-3 h-3 flex-shrink-0 ml-auto" style={{ color: '#4A4A4A' }} />
              </button>

              {userDropdownOpen && (
                <div className="mt-1 rounded-lg border overflow-hidden" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
                  <Link to="/settings"
                    onClick={() => { setUserDropdownOpen(false); setIsOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold hover:bg-zinc-100 transition-colors"
                    style={{ color: '#4A4A4A' }}>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-black hover:bg-red-50 transition-colors"
                    style={{ color: '#FF7900' }}>
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="p-3">
            <div className="rounded-lg p-3 border" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" style={{ color: '#FFBF00' }} />
                <h4 className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#FFBF00' }}>Intelligence Network</h4>
              </div>
              <p className="text-[10px] font-bold" style={{ color: '#4A4A4A' }}>All 7 AI Agents Operational</p>
              <div className="flex gap-1.5 mt-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ background: '#FFBF00' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;