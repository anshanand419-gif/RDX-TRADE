import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { UPI_CONFIG } from '../data/tradingData';
import { X, Key, CheckCircle, AlertCircle, ArrowRight, Instagram, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const UnlockKeyModal: React.FC = () => {
  const { isUnlockKeyModalOpen, closeUnlockKeyModal, unlockWithKey, activeKeys, openOwnerPortal } = useTrading();
  const [keyInput, setKeyInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isUnlockKeyModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = unlockWithKey(keyInput);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#34D399', '#F59E0B', '#38BDF8'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sampleActiveKey = activeKeys.find((k) => k.isActive);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060910]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-heading font-bold text-white">
              Unlock Live Trading Room
            </h3>
          </div>
          <button
            onClick={closeUnlockKeyModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs text-slate-300 leading-relaxed mb-5">
            Enter the verified random secret access key sent to you by owner Mukesh Kumar after your UTR verification.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Secret Access Key:
              </label>
              <input
                type="text"
                autoFocus
                placeholder="RDX-XXXX-XXXX-XXXX"
                value={keyInput}
                onChange={(e) => {
                  setKeyInput(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-white font-mono uppercase tracking-widest text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2 text-rose-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Verify Key &amp; Enter Live Floor</span>
            </button>
          </form>

          {/* Quick Test Key Helper */}
          {sampleActiveKey && (
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                <span>Quick Test Key (from verified student):</span>
                <button
                  type="button"
                  onClick={() => setKeyInput(sampleActiveKey.key)}
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  Insert Key
                </button>
              </div>
              <code className="text-xs font-mono text-slate-300 bg-slate-950 px-2 py-1 rounded block text-center border border-slate-800">
                {sampleActiveKey.key}
              </code>
            </div>
          )}

          <div className="mt-4 text-center">
            <a
              href={UPI_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Need your key? Message on @{UPI_CONFIG.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
