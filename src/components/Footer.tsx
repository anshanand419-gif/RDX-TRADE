import React from 'react';
import { useTrading } from '../context/TradingContext';
import { UPI_CONFIG } from '../data/tradingData';
import { Instagram, Shield, Key } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openOwnerPortal, openUnlockKeyModal } = useTrading();

  return (
    <footer className="bg-[#05080f] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center font-black text-[10px] text-slate-950">
                RDX
              </div>
              <span className="font-heading font-extrabold text-white text-base tracking-wide">
                TRADING WITH RDX
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Premium trading education, trending literature summaries, high-winrate PDFs, and daily live market execution rooms.
            </p>
            <a
              href={UPI_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium"
            >
              <Instagram className="w-4 h-4" />
              <span>@{UPI_CONFIG.instagramHandle}</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Special Live Course
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#live-course" className="hover:text-emerald-400 transition-colors">
                  2 Months Pass — ₹99
                </a>
              </li>
              <li>
                <a href="#live-course" className="hover:text-emerald-400 transition-colors">
                  5 Months Mentorship — ₹399
                </a>
              </li>
              <li>
                <a href="#live-course" className="hover:text-emerald-400 transition-colors">
                  1 Year Mastery — ₹799
                </a>
              </li>
              <li>
                <button onClick={openUnlockKeyModal} className="hover:text-emerald-400 transition-colors text-left">
                  Enter Secret Access Key
                </button>
              </li>
            </ul>
          </div>

          {/* Library Links */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Trading Library
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#trending-books" className="hover:text-emerald-400 transition-colors">
                  Trading in the Zone (Summary)
                </a>
              </li>
              <li>
                <a href="#trending-books" className="hover:text-emerald-400 transition-colors">
                  Japanese Candlesticks (Steve Nison)
                </a>
              </li>
              <li>
                <a href="#trading-pdfs" className="hover:text-emerald-400 transition-colors">
                  Candlestick Pattern Bible (PDF)
                </a>
              </li>
              <li>
                <a href="#trading-pdfs" className="hover:text-emerald-400 transition-colors">
                  Smart Money Concepts (SMC) Sheet
                </a>
              </li>
              <li>
                <a href="#risk-calculator" className="hover:text-emerald-400 transition-colors">
                  Position Sizing Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Owner & Security */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Owner Administration
            </div>
            <p className="text-slate-400 text-xs mb-3">
              Admin &amp; owner can verify submitted banking UTRs and generate customer access keys from any phone or browser.
            </p>
            <button
              onClick={openOwnerPortal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open Owner Admin Portal</span>
            </button>
            <div className="text-[11px] text-slate-500 mt-2">
              UPI Payee: Mukesh Kumar ({UPI_CONFIG.upiId})
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; 2026 TRADING WITH RDX. All rights reserved. Follow @{UPI_CONFIG.instagramHandle} for live updates.
          </div>
          <div className="max-w-xl text-center md:text-right">
            Disclaimer: Trading in stocks, options, and futures involves substantial risk of loss and is not suitable for every investor. All content provided is for educational and illustrative purposes only.
          </div>
        </div>
      </div>
    </footer>
  );
};
