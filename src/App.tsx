/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TradingProvider, useTrading } from './context/TradingContext';
import { Header } from './components/Header';
import { MarketTicker } from './components/MarketTicker';
import { Hero } from './components/Hero';
import { LiveCourseSection } from './components/LiveCourseSection';
import { BooksSection } from './components/BooksSection';
import { PdfsSection } from './components/PdfsSection';
import { CoursesSection } from './components/CoursesSection';
import { RiskCalculator } from './components/RiskCalculator';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';

// Modals
import { PaymentModal } from './components/PaymentModal';
import { OwnerPortalModal } from './components/OwnerPortalModal';
import { UnlockKeyModal } from './components/UnlockKeyModal';
import { LiveTradingFloorModal } from './components/LiveTradingFloorModal';
import { BookReaderModal } from './components/BookReaderModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { CoursePlayerModal } from './components/CoursePlayerModal';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toastMessage } = useTrading();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-fade-in">
      <div
        className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-medium border ${
          toastMessage.type === 'success'
            ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
            : toastMessage.type === 'error'
            ? 'bg-rose-950/90 text-rose-200 border-rose-500/40'
            : 'bg-slate-900/95 text-slate-200 border-slate-700'
        }`}
      >
        {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
        {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
        {toastMessage.type === 'info' && <Info className="w-4 h-4 text-cyan-400 shrink-0" />}
        <span className="flex-1">{toastMessage.text}</span>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <MarketTicker />
      <Header />
      <main className="flex-1">
        <Hero />
        <LiveCourseSection />
        <BooksSection />
        <PdfsSection />
        <CoursesSection />
        <RiskCalculator />
        <CommunitySection />
      </main>
      <Footer />

      {/* Interactive Modals */}
      <PaymentModal />
      <OwnerPortalModal />
      <UnlockKeyModal />
      <LiveTradingFloorModal />
      <BookReaderModal />
      <PdfViewerModal />
      <CoursePlayerModal />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <TradingProvider>
      <MainContent />
    </TradingProvider>
  );
}
