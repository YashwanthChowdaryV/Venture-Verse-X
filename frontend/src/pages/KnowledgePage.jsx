import React, { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Send, Plus, Trash2, Sparkles,
  Search, FileText, Zap, TrendingUp, Users, BarChart3, Shield,
  Lightbulb, Target, MessageSquare, Layers, Building2, LineChart, Database, Cpu,
  Rocket, BookOpen, GraduationCap, Compass, Globe, Award, Star,
  ChevronRight, Sparkle, Coffee, Feather, Sun, Cloud, Wind,
  Mountain, TreePine, Flower2, Heart, Music, Palette, ChevronDown
} from 'lucide-react';
import GridScan from '../components/GridScan';

const API_BASE_URL = 'http://localhost:8080';

const THINKING_STAGES = [
  { label: 'Querying VentureVerse knowledge base...', icon: Search },
  { label: 'Retrieving from 290+ documents...', icon: FileText },
  { label: 'Analyzing startup frameworks...', icon: Brain },
  { label: 'Synthesizing with DeepSeek V3...', icon: Sparkles },
  { label: 'Validating RAG accuracy...', icon: Shield },
];

const ANALYSIS_LEVELS = [
  { value: 3, label: 'Quick Scan', description: 'Focused intelligence' },
  { value: 6, label: 'Standard', description: 'Balanced analysis' },
  { value: 10, label: 'Deep Research', description: 'Comprehensive intelligence' },
  { value: 15, label: 'Maximum Depth', description: 'Full knowledge coverage' },
];

const DEFAULT_ANALYSIS_LEVEL = 2;

const SUGGESTED_QUESTIONS = [
  { icon: Target, text: 'How do VCs evaluate founders?' },
  { icon: TrendingUp, text: 'What metrics matter for Series A?' },
  { icon: Users, text: 'How to reduce SaaS churn?' },
  { icon: Lightbulb, text: 'What is product-market fit?' },
  { icon: BarChart3, text: 'Explain the Rule of 40' },
  { icon: Shield, text: 'What are common startup failure patterns?' },
  { icon: Zap, text: 'How does venture debt work?' },
  { icon: LineChart, text: 'What is a good LTV/CAC ratio?' },
];

// Learning prompts for the header
const LEARNING_PROMPTS = [
  '💡 Learn about startups with us',
  '🚀 Have a question? Just type here!',
  '📚 Discover venture capital insights',
  '🎯 Ask anything about entrepreneurship',
  '🌟 Your startup journey starts here'
];

// Unique animated text items for background carousels
const LEFT_TO_RIGHT_TEXTS = [
  { icon: Rocket, text: 'Launch your startup journey with us' },
  { icon: BookOpen, text: 'Discover the art of entrepreneurship' },
  { icon: GraduationCap, text: 'Master venture capital strategies' },
  { icon: Compass, text: 'Navigate the innovation landscape' },
  { icon: Globe, text: 'Explore global market opportunities' },
  { icon: Award, text: 'Achieve entrepreneurial excellence' },
  { icon: Brain, text: 'Unlock AI-powered business insights' },
  { icon: Star, text: 'Build your legacy in tech' },
  { icon: Coffee, text: 'Fuel your startup ambitions' },
  { icon: Feather, text: 'Lightweight agile methodologies' },
  { icon: Sun, text: 'Illuminate your business vision' },
  { icon: Cloud, text: 'Scale with cloud-native solutions' },
  { icon: Wind, text: 'Adapt to market changes swiftly' },
  { icon: Mountain, text: 'Conquer business challenges' },
  { icon: TreePine, text: 'Grow your venture sustainably' },
  { icon: Flower2, text: 'Bloom in competitive markets' },
  { icon: Heart, text: 'Build with passion and purpose' },
  { icon: Music, text: 'Harmonize teams for success' },
  { icon: Palette, text: 'Paint your unique brand story' },
  { icon: Zap, text: 'Accelerate your growth trajectory' },
];

const RIGHT_TO_LEFT_TEXTS = [
  { icon: Rocket, text: 'From idea to unicorn - your journey starts here' },
  { icon: BookOpen, text: 'Deep dive into venture frameworks' },
  { icon: GraduationCap, text: 'Learn from industry pioneers' },
  { icon: Compass, text: 'Chart your course to success' },
  { icon: Globe, text: 'Connect with global investors' },
  { icon: Award, text: 'Earn your place in the ecosystem' },
  { icon: Brain, text: 'Think like a venture capitalist' },
  { icon: Star, text: 'Shine in the competitive landscape' },
  { icon: Coffee, text: 'Networking over innovation' },
  { icon: Feather, text: 'Agile development mastery' },
  { icon: Sun, text: 'Bright future in tech' },
  { icon: Cloud, text: 'Leverage cloud infrastructure' },
  { icon: Wind, text: 'Ride the waves of innovation' },
  { icon: Mountain, text: 'Summit your business goals' },
  { icon: TreePine, text: 'Build lasting enterprises' },
  { icon: Flower2, text: 'Cultivate entrepreneurial spirit' },
  { icon: Heart, text: 'Passion-driven innovation' },
  { icon: Music, text: 'Create business symphonies' },
  { icon: Palette, text: 'Design your success story' },
  { icon: Zap, text: 'Ignite your business potential' },
];

const KnowledgePage = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinkingStage, setThinkingStage] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [analysisLevel, setAnalysisLevel] = useState(DEFAULT_ANALYSIS_LEVEL);
  const [showSettings, setShowSettings] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [learningPromptIndex, setLearningPromptIndex] = useState(0);

  const messagesEndRef = useRef(null);
  const thinkingInterval = useRef(null);
  const inputRef = useRef(null);
  const topK = ANALYSIS_LEVELS[analysisLevel]?.value || 6;

  // Rotate learning prompts
  useEffect(() => {
    const interval = setInterval(() => {
      setLearningPromptIndex((prev) => (prev + 1) % LEARNING_PROMPTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, streamingContent, thinkingStage]);

  useEffect(() => {
    if (loading) {
      let stage = 0;
      thinkingInterval.current = setInterval(() => { stage = (stage + 1) % THINKING_STAGES.length; setThinkingStage(stage); }, 1200);
    } else { clearInterval(thinkingInterval.current); setThinkingStage(0); }
    return () => clearInterval(thinkingInterval.current);
  }, [loading]);

  const simulateStreaming = useCallback((text, callback) => {
    setIsStreaming(true); setStreamingContent('');
    const words = text.split(' '); let index = 0;
    const interval = setInterval(() => {
      if (index < words.length) { setStreamingContent(prev => prev + (prev ? ' ' : '') + words[index]); index++; }
      else { clearInterval(interval); setIsStreaming(false); setStreamingContent(''); callback(text); }
    }, 20);
  }, []);

  const startConversation = async () => {
    setHasInteracted(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/search/conversation/start`);
      setSessionId(res.data.sessionId); setMessages([]);
      toast.success('Research session started', { icon: '💬' });
    } catch (err) { toast.error('Failed to start session'); }
  };

  const clearConversation = () => {
    if (sessionId) { axios.delete(`${API_BASE_URL}/api/v1/search/conversation/${sessionId}`).catch(() => { }); }
    setSessionId(null); setMessages([]);
    setHasInteracted(false);
    toast.success('Session cleared');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setHasInteracted(true);
    const currentQuery = query; setQuery(''); setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: currentQuery }]);
    try {
      const endpoint = sessionId ? '/conversation/ask' : '/answer';
      const body = sessionId ? { query: currentQuery, sessionId, topK } : { query: currentQuery, topK, includeCitations: true, includeReranking: true };
      const res = await axios.post(`${API_BASE_URL}/api/v1/search${endpoint}`, body);
      const answer = res.data.answer || res.data.context || JSON.stringify(res.data);
      simulateStreaming(answer, (fullText) => {
        setMessages(prev => [...prev, { role: 'assistant', content: fullText, model: 'deepseek/deepseek-chat-v3-0324' }]);
      });
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Analysis error. ${err.response?.data?.message || err.message || 'Please try again.'}` }]);
      toast.error('Intelligence query failed');
    } finally { setLoading(false); }
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); inputRef.current?.focus(); } };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const ThinkingIndicator = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
      <div className="bg-white border border-[#F2CF7E]/20 rounded-2xl rounded-bl-md px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((dot) => (
              <motion.div key={dot} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }} className="w-2 h-2 rounded-full bg-[#FF7900]" />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={thinkingStage} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.3 }} className="flex items-center gap-2">
              {React.createElement(THINKING_STAGES[thinkingStage].icon, { className: 'w-4 h-4 text-[#FF7900]' })}
              <span className="text-[13px] font-semibold text-[#5C5C5C]">{THINKING_STAGES[thinkingStage].label}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  // Background animated carousel component with slower speeds
  const AnimatedCarousel = ({ items, direction = 'left', speed = 45, yPosition, isVisible }) => {
    const duplicatedItems = [...items, ...items, ...items];

    return (
      <motion.div
        className="absolute left-0 right-0 overflow-hidden pointer-events-none"
        style={{
          top: yPosition,
          height: '65px',
          zIndex: 1
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.95,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="flex items-center gap-16 whitespace-nowrap"
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          animate={{
            x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
          }}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            },
          }}
        >
          {duplicatedItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 px-7 py-3 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(242,207,126,0.2)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}
              whileHover={{
                scale: 1.05,
                background: 'rgba(255,255,255,0.9)',
                borderColor: 'rgba(255,121,0,0.3)',
                boxShadow: '0 8px 32px rgba(255,121,0,0.08)',
              }}
              transition={{ duration: 0.3 }}
            >
              <item.icon className="w-4 h-4 text-[#FF7900]" />
              <span className="text-sm font-semibold text-[#1E1E1E] opacity-85 tracking-wide">
                {item.text}
              </span>
              <ChevronRight className="w-3 h-3 text-[#FFBF00] opacity-30" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#FCFAF5] overflow-hidden">

      {/* ==================== FULL BACKGROUND CAROUSELS ==================== */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          opacity: hasInteracted ? 0 : 1,
          pointerEvents: hasInteracted ? 'none' : 'auto',
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        {/* Layer 1: Left to Right - Top */}
        <AnimatedCarousel
          items={LEFT_TO_RIGHT_TEXTS.slice(0, 10)}
          direction="left"
          speed={50}
          yPosition="6%"
          isVisible={!hasInteracted}
        />

        {/* Layer 2: Right to Left - Upper */}
        <AnimatedCarousel
          items={RIGHT_TO_LEFT_TEXTS.slice(0, 10)}
          direction="right"
          speed={45}
          yPosition="20%"
          isVisible={!hasInteracted}
        />

        {/* Layer 3: Left to Right - Middle Upper */}
        <AnimatedCarousel
          items={LEFT_TO_RIGHT_TEXTS.slice(10, 20)}
          direction="left"
          speed={55}
          yPosition="34%"
          isVisible={!hasInteracted}
        />

        {/* Layer 4: Right to Left - Middle Lower */}
        <AnimatedCarousel
          items={RIGHT_TO_LEFT_TEXTS.slice(10, 20)}
          direction="right"
          speed={48}
          yPosition="48%"
          isVisible={!hasInteracted}
        />

        {/* Layer 5: Left to Right - Bottom Upper */}
        <AnimatedCarousel
          items={LEFT_TO_RIGHT_TEXTS.slice(0, 10)}
          direction="left"
          speed={52}
          yPosition="62%"
          isVisible={!hasInteracted}
        />

        {/* Layer 6: Right to Left - Bottom Lower */}
        <AnimatedCarousel
          items={RIGHT_TO_LEFT_TEXTS.slice(0, 10)}
          direction="right"
          speed={46}
          yPosition="76%"
          isVisible={!hasInteracted}
        />

        {/* Layer 7: Left to Right - Very Bottom */}
        <AnimatedCarousel
          items={LEFT_TO_RIGHT_TEXTS.slice(10, 20)}
          direction="left"
          speed={54}
          yPosition="90%"
          isVisible={!hasInteracted}
        />

        {/* Enhanced floating particles with unique behaviors */}
        {[...Array(40)].map((_, i) => {
          const size = Math.random() * 8 + 2;
          const isGlow = Math.random() > 0.7;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                background: isGlow
                  ? `radial-gradient(circle, rgba(255,121,0,${Math.random() * 0.15 + 0.05}) 0%, transparent 70%)`
                  : `rgba(255,121,0,${Math.random() * 0.06 + 0.01})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                zIndex: 0,
                boxShadow: isGlow ? `0 0 ${size * 3}px rgba(255,121,0,0.1)` : 'none',
              }}
              animate={{
                y: [0, -(Math.random() * 60 + 20), 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1 + Math.random() * 0.8, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
              }}
            />
          );
        })}

        {/* Decorative gradient orbs */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,121,0,0.04) 0%, transparent 70%)',
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(242,207,126,0.04) 0%, transparent 70%)',
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute top-[50%] left-[50%] w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(255,191,0,0.02) 0%, transparent 70%)',
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Subtle animated line patterns */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 50%, rgba(255,121,0,0.02) 0%, transparent 50%)',
              'radial-gradient(ellipse at 80% 50%, rgba(255,121,0,0.02) 0%, transparent 50%)',
              'radial-gradient(ellipse at 20% 50%, rgba(255,121,0,0.02) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gradient overlays for edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFAF5]/70 via-transparent to-[#FCFAF5]/70 pointer-events-none z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCFAF5]/50 via-transparent to-[#FCFAF5]/50 pointer-events-none z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF5]/40 via-transparent to-[#FCFAF5]/40 pointer-events-none z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#FCFAF5]/40 via-transparent to-[#FCFAF5]/40 pointer-events-none z-[2]" />
      </motion.div>

      {/* ==================== GRID SCAN BACKGROUND ==================== */}
      <motion.div
        className="absolute inset-0 z-[1] rounded-2xl overflow-hidden"
        style={{ opacity: 0.06 }}
        animate={{
          opacity: hasInteracted ? 0 : 0.06,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        <GridScan
          sensitivity={0.5}
          lineThickness={1}
          linesColor="#F2CF7E"
          gridScale={0.08}
          scanColor="#FF7900"
          scanOpacity={0.3}
          enablePost={true}
          bloomIntensity={0.5}
          chromaticAberration={0.001}
          noiseIntensity={0.008}
          lineJitter={0.08}
          scanGlow={0.4}
          scanSoftness={2.5}
          enableWebcam={false}
          showPreview={false}
        />
      </motion.div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="relative z-10 max-w-6xl mx-auto p-5 h-screen flex flex-col">

        {/* Hero Header with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-4 flex-shrink-0"
        >
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 rounded-full bg-[#FF7900]/20 blur-xl"
              />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-[#FF7900]/10"
              />
              <Building2 className="w-7 h-7 text-[#FF7900] relative z-10" />
            </div>
            <h1 className="text-2xl font-black text-[#1E1E1E] tracking-tight">VentureVerse Knowledge Engine</h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[13px] text-[#5C5C5C] font-medium max-w-xl mx-auto leading-relaxed"
          >
            Institutional-grade startup intelligence powered by <span className="font-bold text-[#FF7900]">DeepSeek V3</span> and <span className="font-bold text-[#FF7900]">VentureVerseX RAG</span>
          </motion.p>

          {/* Learning Prompt Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={learningPromptIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFBF00]/10 border border-[#F2CF7E]/20"
              >
                <span className="text-[13px] font-medium text-[#5C5C5C]">
                  {LEARNING_PROMPTS[learningPromptIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Chat Container with enhanced glass effect - WIDER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative bg-[#FCFAF5]/88 backdrop-blur-xl border border-[#F2CF7E]/25 rounded-2xl flex flex-col flex-1 min-h-0 shadow-xl z-20 w-full"
        >

          {/* Chat Header - Now with always visible Analysis Depth */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#F2CF7E]/20 flex-shrink-0 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              {sessionId ? (
                <span className="flex items-center gap-2 text-[12px] font-bold text-green-600">
                  <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  Research Session Active
                </span>
              ) : (
                <span className="flex items-center gap-2 text-[12px] font-semibold text-[#5C5C5C]">
                  <MessageSquare className="w-4 h-4" />
                  Knowledge Query • {ANALYSIS_LEVELS[analysisLevel]?.label}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Always visible Analysis Depth Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-[11px] font-bold border ${showSettings
                      ? 'bg-[#FFBF00]/20 text-[#FF7900] border-[#FF7900]/30'
                      : 'bg-white/50 text-[#5C5C5C] border-[#F2CF7E]/30 hover:bg-[#F2CF7E]/10'
                    }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{ANALYSIS_LEVELS[analysisLevel]?.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showSettings ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown - Always visible when showSettings is true */}
                {showSettings && (
                  <div
                    className="absolute top-full right-0 mt-1 bg-white rounded-xl border border-[#F2CF7E]/20 shadow-lg p-2 w-48 z-30"
                    style={{ minWidth: '180px' }}
                  >
                    {ANALYSIS_LEVELS.map((level, i) => (
                      <button
                        key={i}
                        onClick={() => { setAnalysisLevel(i); setShowSettings(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-semibold transition-all ${analysisLevel === i
                            ? 'bg-[#FF7900] text-white'
                            : 'text-[#5C5C5C] hover:bg-[#F9F6EE]'
                          }`}
                      >
                        <div>{level.label}</div>
                        <div className={`text-[10px] font-medium ${analysisLevel === i ? 'text-white/70' : 'text-[#5C5C5C]/70'}`}>
                          {level.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!sessionId ? (
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={startConversation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7900] text-white text-[11px] font-bold hover:bg-[#FFBF00] transition-colors">
                  <Plus className="w-3.5 h-3.5" />New Session
                </motion.button>
              ) : (
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={clearConversation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-[11px] font-bold hover:bg-red-100 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />Clear
                </motion.button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {messages.length === 0 && !loading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center justify-center h-full">
                <div className="relative mb-5">
                  <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 rounded-full bg-[#FF7900]/10 blur-2xl" />
                  <div className="w-16 h-16 rounded-2xl bg-[#FFBF00]/10 flex items-center justify-center relative z-10">
                    <Brain className="w-8 h-8 text-[#FF7900]" />
                  </div>
                </div>
                <p className="text-lg font-bold text-[#1E1E1E] mb-1">VentureVerseX Intelligence Copilot</p>
                <p className="text-[13px] text-[#5C5C5C] mb-2 font-medium">
                  Search across 290+ startup frameworks, venture capital methodologies, and due diligence knowledge.
                </p>
                {/* Tech Stack Badge */}
                <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-xl border border-[#F2CF7E]/30 bg-[#F9F6EE]">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#FF7900]" />
                    <span className="text-[11px] font-bold text-[#5C5C5C]">DeepSeek V3</span>
                  </div>
                  <span className="text-[#F2CF7E] font-bold">•</span>
                  <div className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#FF7900]" />
                    <span className="text-[11px] font-bold text-[#5C5C5C]">VentureVerseX RAG</span>
                  </div>
                  <span className="text-[#F2CF7E] font-bold">•</span>
                  <div className="flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-[#FF7900]" />
                    <span className="text-[11px] font-bold text-[#5C5C5C]">290+ Documents</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5 max-w-xl w-full">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                      whileHover={{ scale: 1.02, y: -2 }} onClick={() => setQuery(q.text)}
                      className="flex items-center gap-2.5 text-left text-[12px] px-4 py-3 bg-[#F9F6EE] border border-[#F2CF7E]/30 rounded-xl text-[#5C5C5C] hover:border-[#FF7900] hover:text-[#FF7900] hover:shadow-sm transition-all font-semibold">
                      <q.icon className="w-4 h-4 flex-shrink-0 text-[#FF7900]" />
                      <span className="line-clamp-2">{q.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 30 : -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      whileHover={{ y: -1 }}
                      className={`max-w-[85%] rounded-2xl px-5 py-4 ${msg.role === 'user'
                        ? 'bg-[#FF7900] text-white rounded-br-md'
                        : 'bg-white border border-[#F2CF7E]/20 text-[#1E1E1E] rounded-bl-md shadow-sm'
                        }`}
                    >
                      <p className="whitespace-pre-line leading-relaxed text-[14px]">{msg.content}</p>
                      {msg.model && msg.role === 'assistant' && (
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-[#5C5C5C]">
                          <Brain className="w-3.5 h-3.5" />
                          <span>{msg.model}</span>
                          <span className="text-[#F2CF7E]">•</span>
                          <span>VentureVerseX RAG</span>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
                {isStreaming && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="max-w-[85%] bg-white border border-[#F2CF7E]/20 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                      <p className="whitespace-pre-line leading-relaxed text-[14px] text-[#1E1E1E]">
                        {streamingContent}
                        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block w-0.5 h-4 bg-[#FF7900] ml-0.5 align-middle" />
                      </p>
                    </div>
                  </motion.div>
                )}
                {loading && !isStreaming && <ThinkingIndicator />}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-[#F2CF7E]/20 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2.5">
              <motion.input ref={inputRef} type="text" required value={query} onChange={e => setQuery(e.target.value)}
                placeholder={sessionId ? "Ask a follow-up question..." : "💡 Learn about startups with us - just type your question!"}
                className="flex-1 px-5 py-3 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-xl text-[14px] placeholder-[#5C5C5C] focus:outline-none transition-all font-medium"
                whileFocus={{ borderColor: '#FFBF00', boxShadow: '0 0 0 3px rgba(255,191,0,0.1)' }} />
              <motion.button type="submit" disabled={loading || !query.trim()} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-5 py-3 rounded-xl bg-[#FF7900] hover:bg-[#FFBF00] text-white transition-colors disabled:opacity-50 flex items-center gap-2 font-bold text-[14px]">
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.span whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                    <Send className="w-5 h-5" />
                  </motion.span>
                )}
              </motion.button>
            </form>
            <div className="flex items-center justify-between mt-2.5">
              <p className="text-[11px] font-semibold text-[#5C5C5C]">VentureVerseX Knowledge Engine • DeepSeek V3 • RAG</p>
              <p className="text-[11px] font-semibold text-[#5C5C5C]">{ANALYSIS_LEVELS[analysisLevel]?.label} • 290 Knowledge Assets</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowledgePage;