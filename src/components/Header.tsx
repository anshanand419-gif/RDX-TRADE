import React from 'react';
import { useTrading } from '../context/TradingContext';
import { Instagram, Shield, Key, Sparkles, BookOpen, FileText, Video, Calculator, CheckCircle2 } from 'lucide-react';
import { UPI_CONFIG } from '../data/tradingData';

export const Header: React.FC = () => {
  const {
    openOwnerPortal,
    openUnlockKeyModal,
    openLiveTradingFloor,
    currentUserAccess,
  } = useTrading();

  return (
    <header className="sticky top-0 z-40 bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-lg font-heading font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="font-heading font-black text-xs text-[#080c14]">RDX</span>
            </div>
            <span className="tracking-wide">TRADING WITH <span className="text-emerald-400">RDX</span></span>
          </a>

          {/* Zone 2: 4–5 single-line clean nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#live-course"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Special Live Course
            </a>
            <a
              href="#trending-books"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Trending Books
            </a>
            <a
              href="#trading-pdfs"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              PDFs &amp; Cheatsheets
            </a>
            <a
              href="#masterclasses"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Masterclasses
            </a>
            <a
              href="#risk-calculator"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Risk Calculator
            </a>
            <a
              href={UPI_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
              title="Official Instagram"
            >
              <Instagram className="w-4 h-4" />
              <span>@{UPI_CONFIG.instagramHandle}</span>
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUserAccess ? (
              <button
                onClick={openLiveTradingFloor}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-emerald-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Live Floor Unlocked</span>
              </button>
            ) : (
              <button
                onClick={openUnlockKeyModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enter Key</span>
              </button>
            )}

            <button
              onClick={openOwnerPortal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-transparent hover:border-slate-800"
              title="Owner / Admin Portal to verify UTR and generate Keys"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Owner Portal</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
