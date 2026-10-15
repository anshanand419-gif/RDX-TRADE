import React from 'react';
import { useTrading } from '../context/TradingContext';
import { ArrowRight, Key, ShieldCheck, Zap, Instagram, Sparkles, BookOpen, TrendingUp } from 'lucide-react';
import { UPI_CONFIG } from '../data/tradingData';

export const Hero: React.FC = () => {
  const { openUnlockKeyModal, openPaymentModal } = useTrading();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-900">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-emerald-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-4 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Institutional Price Action &amp; Live Trading Hub</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">2026 Curriculum</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-[1.15] text-balance mb-6">
              Trade with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">RDX Edge</span>: Trending Books, Tactical PDFs &amp; Live Floor.
            </h1>

            {/* Body */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Everything serious intraday and swing traders need: master the greatest trading books in history, download high-winrate candlestick cheat sheets, and trade live alongside experienced mentors every morning.
            </p>

            {/* Live Course Spotlight Strip */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl mb-8 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                    Special Live Course Access
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <span className="font-semibold text-white">2 Months: <span className="text-emerald-400 font-mono-numbers">₹99</span></span>
                    <span className="text-slate-600">|</span>
                    <span className="font-semibold text-white">5 Months: <span className="text-emerald-400 font-mono-numbers">₹399</span></span>
                    <span className="text-slate-600">|</span>
                    <span className="font-semibold text-white">1 Year: <span className="text-emerald-400 font-mono-numbers">₹799</span></span>
                  </div>
                </div>

                <a
                  href="#live-course"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-emerald-500/20"
                >
                  <span>View Plans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#live-course"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 whitespace-nowrap"
              >
                <span>Enroll in Live Course</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={openUnlockKeyModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl transition-colors whitespace-nowrap"
              >
                <Key className="w-4 h-4 text-emerald-400" />
                <span>Enter Secret Access Key</span>
              </button>

              <a
                href={UPI_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow @{UPI_CONFIG.instagramHandle}</span>
              </a>
            </div>

            {/* Editorial trust markers without pills */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400 border-t border-slate-800/80 pt-4">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Genuine UTR Verification</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant Secret Key Delivery</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Official Updates: @{UPI_CONFIG.instagramHandle}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dominant Visual Carrier */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-black/80 group">
              <img
                src="/src/assets/images/hero_trading_desk_1792054217980.jpg"
                alt="Professional Trading Desk with Candlestick Charts"
                className="w-full h-80 sm:h-96 lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/30 to-transparent" />

              {/* Overlay card for Live trading floor */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>LIVE TRADING FLOOR ACTIVE</span>
                    </div>
                    <div className="text-xs text-slate-300">
                      Nifty 50 &amp; BankNifty 5-Min Price Action Breakout
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono-numbers font-bold text-white">9:15 AM - 3:30 PM</div>
                    <div className="text-[11px] text-slate-400">Daily Live Room</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
