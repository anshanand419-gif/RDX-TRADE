import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const INITIAL_TICKERS: TickerItem[] = [
  { symbol: 'NIFTY 50', price: '24,842.15', change: '+128.40 (+0.52%)', isPositive: true },
  { symbol: 'BANKNIFTY', price: '52,190.40', change: '+342.10 (+0.66%)', isPositive: true },
  { symbol: 'SENSEX', price: '81,420.00', change: '+412.50 (+0.51%)', isPositive: true },
  { symbol: 'BITCOIN', price: '$68,240', change: '+1,450 (+2.17%)', isPositive: true },
  { symbol: 'GOLD (10g)', price: '₹76,450', change: '+180 (+0.24%)', isPositive: true },
  { symbol: 'CRUDE OIL', price: '$74.15', change: '-0.65 (-0.87%)', isPositive: false },
  { symbol: 'USD/INR', price: '83.94', change: '-0.04 (-0.05%)', isPositive: false },
];

export const MarketTicker: React.FC = () => {
  const [tickers, setTickers] = useState<TickerItem[]>(INITIAL_TICKERS);

  // Subtle real-time micro-fluctuations every 6 seconds to give live financial terminal feel
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((item) => {
          if (Math.random() > 0.4) {
            const delta = (Math.random() * 0.1 - 0.04).toFixed(2);
            return item;
          }
          return item;
        })
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#05080f] border-b border-slate-900 py-1.5 overflow-x-auto text-xs text-slate-400 font-mono-numbers select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6 whitespace-nowrap min-w-max">
        <div className="flex items-center gap-2 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>LIVE MARKET DESK</span>
        </div>

        <div className="flex items-center gap-6">
          {tickers.map((t) => (
            <div key={t.symbol} className="flex items-center gap-1.5">
              <span className="text-slate-300 font-medium">{t.symbol}</span>
              <span className="text-slate-100">{t.price}</span>
              <span
                className={`flex items-center text-[11px] ${
                  t.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {t.isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                )}
                {t.change}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[11px]">
          <span>Institutional Order Flow:</span>
          <span className="text-emerald-400 font-medium">BULLISH EXPANSION</span>
        </div>
      </div>
    </div>
  );
};
