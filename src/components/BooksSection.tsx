import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { TRENDING_BOOKS } from '../data/tradingData';
import { Book } from '../types';
import { BookOpen, Star, Download, Bookmark, BookmarkCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BooksSection: React.FC = () => {
  const { openBookReader, toggleSaveItem, isItemSaved, showToast } = useTrading();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Trending Books' },
    { id: 'psychology', label: 'Mindset & Psychology' },
    { id: 'price-action', label: 'Price Action & SMC' },
    { id: 'technical', label: 'Technical Analysis' },
    { id: 'classics', label: 'Wall Street Classics' },
  ];

  const filteredBooks = selectedCategory === 'all'
    ? TRENDING_BOOKS
    : TRENDING_BOOKS.filter((b) => b.category === selectedCategory);

  const handleSimulatedDownload = (book: Book) => {
    // Generate clean text-based file download
    const content = `TRADING WITH RDX - ESSENTIAL BOOK SUMMARY\n\nTitle: ${book.title}\nAuthor: ${book.author}\nYear: ${book.year}\nRating: ${book.rating}/5.0\n\nDESCRIPTION:\n${book.description}\n\nCORE TAKEAWAYS:\n${book.keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nKEY TRADING PRINCIPLES:\n${book.corePrinciples.map((p) => `* ${p.title}:\n  ${p.explanation}`).join('\n\n')}\n\nEXCERPT & LESSONS:\n${book.excerpt}\n\n---\nOfficial Updates & Community Instagram: @griffin.arnav002\nTRADING WITH RDX - Live Mentorship`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = book.downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded summary for "${book.title}"!`, 'success');
  };

  return (
    <section id="trending-books" className="py-16 lg:py-24 bg-[#080c14] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Essential Literature Library</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight">
              Trending Trading Books &amp; Summaries
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              Curated masterworks on market psychology, price action, tape reading, and liquidity that professional traders study. Read online or download summary blueprints.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBooks.map((book) => {
            const isSaved = isItemSaved(book.id);

            return (
              <div
                key={book.id}
                className="bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1"
              >
                <div>
                  {/* Top bar on card */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      {book.badge && (
                        <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                          {book.badge}
                        </div>
                      )}
                      <h3 className="text-lg font-heading font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {book.title}
                      </h3>
                      <div className="text-xs text-slate-400 mt-0.5">by {book.author}</div>
                    </div>

                    <button
                      onClick={() => toggleSaveItem(book.id)}
                      className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                      title={isSaved ? 'Remove from saved' : 'Save to library'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Clean unboxed metadata with separators (no pill badges) */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
                    <span className="flex items-center text-amber-400 font-mono-numbers">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {book.rating}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono-numbers">{book.pages} pages</span>
                    <span className="text-slate-600">·</span>
                    <span>{book.year}</span>
                    <span className="text-slate-600">·</span>
                    <span className="capitalize">{book.category}</span>
                  </div>

                  {/* Book Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-5 line-clamp-3">
                    {book.description}
                  </p>

                  {/* Key takeaways highlights */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Key Principle:
                    </div>
                    <div className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{book.keyTakeaways[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => openBookReader(book)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Read Summary</span>
                  </button>

                  <button
                    onClick={() => handleSimulatedDownload(book)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                    title="Download summary blueprint"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
