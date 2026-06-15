import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startupAPI } from '../api/api';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Rocket, FileText, Compass, Briefcase, Sparkles } from 'lucide-react';
import LetterGlitch from '../components/LetterGlitch';

const CreateStartupPage = () => {
  const [startupName, setStartupName] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startupName || !ideaDescription || !industry || !targetMarket) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await startupAPI.createStartup({
        startupName,
        ideaDescription,
        industry,
        targetMarket,
      });
      toast.success('Startup registered successfully!');
      navigate('/dashboard');
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to register startup';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <LetterGlitch
          className="absolute inset-0"
          glitchSpeed={50}
          centerVignette
          outerVignette={false}
          smooth
          glitchColors={['#FFBF00', '#F2CF7E', '#FFE642', '#FF7900']}
          backgroundColor="#F6F3EA"
          centerVignetteColor="rgba(252,250,245,0.82)"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(246,243,234,0.42)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 animate-fade-in-up">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black hover:text-[#FF7900] text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="mt-6 mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-black tracking-tight">
            Register New Startup
          </h1>

          <p className="text-black mt-3 text-sm">
            Provide your venture information for AI-powered evaluation and analysis.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#FCFAF5]/95 border border-[#F2CF7E]/40 rounded-3xl p-8 shadow-xl space-y-6 backdrop-blur-sm"
        >

        {/* Startup Name */}
        <div>
          <label
            htmlFor="create-name"
            className="flex items-center gap-2 text-sm font-semibold text-black mb-2"
          >
            <Rocket className="w-4 h-4 text-[#FF7900]" />
            <span>Startup Name</span>
          </label>

          <input
            id="create-name"
            type="text"
            required
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            placeholder="e.g. OrbitAI, FinFlow"
            className="w-full px-4 py-3 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-xl text-black placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/40 focus:border-[#FFBF00] transition-all"
          />
        </div>

        {/* Industry + Market */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label
              htmlFor="create-industry"
              className="flex items-center gap-2 text-sm font-semibold text-black mb-2"
            >
              <Briefcase className="w-4 h-4 text-[#FF7900]" />
              <span>Industry</span>
            </label>

            <input
              id="create-industry"
              type="text"
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="FinTech, Healthcare, SaaS"
              className="w-full px-4 py-3 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-xl text-black placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/40 focus:border-[#FFBF00]"
            />
          </div>

          <div>
            <label
              htmlFor="create-market"
              className="flex items-center gap-2 text-sm font-semibold text-black mb-2"
            >
              <Compass className="w-4 h-4 text-[#FF7900]" />
              <span>Target Market</span>
            </label>

            <input
              id="create-market"
              type="text"
              required
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              placeholder="SMBs, Enterprises, Students"
              className="w-full px-4 py-3 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-xl text-black placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/40 focus:border-[#FFBF00]"
            />
          </div>

        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="create-desc"
            className="flex items-center gap-2 text-sm font-semibold text-black mb-2"
          >
            <FileText className="w-4 h-4 text-[#FF7900]" />
            <span>Idea Description</span>
          </label>

          <textarea
            id="create-desc"
            required
            rows={7}
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
            placeholder="Describe your startup, problem solved, customer segment, revenue model, and unique value proposition."
            className="w-full px-4 py-3 bg-[#F9F6EE] border border-[#F2CF7E]/40 rounded-xl text-black placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/40 focus:border-[#FFBF00] resize-none"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">

          <div className="flex items-center gap-2 text-sm text-black">
            <Sparkles className="w-4 h-4 text-[#FF7900]" />
            <span>7 AI agents will evaluate your startup</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-[#FFBF00] hover:bg-[#FFE642] text-black font-bold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Registering...' : 'Create Startup'}
          </button>

        </div>

        </form>
      </div>

    </div>
  );
};

export default CreateStartupPage;
