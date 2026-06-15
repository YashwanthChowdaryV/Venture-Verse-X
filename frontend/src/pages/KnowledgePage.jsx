import React, { useState } from 'react';
import { knowledgeAPI } from '../api/api';
import { toast } from 'react-hot-toast';
import { Database, Upload, Search, Sparkles, BookOpen, FileText } from 'lucide-react';

const KnowledgePage = () => {
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

  return (
    <div className="space-y-8 animate-fade-in-up max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Grounding Knowledge Base
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Ground AI agent reasoning with your private documents, investment thesis, and market indexes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload Column */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#FFB7C5]" />
              <h3 className="text-base font-bold text-white">Ingest Context</h3>
            </div>
            <p className="text-xs text-zinc-500">
              Provide context documents for the AI agents to leverage.
            </p>
          </div>

          <form onSubmit={handleUpload} className="space-y-4 pt-4 border-t border-zinc-805">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Document Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Q3 SaaS Market Sizing Report"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="block w-full px-3.5 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#FFB7C5]/40 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FFB7C5]/30 text-sm transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Content Description</label>
              <textarea
                required
                rows={6}
                placeholder="Paste reference text or document paragraphs..."
                value={uploadContent}
                onChange={(e) => setUploadContent(e.target.value)}
                className="block w-full px-3.5 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#FFB7C5]/40 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FFB7C5]/30 text-sm transition-all resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full flex justify-center items-center gap-1.5 py-3 px-4 bg-[#FFB7C5] hover:bg-[#F2C7C7] text-zinc-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md shadow-[#FFB7C5]/10 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{uploading ? 'Ingesting Context...' : 'Ingest Document'}</span>
            </button>
          </form>
        </div>

        {/* Query & Search Column */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-[#FFB7C5]" />
              <h3 className="text-base font-bold text-white">Semantic Search</h3>
            </div>
            <p className="text-xs text-zinc-500">
              Query ingested context using Qdrant vector search matching.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2.5 pt-4 border-t border-zinc-805">
            <input
              type="text"
              required
              placeholder="Ask a question of your database..."
              value={searchQuery}
              onChange={(e) => searchQuery && setSearchQuery(e.target.value)}
              className="flex-1 px-3.5 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#FFB7C5]/40 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FFB7C5]/30 text-sm transition-all"
            />
            <button
              type="submit"
              disabled={searching}
              className="px-5 py-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Results Console */}
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-zinc-600" />
                <span>Vector DB Console</span>
              </span>
              {searchResults && (
                <span className="text-[9px] px-1.5 py-0.5 bg-[#FFB7C5]/10 text-[#FFB7C5] border border-[#FFB7C5]/20 rounded font-bold uppercase tracking-wider">
                  Success
                </span>
              )}
            </div>
            <div className="max-h-[260px] overflow-y-auto min-h-[120px] flex flex-col justify-center">
              {searchResults ? (
                typeof searchResults === 'string' ? (
                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line text-left w-full">{searchResults}</p>
                ) : Array.isArray(searchResults) ? (
                  searchResults.length > 0 ? (
                    <ul className="space-y-3 text-left w-full">
                      {searchResults.map((res, idx) => (
                        <li key={idx} className="text-xs text-zinc-300 p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex items-start gap-2.5">
                          <FileText className="w-4 h-4 text-[#FFB7C5] flex-shrink-0 mt-0.5" />
                          <span>{typeof res === 'string' ? res : JSON.stringify(res)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-zinc-500 italic text-center py-6 w-full">No matches found in the knowledge database.</p>
                  )
                ) : (
                  <pre className="text-xs text-zinc-300 overflow-x-auto text-left w-full">{JSON.stringify(searchResults, null, 2)}</pre>
                )
              ) : (
                <div className="text-center py-6 space-y-1 text-zinc-500">
                  <Database className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                  <p className="text-xs font-semibold">Ready for Queries</p>
                  <p className="text-[10px]">Your query matches will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgePage;
