import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { knowledgeAPI } from '../api/api';
import { toast } from 'react-hot-toast';
import { User, Mail, Shield, Upload, Search, Database, Sparkles } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();

  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadContent, setUploadContent] = useState('');
  const [uploading, setUploading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadTitle || !uploadContent) {
      toast.error('Please enter a title and content');
      return;
    }

    setUploading(true);
    try {
      await knowledgeAPI.uploadDocument(uploadTitle, uploadContent);
      toast.success('Document ingested into knowledge base!');
      setUploadTitle('');
      setUploadContent('');
    } catch (err) {
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) {
      toast.error('Please enter a search query');
      return;
    }

    setSearching(true);
    try {
      const results = await knowledgeAPI.searchKnowledge(searchQuery);
      setSearchResults(results);
      toast.success('Search completed');
    } catch (err) {
      toast.error('Failed to search knowledge base');
    } finally {
      setSearching(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Settings & Profile
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Manage your account and AI knowledge base.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB7C5]/10 to-[#F2C7C7]/10 border border-[#FFB7C5]/20 flex items-center justify-center font-extrabold text-2xl text-[#FFB7C5] mb-4">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2 className="text-xl font-bold text-white">{user.fullName}</h2>
            <span className="text-[10px] px-2.5 py-0.5 bg-[#FFB7C5]/10 text-[#FFB7C5] border border-[#FFB7C5]/20 rounded-full font-bold mt-1.5 uppercase tracking-wider">
              Founder
            </span>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-800/80">
            <div className="flex items-center gap-3 text-sm text-zinc-305">
              <User className="w-4 h-4 text-zinc-500" />
              <div>
                <span className="text-[10px] font-semibold text-zinc-500 block uppercase tracking-wider">Full Name</span>
                <span>{user.fullName}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-305">
              <Mail className="w-4 h-4 text-zinc-500" />
              <div>
                <span className="text-[10px] font-semibold text-zinc-500 block uppercase tracking-wider">Email</span>
                <span>{user.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-305">
              <Shield className="w-4 h-4 text-zinc-500" />
              <div>
                <span className="text-[10px] font-semibold text-zinc-500 block uppercase tracking-wider">Tier</span>
                <span>Enterprise Suite</span>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 lg:p-8 rounded-xl md:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#FFB7C5]" />
              <h3 className="text-lg font-bold text-white">RAG Knowledge Base</h3>
            </div>
            <p className="text-zinc-500 text-xs mt-1">
              Upload documents to ground AI agent reasoning with your proprietary data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-zinc-800/60">
            {/* Upload */}
            <form onSubmit={handleUpload} className="space-y-4">
              <h4 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Upload className="w-4 h-4 text-[#FFB7C5]" />
                <span>Upload Document</span>
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Document Title"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="block w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/50 text-sm"
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Paste reference text or document content..."
                  value={uploadContent}
                  onChange={(e) => setUploadContent(e.target.value)}
                  className="block w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/50 text-sm resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full flex justify-center items-center gap-1.5 py-2.5 px-4 bg-[#FFB7C5] hover:bg-[#F2C7C7] font-semibold text-zinc-950 rounded-xl text-xs transition-colors disabled:opacity-50 cursor-pointer shadow-md shadow-[#FFB7C5]/10"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {uploading ? 'Processing...' : 'Ingest Document'}
                </button>
              </div>
            </form>

            {/* Search */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Search className="w-4 h-4 text-[#FFB7C5]" />
                <span>Query Knowledge</span>
              </h4>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Ask a question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]/50 text-sm"
                />
                <button
                  type="submit"
                  disabled={searching}
                  className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
                >
                  {searching ? '...' : <Search className="w-4 h-4" />}
                </button>
              </form>

              {/* Results */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 max-h-[220px] overflow-y-auto">
                <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Semantic Matches
                </h5>
                {searchResults ? (
                  typeof searchResults === 'string' ? (
                    <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">{searchResults}</p>
                  ) : Array.isArray(searchResults) ? (
                    searchResults.length > 0 ? (
                      <ul className="space-y-2">
                        {searchResults.map((res, idx) => (
                          <li key={idx} className="text-xs text-zinc-300 p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg">
                            {typeof res === 'string' ? res : JSON.stringify(res)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-zinc-500 italic">No matches found.</p>
                    )
                  ) : (
                    <pre className="text-xs text-zinc-300 overflow-x-auto">{JSON.stringify(searchResults, null, 2)}</pre>
                  )
                ) : (
                  <p className="text-xs text-zinc-500 italic">Run a search to retrieve knowledge chunks.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
