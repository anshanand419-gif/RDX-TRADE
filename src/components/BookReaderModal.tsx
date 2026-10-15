import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { Book } from '../types';
import { X, BookOpen, Download, Bookmark, BookmarkCheck, Star, Type, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BookReaderModal: React.FC = () => {
  const { activeBookReader, closeBookReader, toggleSaveItem, isItemSaved, showToast } = useTrading();
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [activeTab, setActiveTab] = useState<'summary' | 'principles' | 'chapters' | 'excerpt'>('summary');

  if (!activeBookReader) return null;

  const isSaved = isItemSaved(activeBookReader.id);

  const handleDownload = () => {
    const content = `TRADING WITH RDX - ESSENTIAL BOOK SUMMARY\n\nTitle: ${activeBookReader.title}\nAuthor: ${activeBookReader.author}\nYear: ${activeBookReader.year}\nRating: ${activeBookReader.rating}/5.0\n\nDESCRIPTION:\n${activeBookReader.description}\n\nCORE TAKEAWAYS:\n${activeBookReader.keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nKEY PRINCIPLES:\n${activeBookReader.corePrinciples.map((p) => `* ${p.title}:\n  ${p.explanation}`).join('\n\n')}\n\nEXCERPT & LESSONS:\n${activeBookReader.excerpt}\n\n---\nOfficial Updates: @griffin.arnav002\nTRADING WITH RDX - Live Mentorship`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeBookReader.downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded summary for "${activeBookReader.title}"!`, 'success');
  };

  const fontClass =
    fontSize === 'huge' ? 'text-lg leading-relaxed' : fontSize === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060910] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-white">
                {activeBookReader.title}
              </h3>
              <p className="text-[11px] text-slate-400">
                by {activeBookReader.author} ({activeBookReader.year}) · {activeBookReader.pages} pages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded font-medium ${fontSize === 'large' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                A+
              </button>
            </div>

            <button
              onClick={() => toggleSaveItem(activeBookReader.id)}
              className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800"
              title="Bookmark"
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={handleDownload}
              className="p-1.5 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800"
              title="Download summary"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={closeBookReader}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex items-center gap-2 px-6 pt-2 border-b border-slate-800 bg-[#060910] shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('summary')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'summary' ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Executive Summary
          </button>
          <button
            onClick={() => setActiveTab('principles')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'principles' ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Core Trading Principles
          </button>
          <button
            onClick={() => setActiveTab('excerpt')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'excerpt' ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sample Chapter &amp; Excerpt
          </button>
          <button
            onClick={() => setActiveTab('chapters')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'chapters' ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Table of Contents
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-300">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  Book Overview
                </div>
                <p className={`${fontClass} text-slate-200`}>
                  {activeBookReader.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                  Key Takeaways for Traders
                </h4>
                <div className="space-y-2.5">
                  {activeBookReader.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className={`${fontClass} text-slate-300`}>{takeaway}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'principles' && (
            <div className="space-y-4">
              {activeBookReader.corePrinciples.map((cp, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{cp.title}</span>
                  </div>
                  <p className={`${fontClass} text-slate-300`}>
                    {cp.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'excerpt' && (
            <div className="p-6 bg-slate-950/70 border border-slate-800 rounded-xl">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                Direct Reading Excerpt from "{activeBookReader.title}"
              </div>
              <blockquote className={`${fontClass} text-slate-200 italic space-y-4`}>
                <p>"{activeBookReader.excerpt}"</p>
              </blockquote>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="space-y-2">
              {activeBookReader.chapterList.map((ch, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-xs font-medium text-slate-300 flex items-center justify-between"
                >
                  <span>{ch}</span>
                  <span className="text-slate-500 font-mono">Module {idx + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060910] flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-500">
            For live trade applications of this book, join the Special Live Course.
          </span>
          <button
            onClick={handleDownload}
            className="px-4 py-1.5 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Summary PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
