import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { LIVE_PLANS, UPI_CONFIG } from '../data/tradingData';
import { LivePlan } from '../types';
import { Check, ShieldCheck, QrCode, Key, ArrowRight, Zap, Lock, Sparkles, UserCheck } from 'lucide-react';

export const LiveCourseSection: React.FC = () => {
  const { openPaymentModal, openUnlockKeyModal, unlockWithKey, currentUserAccess, openLiveTradingFloor } = useTrading();
  const [inlineKey, setInlineKey] = useState('');
  const [inlineKeyError, setInlineKeyError] = useState('');

  const handleInlineUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setInlineKeyError('');
    if (!inlineKey.trim()) {
      setInlineKeyError('Please enter your access key');
      return;
    }
    const res = unlockWithKey(inlineKey);
    if (!res.success) {
      setInlineKeyError(res.message);
    } else {
      setInlineKey('');
    }
  };

  return (
    <section id="live-course" className="py-16 lg:py-24 bg-[#070b13] border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Special Live Mentorship &amp; Trading Floor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight mb-4 text-balance">
            Live Market Execution with RDX Mentors
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Trade alongside seasoned floor traders in real time. Transparent plans at unbeatable rates: 
            <span className="text-emerald-400 font-semibold"> 2 Months for ₹99</span>, 
            <span className="text-emerald-400 font-semibold"> 5 Months for ₹399</span>, and 
            <span className="text-emerald-400 font-semibold"> 1 Year for ₹799</span>. 
            Direct UPI scanner payment with bank UTR security verification and random secret access keys.
          </p>
        </div>

        {/* Access Key Instant Unlock Box */}
        <div className="max-w-2xl mx-auto mb-16 p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-emerald-500/30 rounded-2xl shadow-xl shadow-emerald-950/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Key className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Already have your Secret Access Key?</h3>
                <p className="text-xs text-slate-400">Received your key from owner after UTR verification? Enter it here.</p>
              </div>
            </div>

            {currentUserAccess ? (
              <button
                onClick={openLiveTradingFloor}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                Open Live Trading Room
              </button>
            ) : (
              <form onSubmit={handleInlineUnlock} className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="text"
                  placeholder="e.g. RDX-XXXX-XXXX-XXXX"
                  value={inlineKey}
                  onChange={(e) => {
                    setInlineKey(e.target.value);
                    setInlineKeyError('');
                  }}
                  className="px-3.5 py-2 text-xs font-mono uppercase bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 min-w-[200px]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
                >
                  Unlock
                </button>
              </form>
            )}
          </div>
          {inlineKeyError && (
            <p className="mt-2 text-xs text-rose-400 text-left sm:text-right">{inlineKeyError}</p>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {LIVE_PLANS.map((plan) => {
            const isYearly = plan.id === 'plan_1yr';
            const isFiveMonths = plan.id === 'plan_5m';

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isYearly
                    ? 'bg-gradient-to-b from-slate-900 to-[#0c1424] border-2 border-emerald-500/80 shadow-2xl shadow-emerald-500/10'
                    : isFiveMonths
                    ? 'bg-slate-900/90 border border-amber-500/40 shadow-xl shadow-amber-500/5'
                    : 'bg-slate-900/70 border border-slate-800'
                } p-6 sm:p-8`}
              >
                {/* Top Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-6 px-3 py-1 text-[11px] font-bold tracking-wide uppercase rounded-md bg-emerald-500 text-slate-950 shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {plan.duration}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    {plan.durationLabel}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-800">
                    <span className="text-4xl sm:text-5xl font-mono-numbers font-extrabold text-white">
                      ₹{plan.priceInr}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      ₹{plan.originalPriceInr}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium ml-auto">
                      {Math.round(((plan.originalPriceInr - plan.priceInr) / plan.originalPriceInr) * 100)}% OFF
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Included in Plan:
                    </div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => openPaymentModal(plan)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-md ${
                      isYearly
                        ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 shadow-emerald-500/20'
                        : isFiveMonths
                        ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-500/20'
                        : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan UPI &amp; Submit UTR (₹{plan.priceInr})</span>
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2.5">
                    UPI ID: <span className="font-mono text-slate-400">{UPI_CONFIG.upiId}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works: 4-Step Verification Guide */}
        <div className="p-6 sm:p-8 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-lg font-heading font-bold text-white mb-2">
              How UTR Verification &amp; Secret Key Works
            </h3>
            <p className="text-xs text-slate-400">
              Zero fake entries. Every banking transaction is verified for genuine settlement before the random access key is generated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs mb-3">
                1
              </div>
              <h4 className="text-xs font-semibold text-white mb-1.5">Scan UPI QR</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Scan the official QR code for Mukesh Kumar (<span className="font-mono text-slate-300">{UPI_CONFIG.upiId}</span>) using GPay, PhonePe, or Paytm.
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs mb-3">
                2
              </div>
              <h4 className="text-xs font-semibold text-white mb-1.5">Submit 12-Digit UTR</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Input your 12-digit transaction reference number. Automated security validates the length and rejects fake or duplicate patterns.
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs mb-3">
                3
              </div>
              <h4 className="text-xs font-semibold text-white mb-1.5">Owner Verifies Settlement</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Owner checks banking settlement in the Owner Portal (accessible from any phone) and approves the verified transaction.
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs mb-3">
                4
              </div>
              <h4 className="text-xs font-semibold text-white mb-1.5">Receive Random Key</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Get your non-predictable access key (e.g. <span className="font-mono text-emerald-400">RDX-9X7K-...</span>) via WhatsApp / Instagram to enter and unlock!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
