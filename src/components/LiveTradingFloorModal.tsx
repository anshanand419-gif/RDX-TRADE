import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { UPI_CONFIG } from '../data/tradingData';
import {
  X,
  Radio,
  TrendingUp,
  Volume2,
  Video,
  Download,
  ExternalLink,
  Instagram,
  LogOut,
  Users,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

export const LiveTradingFloorModal: React.FC = () => {
  const { isLiveTradingFloorOpen, closeLiveTradingFloor, currentUserAccess, logoutLiveAccess, showToast } = useTrading();
  const [activeTab, setActiveTab] = useState<'stream' | 'levels' | 'vault'>('stream');

  if (!isLiveTradingFloorOpen || !currentUserAccess) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#080c14] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[95vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-[#05080f] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE FLOOR ACTIVE</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-heading font-bold text-white">TRADING WITH RDX</span>
              <span className="text-xs text-slate-400 ml-2">· {currentUserAccess.planName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logoutLiveAccess}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
              title="Lock and sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Session</span>
            </button>
            <button
              onClick={closeLiveTradingFloor}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Member Status Banner */}
        <div className="px-6 py-2.5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Authenticated Member:</span>
            <span className="font-semibold text-white">{currentUserAccess.studentName}</span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-emerald-400 font-semibold">{currentUserAccess.key}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Valid Until: <span className="text-slate-200">{new Date(currentUserAccess.expiresAt).toLocaleDateString()}</span></span>
            <span className="text-slate-600">|</span>
            <a
              href={UPI_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <Instagram className="w-3 h-3" />
              <span>@{UPI_CONFIG.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Inner Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-[#060910] shrink-0">
          <button
            onClick={() => setActiveTab('stream')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'stream'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Floor Stream &amp; Desk</span>
          </button>
          <button
            onClick={() => setActiveTab('levels')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'levels'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Today's Intraday Levels</span>
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'vault'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>VIP Masterclass Vault</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'stream' && (
            <div className="space-y-6">
              {/* Simulated Live Streaming Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                  <div className="relative aspect-video bg-black flex items-center justify-center">
                    <img
                      src="/src/assets/images/course_price_action_1792054218118.jpg"
                      alt="Live Chart Stream"
                      className="w-full h-full object-cover opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-rose-600/90 text-white text-[11px] font-bold rounded-md uppercase tracking-wider shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      <span>BROADCASTING LIVE</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm text-slate-200 text-xs font-mono rounded-md">
                      482 Traders In Room
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Volume2 className="w-4 h-4 animate-bounce" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Audio Commentary Active</div>
                          <div className="text-[11px] text-slate-400">"BankNifty 52,200 CE breaking out above 5-min VWAP..."</div>
                        </div>
                      </div>
                      <a
                        href="https://meet.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg flex items-center gap-1.5 shrink-0"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Open Meet Screen</span>
                      </a>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Session Lead:</span>
                      <span className="font-semibold text-white">RDX Lead Market Analyst</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-semibold">Today's Win Rate: 4/4 Setups Hit Target</span>
                    </div>
                  </div>
                </div>

                {/* Live Room Community Chat & Action Feed */}
                <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col h-[380px] justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white mb-3 pb-2 border-b border-slate-800 flex items-center justify-between">
                      <span>Live Trade Execution Feed</span>
                      <span className="text-[10px] text-emerald-400 font-mono">LIVE UPDATES</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                        <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold mb-1">
                          <span>NIFTY 24,850 CALL BUY</span>
                          <span>9:42 AM</span>
                        </div>
                        <p className="text-slate-300 text-[11px]">
                          Trigger: Break of 15m ORB high. SL: 24,810. Target: 24,920. Risk-Reward 1:2.8.
                        </p>
                      </div>

                      <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                        <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold mb-1">
                          <span>BANKNIFTY SMC ORDER BLOCK</span>
                          <span>10:15 AM</span>
                        </div>
                        <p className="text-slate-300 text-[11px]">
                          Price tapped 15-minute bullish order block at 52,100 with long lower wick rejection.
                        </p>
                      </div>

                      <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                        <div className="flex items-center justify-between text-[11px] text-cyan-400 font-semibold mb-1">
                          <span>TRAILING SL ALERT</span>
                          <span>10:48 AM</span>
                        </div>
                        <p className="text-slate-300 text-[11px]">
                          Lock 80% profits on Nifty 24,850 CE. Trail remaining position to Cost price.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* VIP Community Join Button */}
                  <div className="pt-3 border-t border-slate-800">
                    <a
                      href={UPI_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 flex items-center justify-center gap-1.5"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Join VIP Broadcast on @{UPI_CONFIG.instagramHandle}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'levels' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NIFTY 50 Levels */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-bold text-white">NIFTY 50 KEY LEVELS</h4>
                      <p className="text-xs text-slate-400">Institutional Intraday Pivot Blueprint</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                      BULLISH BIAS
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Major Resistance 2 (Target 2):</span>
                      <span className="font-mono font-bold text-rose-400">24,960.00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Resistance 1 (Target 1):</span>
                      <span className="font-mono font-bold text-rose-300">24,910.00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Breakout Trigger Level:</span>
                      <span className="font-mono font-bold text-emerald-400">Above 24,860.00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Central Pivot Range (CPR):</span>
                      <span className="font-mono font-bold text-amber-300">24,780.00 - 24,800.00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Support 1 (Strict Stop Zone):</span>
                      <span className="font-mono font-bold text-emerald-300">24,730.00</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Major Demand / Order Block:</span>
                      <span className="font-mono font-bold text-emerald-500">24,680.00</span>
                    </div>
                  </div>
                </div>

                {/* BANKNIFTY Levels */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-bold text-white">BANKNIFTY KEY LEVELS</h4>
                      <p className="text-xs text-slate-400">High Volatility Intraday Index</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                      EXPANSION MODE
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Major Resistance 2:</span>
                      <span className="font-mono font-bold text-rose-400">52,650.00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Resistance 1:</span>
                      <span className="font-mono font-bold text-rose-300">52,400.00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Breakout Trigger Level:</span>
                      <span className="font-mono font-bold text-emerald-400">Above 52,250.00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Central Pivot Range (CPR):</span>
                      <span className="font-mono font-bold text-amber-300">52,050.00 - 52,100.00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Support 1 (Strict Stop Zone):</span>
                      <span className="font-mono font-bold text-emerald-300">51,850.00</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Institutional FVG Rebalance:</span>
                      <span className="font-mono font-bold text-emerald-500">51,620.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vault' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">
                  Exclusive VIP Materials &amp; Archives Unlocked
                </h4>
                <p className="text-xs text-slate-400">
                  As an authenticated live student, all masterclass session recordings, SMC PDFs, and proprietary indicator-free price action templates are available for your personal study.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-white">Full Live Session Video Archive (2026)</div>
                    <div className="text-[11px] text-slate-400">42 Hours of Screen Recordings &amp; Trade Audits</div>
                  </div>
                  <button
                    onClick={() => showToast('Streaming archive player opening...', 'success')}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
                  >
                    Watch
                  </button>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-white">Proprietary SMC Order Block Scanner Notes</div>
                    <div className="text-[11px] text-slate-400">PDF Guide &amp; PineScript Algorithm Logic</div>
                  </div>
                  <button
                    onClick={() => showToast('Downloading VIP PDF notes...', 'success')}
                    className="px-3 py-1.5 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
