import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, AlertCircle, TrendingUp } from 'lucide-react';

export const RiskCalculator: React.FC = () => {
  const [capital, setCapital] = useState<number>(100000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [tradeType, setTradeType] = useState<'LONG' | 'SHORT'>('LONG');
  const [entryPrice, setEntryPrice] = useState<number>(500);
  const [stopLoss, setStopLoss] = useState<number>(490);
  const [targetPrice, setTargetPrice] = useState<number>(530);

  // Calculations
  const riskAmount = (capital * riskPercent) / 100;
  const priceRiskPerShare = tradeType === 'LONG'
    ? Math.max(0.1, entryPrice - stopLoss)
    : Math.max(0.1, stopLoss - entryPrice);

  const priceRewardPerShare = tradeType === 'LONG'
    ? Math.max(0.1, targetPrice - entryPrice)
    : Math.max(0.1, entryPrice - targetPrice);

  const calculatedShares = Math.floor(riskAmount / priceRiskPerShare);
  const totalInvestment = calculatedShares * entryPrice;
  const potentialProfit = calculatedShares * priceRewardPerShare;
  const actualRiskAmount = calculatedShares * priceRiskPerShare;
  const rrRatio = (priceRewardPerShare / priceRiskPerShare).toFixed(2);

  const isGoodTrade = parseFloat(rrRatio) >= 2.0;
  const isInvalidLong = tradeType === 'LONG' && (stopLoss >= entryPrice || targetPrice <= entryPrice);
  const isInvalidShort = tradeType === 'SHORT' && (stopLoss <= entryPrice || targetPrice >= entryPrice);
  const hasError = isInvalidLong || isInvalidShort;

  return (
    <section id="risk-calculator" className="py-16 lg:py-24 bg-[#070b13] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Mathematical Trading Edge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight mb-3">
            Position Sizing &amp; Risk-Reward Calculator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Never guess your lot size. Calculate exact shares, maximum monetary risk, and risk-to-reward ratio based on strict 1% institutional risk management.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Inputs Panel */}
          <div className="md:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Trade Parameters
              </h3>
              {/* Long / Short Switch */}
              <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setTradeType('LONG');
                    if (stopLoss >= entryPrice) setStopLoss(entryPrice - 10);
                    if (targetPrice <= entryPrice) setTargetPrice(entryPrice + 30);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    tradeType === 'LONG'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  LONG (BUY)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTradeType('SHORT');
                    if (stopLoss <= entryPrice) setStopLoss(entryPrice + 10);
                    if (targetPrice >= entryPrice) setTargetPrice(entryPrice - 30);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    tradeType === 'SHORT'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SHORT (SELL)
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Trading Capital (₹)
                </label>
                <input
                  type="number"
                  min="1000"
                  step="5000"
                  value={capital}
                  onChange={(e) => setCapital(Math.max(1000, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono-numbers focus:outline-none focus:border-emerald-400 text-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Max Capital Risk Per Trade: <span className="text-emerald-400 font-mono-numbers">{riskPercent}%</span> (₹{riskAmount.toLocaleString('en-IN')})
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {[0.5, 1.0, 1.5, 2.0].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRiskPercent(r)}
                      className={`flex-1 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                        riskPercent === r
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Entry Price (₹)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono-numbers focus:outline-none focus:border-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Stop Loss (₹)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(Number(e.target.value))}
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-white font-mono-numbers focus:outline-none text-sm ${
                      (tradeType === 'LONG' && stopLoss >= entryPrice) || (tradeType === 'SHORT' && stopLoss <= entryPrice)
                        ? 'border-rose-500 text-rose-300'
                        : 'border-slate-700 focus:border-emerald-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Target Price (₹)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(Number(e.target.value))}
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-white font-mono-numbers focus:outline-none text-sm ${
                      (tradeType === 'LONG' && targetPrice <= entryPrice) || (tradeType === 'SHORT' && targetPrice >= entryPrice)
                        ? 'border-rose-500 text-rose-300'
                        : 'border-slate-700 focus:border-emerald-400'
                    }`}
                  />
                </div>
              </div>

              {hasError && (
                <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {tradeType === 'LONG'
                      ? 'For LONG trades: Stop Loss must be BELOW entry, and Target must be ABOVE entry.'
                      : 'For SHORT trades: Stop Loss must be ABOVE entry, and Target must be BELOW entry.'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
                <span>Calculated Order Sizing</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  isGoodTrade ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {isGoodTrade ? 'HIGH PROBABILITY R:R' : 'SUB-OPTIMAL R:R'}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-400">Position Quantity to Buy:</div>
                  <div className="text-3xl font-heading font-extrabold text-white font-mono-numbers mt-1">
                    {hasError ? '—' : `${calculatedShares.toLocaleString('en-IN')} Units`}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Total required value: ₹{hasError ? '—' : totalInvestment.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                  <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                    <div className="text-[11px] text-rose-300 font-medium">Max Risk (SL):</div>
                    <div className="text-lg font-bold text-rose-400 font-mono-numbers mt-1">
                      -₹{hasError ? '0' : actualRiskAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <div className="text-[11px] text-emerald-300 font-medium">Target Reward:</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono-numbers mt-1">
                      +₹{hasError ? '0' : potentialProfit.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Risk-Reward Ratio:</span>
                  <span className="text-xl font-bold font-mono-numbers text-emerald-400">
                    {hasError ? '—' : `1 : ${rrRatio}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300">RDX Golden Rule:</span> Never execute a trade with an R:R below 1:2.0. With a 1:2 R:R, you can win only 40% of trades and still remain solidly profitable.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
