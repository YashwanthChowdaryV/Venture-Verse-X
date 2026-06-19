import React, { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Send, Plus, Trash2, FileText, X, Sparkles,
  Search, Zap, TrendingUp, Users, BarChart3, Shield,
  Lightbulb, Target, Copy, Check, Sliders,
  MessageSquare, BookOpen, Layers, Filter
} from 'lucide-react';
import ShapeGrid from '../components/ShapeGrid';

const API_BASE_URL = 'http://localhost:8080';

// ==================== CONSTANTS ====================
const THINKING_STAGES = [
  { label: 'Searching knowledge base...', icon: Search },
  { label: 'Retrieving relevant sources...', icon: FileText },
  { label: 'Analyzing startup frameworks...', icon: Brain },
  { label: 'Generating response...', icon: Sparkles },
  { label: 'Validating accuracy...', icon: Shield },
];

const DEFAULT_TOP_K = 10;

const SUGGESTED_QUESTIONS = [
  { icon: Target, text: 'What is TAM SAM SOM?' },
  { icon: TrendingUp, text: 'What metrics do VCs look for in Series A?' },
  { icon: Users, text: 'How to reduce churn in SaaS?' },
  { icon: Lightbulb, text: 'What is product-market fit?' },
  { icon: BookOpen, text: 'Explain lean startup methodology' },
  { icon: BarChart3, text: 'How do VCs evaluate founders?' },
  { icon: Shield, text: 'What are the most common startup failure patterns?' },
  { icon: Zap, text: 'What is the Rule of 40?' },
];

const SEARCH_MODES = [
  { id: 'standard', label: 'Standard', icon: Search, description: 'Best match retrieval' },
  { id: 'rich', label: 'Rich Context', icon: Layers, description: 'Full metadata + scores' },
  { id: 'keywords', label: 'Keywords', icon: Filter, description: 'Keyword-boosted search' },
  { id: 'debug', label: 'Debug', icon: Sliders, description: 'Detailed scoring visibility' },
];

// ==================== HELPER: Extract keywords from query ====================
const extractKeywords = (text) => {
  const stopWords = new Set([
    'what', 'is', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or',
    'how', 'why', 'when', 'where', 'who', 'are', 'do', 'does', 'can', 'should', 'would',
    'could', 'will', 'shall', 'may', 'might', 'must', 'has', 'have', 'had', 'been', 'be',
    'this', 'that', 'these', 'those', 'it', 'its', 'i', 'me', 'my', 'we', 'our', 'you', 'your'
  ]);
  return text.split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w.toLowerCase()))
    .slice(0, 5);
};

// ==================== CONFIDENCE BAR ====================
const ConfidenceBar = ({ confidence, showLabel = true, size = 'sm' }) => {
  const pct = Math.round(confidence * 100);
  const color = pct >= 90 ? '#10B981' : pct >= 70 ? '#F59E0B' : pct >= 50 ? '#FF7900' : '#EF4444';
  const height = size === 'lg' ? 'h-2' : 'h-1.5';

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className={`flex-1 ${height} bg-[#F2CF7E]/20 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className={`${height} rounded-full`}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
      {showLabel && (
        <span className="text-[10px] font-bold" style={{ color }}>{pct}%</span>
      )}
    </div>
  );
};

// ==================== CITATION DRAWER ====================
const CitationDrawer = ({ citation, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (citation?.snippet) {
      navigator.clipboard.writeText(citation.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#FCFAF5] border-t border-[#F2CF7E]/40 rounded-t-2xl p-6 max-h-[60vh] overflow-y-auto shadow-2xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#FF7900]" />
          <h3 className="text-sm font-bold text-[#1E1E1E]">Source Details</h3>
        </div>
        <div className="flex items-center gap-2">
          {citation?.snippet && (
            <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-[#F2CF7E]/20 transition-colors" title="Copy excerpt">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-[#5C5C5C]" />}
            </button>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F2CF7E]/20 transition-colors">
            <X className="w-4 h-4 text-[#5C5C5C]" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F9F6EE] p-3 rounded-xl">
            <p className="text-[10px] font-bold text-[#5C5C5C] uppercase mb-1">Document</p>
            <p className="text-sm font-semibold text-[#1E1E1E]">{citation?.sourceTitle || citation?.title || 'Unknown'}</p>
          </div>
          <div className="bg-[#F9F6EE] p-3 rounded-xl">
            <p className="text-[10px] font-bold text-[#5C5C5C] uppercase mb-1">Document ID</p>
            <p className="text-sm font-mono text-[#FF7900]">{citation?.documentId || citation?.document_id || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-[#F9F6EE] p-3 rounded-xl">
          <p className="text-[10px] font-bold text-[#5C5C5C] uppercase mb-2">Relevance Score</p>
          <ConfidenceBar confidence={citation?.confidence || citation?.score || 0} size="lg" />
        </div>

        {(citation?.category || citation?.stage) && (
          <div className="grid grid-cols-2 gap-3">
            {citation?.category && (
              <div className="bg-[#F9F6EE] p-3 rounded-xl">
                <p className="text-[10px] font-bold text-[#5C5C5C] uppercase mb-1">Category</p>
                <p className="text-sm font-medium text-[#1E1E1E]">{citation.category}</p>
              </div>
            )}
            {citation?.stage && (
              <div className="bg-[#F9F6EE] p-3 rounded-xl">
                <p className="text-[10px] font-bold text-[#5C5C5C] uppercase mb-1">Stage Focus</p>
                <p className="text-sm font-medium text-[#1E1E1E]">{citation.stage}</p>
              </div>
            )}
          </div>
        )}

        {citation?.snippet && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-[#5C5C5C] uppercase">Excerpt</p>
              <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] text-[#FF7900] font-bold hover:underline">
                <Copy className="w-3 h-3" />{copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-[#5C5C5C] leading-relaxed bg-[#F9F6EE] p-3 rounded-xl max-h-40 overflow-y-auto">{citation.snippet}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ==================== MESSAGE BUBBLE ====================
const MessageBubble = ({ msg, index, onCitationClick }) => {
  const handleCitationClick = (cite, j) => {
    const citationData = {
      sourceTitle: typeof cite === 'string' ? cite : (cite?.sourceTitle || cite?.title || `Source ${j + 1}`),
      documentId: typeof cite === 'string' ? 'N/A' : (cite?.documentId || cite?.document_id || 'N/A'),
      confidence: typeof cite === 'string' ? 0.85 : (cite?.confidence || cite?.score || 0.85),
      snippet: typeof cite === 'string' ? '' : (cite?.snippet || cite?.excerpt || cite?.content_preview || ''),
      category: typeof cite === 'string' ? '' : (cite?.category || ''),
      stage: typeof cite === 'string' ? '' : (cite?.stage || ''),
    };
    onCitationClick(citationData);
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: msg.role === 'user' ? 30 : -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        whileHover={{ y: -1 }}
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
            ? 'bg-[#FF7900] text-white rounded-br-md'
            : 'bg-white border border-[#F2CF7E]/20 text-[#1E1E1E] rounded-bl-md shadow-sm'
          }`}
      >
        <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>

        {msg.citations && msg.citations.length > 0 && (
          <div className="mt-3 pt-2 border-t border-[#F2CF7E]/20">
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen className="w-3 h-3 text-[#FF7900]" />
              <p className="text-[10px] font-bold text-[#5C5C5C] uppercase">{msg.citations.length} Source{msg.citations.length > 1 ? 's' : ''}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {msg.citations.slice(0, 8).map((cite, j) => (
                <motion.span
                  key={j}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + j * 0.1 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  onClick={() => handleCitationClick(cite, j)}
                  className="text-[10px] px-2 py-0.5 bg-[#FFBF00]/10 text-[#FF7900] rounded-full font-medium cursor-pointer hover:bg-[#FFBF00]/20 transition-all"
                >
                  {typeof cite === 'string'
                    ? cite.length > 30 ? cite.substring(0, 30) + '...' : cite
                    : ((cite?.sourceTitle || cite?.title || `Source ${j + 1}`) + '').substring(0, 30)}
                </motion.span>
              ))}
              {msg.citations.length > 8 && (
                <span className="text-[10px] px-2 py-0.5 text-[#5C5C5C]">+{msg.citations.length - 8} more</span>
              )}
            </div>
          </div>
        )}

        {msg.confidence != null && msg.role === 'assistant' && <ConfidenceBar confidence={msg.confidence} />}

        {msg.model && (
          <div className="mt-2 flex items-center gap-1.5">
            <Brain className="w-3 h-3 text-[#5C5C5C]" />
            <span className="text-[10px] text-[#5C5C5C]">{msg.model}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ==================== MAIN COMPONENT ====================
const KnowledgePage = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinkingStage, setThinkingStage] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [searchMode, setSearchMode] = useState('standard');
  const [topK, setTopK] = useState(DEFAULT_TOP_K);
  const [showSettings, setShowSettings] = useState(false);
  const [searchStats, setSearchStats] = useState(null);

  const messagesEndRef = useRef(null);
  const thinkingInterval = useRef(null);
  const inputRef = useRef(null);

  // ==================== AUTO SCROLL ====================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, thinkingStage]);

  // ==================== THINKING ANIMATION ====================
  useEffect(() => {
    if (loading) {
      let stage = 0;
      thinkingInterval.current = setInterval(() => {
        stage = (stage + 1) % THINKING_STAGES.length;
        setThinkingStage(stage);
      }, 1200);
    } else {
      clearInterval(thinkingInterval.current);
      setThinkingStage(0);
    }
    return () => clearInterval(thinkingInterval.current);
  }, [loading]);

  // ==================== STREAMING SIMULATION ====================
  const simulateStreaming = useCallback((text, callback) => {
    setIsStreaming(true);
    setStreamingContent('');
    const words = text.split(' ');
    let index = 0;
    const interval = setInterval(() => {
      if (index < words.length) {
        setStreamingContent(prev => prev + (prev ? ' ' : '') + words[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        setStreamingContent('');
        callback(text);
      }
    }, 20);
  }, []);

  // ==================== CONVERSATION MANAGEMENT ====================
  const startConversation = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/search/conversation/start`);
      setSessionId(res.data.sessionId);
      setMessages([]);
      toast.success('New conversation started', { icon: '💬' });
    } catch (err) {
      toast.error('Failed to start conversation');
    }
  };

  const clearConversation = () => {
    if (sessionId) {
      axios.delete(`${API_BASE_URL}/api/v1/search/conversation/${sessionId}`).catch(() => { });
    }
    setSessionId(null);
    setMessages([]);
    setSearchStats(null);
    toast.success('Conversation cleared');
  };

  // ==================== SUBMIT QUERY ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const currentQuery = query;
    setQuery('');
    setLoading(true);
    setSearchStats(null);
    setMessages(prev => [...prev, { role: 'user', content: currentQuery }]);

    try {
      let endpoint, body;

      switch (searchMode) {
        case 'debug':
          endpoint = '/debug-search';
          body = { query: currentQuery };
          break;
        case 'rich':
          endpoint = '/search-with-context';
          body = { query: currentQuery, topK };
          break;
        case 'keywords':
          endpoint = '/search-with-keywords';
          body = { query: currentQuery, keywords: extractKeywords(currentQuery) };
          break;
        default:
          endpoint = sessionId ? '/conversation/ask' : '/answer';
          body = sessionId
            ? { query: currentQuery, sessionId, topK }
            : { query: currentQuery, topK, includeCitations: true, includeReranking: true };
      }

      const res = await axios.post(`${API_BASE_URL}/api/v1/search${endpoint}`, body);

      if (searchMode === 'debug') {
        const data = res.data;
        setSearchStats({
          total_results: data.total_results,
          max_score: data.max_score,
          avg_score: data.avg_score,
          high_quality_results: data.high_quality_results,
        });

        const results = data.results || [];
        const summary = `**Debug Search Results**\n\nRetrieved ${data.total_results} documents.\nMax Score: ${data.max_score} | Avg Score: ${data.avg_score}\n\n**Top Matches:**\n` +
          results.slice(0, 8).map((r, i) =>
            `${i + 1}. **${r.title || 'Unknown'}** (${((r.score || 0) * 100).toFixed(1)}%) [${r.documentId || r.document_id || 'N/A'}]`
          ).join('\n');

        simulateStreaming(summary, (fullText) => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: fullText,
            citations: results.slice(0, 8).map(r => ({
              sourceTitle: r.title || 'Unknown',
              documentId: r.documentId || r.document_id || 'N/A',
              confidence: r.score || 0,
              snippet: r.contentPreview || r.content_preview || '',
              category: r.category || '',
              stage: r.stage || '',
            })),
            confidence: parseFloat(data.max_score) || 0,
            model: 'Debug Mode',
          }]);
        });
      } else {
        const answer = res.data.answer || res.data.context || JSON.stringify(res.data);
        simulateStreaming(answer, (fullText) => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: fullText,
            citations: (res.data.citations || []).map(c => ({
              sourceTitle: c.sourceTitle || c.title || 'Source',
              documentId: c.documentId || c.document_id || '',
              confidence: c.confidence || c.score || 0.85,
              snippet: c.snippet || c.excerpt || '',
              category: c.category || '',
              stage: c.stage || '',
            })),
            confidence: res.data.confidence || 0.85,
            model: res.data.model || 'DeepSeek V3',
          }]);
        });
      }
    } catch (err) {
      console.error('Search error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, something went wrong. ${err.response?.data?.message || err.message || 'Please try again.'}`,
      }]);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  // ==================== KEYBOARD SHORTCUT ====================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ==================== RENDER ====================
  const ThinkingIndicator = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
      <div className="bg-white border border-[#F2CF7E]/20 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((dot) => (
              <motion.div key={dot} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={thinkingStage} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.3 }} className="flex items-center gap-2">
              {React.createElement(THINKING_STAGES[thinkingStage].icon, { className: 'w-3 h-3 text-[#FF7900]' })}
              <span className="text-xs text-[#5C5C5C]">{THINKING_STAGES[thinkingStage].label}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative animate-fade-in-up max-w-4xl mx-auto p-4 h-[calc(100vh-60px)] flex flex-col">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <ShapeGrid speed={0.2} squareSize={32} direction="diagonal" borderColor="#F2CF7E" hoverFillColor="#FFE642" shape="square" hoverTrailAmount={0} />
      </div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 flex-shrink-0 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="relative">
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 rounded-full bg-[#FF7900]/20 blur-xl" />
            <Brain className="w-5 h-5 text-[#FF7900] relative z-10" />
          </div>
          <h1 className="text-lg font-black text-[#1E1E1E] tracking-tight">Knowledge Intelligence</h1>
        </div>
        <p className="text-xs text-[#5C5C5C]">AI-powered startup intelligence • 290+ documents • RAG-powered</p>
      </motion.div>

      <div className="relative z-10 bg-[#FCFAF5]/90 backdrop-blur-sm border border-[#F2CF7E]/40 rounded-2xl flex flex-col flex-1 min-h-0 shadow-sm">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F2CF7E]/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            {sessionId ? (
              <span className="flex items-center gap-2 text-xs font-bold text-green-600">
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-green-500" />
                Conversation Active
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
                <MessageSquare className="w-3 h-3" />
                {searchMode === 'debug' ? 'Debug Mode' : searchMode === 'rich' ? 'Rich Context' : searchMode === 'keywords' ? 'Keywords' : 'Single Q&A'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#F9F6EE] rounded-lg p-0.5">
              {SEARCH_MODES.map((mode) => (
                <button key={mode.id} onClick={() => setSearchMode(mode.id)}
                  className={`p-1.5 rounded-md transition-all text-[10px] font-bold ${searchMode === mode.id ? 'bg-[#FF7900] text-white shadow-sm' : 'text-[#5C5C5C] hover:text-[#FF7900]'}`}
                  title={mode.description}>
                  <mode.icon className="w-3 h-3" />
                </button>
              ))}
            </div>

            <button onClick={() => setShowSettings(!showSettings)}
              className={`p-1.5 rounded-lg transition-colors ${showSettings ? 'bg-[#FFBF00]/20 text-[#FF7900]' : 'text-[#5C5C5C] hover:bg-[#F2CF7E]/10'}`}>
              <Sliders className="w-3.5 h-3.5" />
            </button>

            {!sessionId ? (
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={startConversation}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FF7900] text-white text-[10px] font-bold hover:bg-[#FFBF00] transition-colors">
                <Plus className="w-3 h-3" />Chat
              </motion.button>
            ) : (
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={clearConversation}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold hover:bg-red-100 transition-colors">
                <Trash2 className="w-3 h-3" />Clear
              </motion.button>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="px-4 py-3 border-b border-[#F2CF7E]/20 bg-[#F9F6EE] overflow-hidden">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-[#5C5C5C] uppercase">Top-K:</span>
                <input type="range" min="3" max="25" value={topK} onChange={(e) => setTopK(parseInt(e.target.value))} className="flex-1 accent-[#FF7900]" />
                <span className="text-xs font-bold text-[#FF7900] w-6 text-center">{topK}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {messages.length === 0 && !loading ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center justify-center h-full">
              <div className="relative mb-4">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 rounded-full bg-[#FF7900]/10 blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#FFBF00]/10 flex items-center justify-center relative z-10">
                  <Brain className="w-7 h-7 text-[#FF7900]" />
                </div>
              </div>
              <p className="text-base font-bold text-[#1E1E1E] mb-1">Startup Knowledge Assistant</p>
              <p className="text-xs text-[#5C5C5C] mb-5">Powered by enterprise RAG intelligence • Press ⌘K to search</p>
              <div className="grid grid-cols-2 gap-2 max-w-lg w-full">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }} onClick={() => setQuery(q.text)}
                    className="flex items-center gap-2 text-left text-[11px] px-3 py-2.5 bg-[#F9F6EE] border border-[#F2CF7E]/30 rounded-xl text-[#5C5C5C] hover:border-[#FF7900] hover:text-[#FF7900] hover:shadow-sm transition-all">
                    <q.icon className="w-3.5 h-3.5 flex-shrink-0 text-[#FF7900]" />
                    <span className="line-clamp-2">{q.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} index={i} onCitationClick={setSelectedCitation} />
              ))}
              {isStreaming && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="max-w-[85%] bg-white border border-[#F2CF7E]/20 rounded-2xl rounded-bl-md px-4 py-3 text-sm shadow-sm">
                    <p className="whitespace-pre-line leading-relaxed text-[#1E1E1E]">
                      {streamingContent}
                      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block w-0.5 h-4 bg-[#FF7900] ml-0.5 align-middle" />
                    </p>
                  </div>
                </motion.div>
              )}
              {loading && !isStreaming && <ThinkingIndicator />}
            </AnimatePresence>
          )}
          {searchStats && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#F9F6EE] border border-[#F2CF7E]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-[#FF7900]" />
                <h4 className="text-sm font-bold text-[#1E1E1E]">Search Statistics</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded-lg"><span className="text-[#5C5C5C]">Results:</span><span className="font-bold ml-1">{searchStats.total_results}</span></div>
                <div className="bg-white p-2 rounded-lg"><span className="text-[#5C5C5C]">Max Score:</span><span className="font-bold ml-1 text-green-600">{searchStats.max_score}</span></div>
                <div className="bg-white p-2 rounded-lg"><span className="text-[#5C5C5C]">Avg Score:</span><span className="font-bold ml-1">{searchStats.avg_score}</span></div>
                <div className="bg-white p-2 rounded-lg"><span className="text-[#5C5C5C]">High Quality:</span><span className="font-bold ml-1 text-[#FF7900]">{searchStats.high_quality_results}</span></div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-[#F2CF7E]/20 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <motion.input ref={inputRef} type="text" required value={query} onChange={e => setQuery(e.target.value)}
              placeholder={searchMode === 'debug' ? "Debug search query..." : sessionId ? "Ask a follow-up..." : "Ask anything about startups, funding, metrics..."}
              className="flex-1 px-4 py-2.5 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-xl text-sm placeholder-[#5C5C5C] focus:outline-none transition-all"
              whileFocus={{ borderColor: '#FFBF00', boxShadow: '0 0 0 3px rgba(255,191,0,0.1)' }} />
            <motion.button type="submit" disabled={loading || !query.trim()} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-4 py-2.5 rounded-xl bg-[#FF7900] hover:bg-[#FFBF00] text-white transition-colors disabled:opacity-50 flex items-center gap-2 font-bold text-sm">
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.span whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <Send className="w-4 h-4" />
                </motion.span>
              )}
            </motion.button>
          </form>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] text-[#5C5C5C]">VentureVerseX • {searchMode === 'debug' ? 'Debug Mode' : searchMode === 'rich' ? 'Rich Context' : searchMode === 'keywords' ? 'Keywords' : 'RAG Intelligence'}</p>
            <p className="text-[10px] text-[#5C5C5C]">Top-{topK} • 290+ documents</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCitation && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCitation(null)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
            <CitationDrawer citation={selectedCitation} onClose={() => setSelectedCitation(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KnowledgePage;