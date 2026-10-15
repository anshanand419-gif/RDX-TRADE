import React, { useState } from 'react';
import { Instagram, Copy, Check, ExternalLink, MessageCircle, Sparkles, TrendingUp, Users } from 'lucide-react';
import { UPI_CONFIG } from '../data/tradingData';
import { useTrading } from '../context/TradingContext';

export const CommunitySection: React.FC = () => {
  const { showToast } = useTrading();
  const [copied, setCopied] = useState(false);

  const handleCopyHandle = () => {
    navigator.clipboard.writeText(UPI_CONFIG.instagramHandle);
    setCopied(true);
    showToast(`Copied Instagram ID: @${UPI_CONFIG.instagramHandle}`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#080c14] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#0d1627] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
            {/* Left Column: Instagram Info */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                <Instagram className="w-4 h-4" />
                <span>Official Trader Network &amp; Broadcast</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight mb-4">
                Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400">@{UPI_CONFIG.instagramHandle}</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Get daily live market updates, breakout alerts, verified PnL proofs, and exclusive course discount drops. For any doubts regarding UTR verification or access key generation, connect directly with our mentor.
              </p>

              {/* Handle action bar */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <a
                  href={UPI_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 rounded-xl transition-all shadow-lg shadow-pink-500/20 whitespace-nowrap"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Open Instagram Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyHandle}
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-colors whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied @{UPI_CONFIG.instagramHandle}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Handle</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Updates Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Daily 8:45 AM Stories</span>
                  </div>
                  <div className="text-slate-400">
                    Nifty &amp; BankNifty critical pivot levels, CPR range, and global cues breakdown before market open.
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>Key Delivery Support</span>
                  </div>
                  <div className="text-slate-400">
                    Direct DM assistance if you need help verifying your UTR or getting your Access Key activated.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Community Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                <img
                  src="/src/assets/images/community_trader_room_1792054218776.jpg"
                  alt="Trader Community Workspace"
                  className="w-full h-72 sm:h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      RDX
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">@{UPI_CONFIG.instagramHandle}</div>
                      <div className="text-[11px] text-slate-300">Official RDX Community &amp; Updates</div>
                    </div>
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
