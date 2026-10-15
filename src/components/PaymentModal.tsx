import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { UPI_CONFIG, LIVE_PLANS } from '../data/tradingData';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, ShieldCheck, QrCode, AlertCircle, ArrowRight, Instagram, PhoneCall, ExternalLink } from 'lucide-react';
import { LivePlan } from '../types';

export const PaymentModal: React.FC = () => {
  const { activePaymentPlan, closePaymentModal, submitPaymentUtr, showToast } = useTrading();

  const [selectedPlanId, setSelectedPlanId] = useState<'plan_2m' | 'plan_5m' | 'plan_1yr'>(
    activePaymentPlan ? activePaymentPlan.id : 'plan_2m'
  );

  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [validationError, setValidationError] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    submissionId: string;
    studentName: string;
    phone: string;
    utrNumber: string;
    amount: number;
    planName: string;
  } | null>(null);

  if (!activePaymentPlan && !submissionSuccess) return null;

  const currentPlan = LIVE_PLANS.find((p) => p.id === selectedPlanId) || LIVE_PLANS[0];

  // Real UPI intent string for one-tap payments on mobile
  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(UPI_CONFIG.upiId)}&pn=${encodeURIComponent(
    UPI_CONFIG.payeeName
  )}&am=${currentPlan.priceInr}&cu=INR&tn=${encodeURIComponent(
    `TRADING_WITH_RDX_${currentPlan.duration}`
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_CONFIG.upiId);
    setCopiedUpi(true);
    showToast(`Copied UPI ID: ${UPI_CONFIG.upiId}`, 'success');
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const res = submitPaymentUtr({
      studentName,
      phone,
      email,
      planId: selectedPlanId,
      utrNumber,
    });

    if (!res.success) {
      setValidationError(res.error || 'Submission failed');
    } else {
      setSubmissionSuccess({
        submissionId: res.submissionId!,
        studentName,
        phone,
        utrNumber,
        amount: currentPlan.priceInr,
        planName: currentPlan.durationLabel,
      });
    }
  };

  const handleClose = () => {
    setSubmissionSuccess(null);
    setValidationError('');
    closePaymentModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060910]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              RDX
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-white">
                Official UPI Payment &amp; UTR Verification
              </h3>
              <p className="text-[11px] text-slate-400">
                100% Genuine Settlement · High Security Anti-Fake Check
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submissionSuccess ? (
          /* Submission Receipt / Confirmation View */
          <div className="p-6 sm:p-8">
            <div className="text-center max-w-md mx-auto mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-heading font-bold text-white mb-1">
                Payment UTR Registered!
              </h4>
              <p className="text-xs text-slate-300">
                Your 12-digit banking reference has passed our security checks. The owner will now verify bank settlement and issue your unique random secret key.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5 text-xs mb-6">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Submission ID:</span>
                <span className="font-mono text-slate-200">{submissionSuccess.submissionId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Student Name:</span>
                <span className="font-semibold text-white">{submissionSuccess.studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Selected Plan:</span>
                <span className="text-emerald-400 font-medium">{submissionSuccess.planName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-mono-numbers font-bold text-white">₹{submissionSuccess.amount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Submitted UTR:</span>
                <span className="font-mono text-amber-400 font-semibold">{submissionSuccess.utrNumber}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Status:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 uppercase tracking-wide">
                  PENDING SETTLEMENT VERIFICATION
                </span>
              </div>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-slate-300 space-y-2 mb-6">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Next Step to Get Your Secret Key:</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                The owner (Mukesh Kumar) checks the portal regularly to approve verified UTRs. For instant priority key delivery, you can message your UTR directly on Instagram <span className="font-semibold text-white">@{UPI_CONFIG.instagramHandle}</span> or check with the owner!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/91${submissionSuccess.phone}?text=${encodeURIComponent(
                  `Hi Mukesh Sir, I have submitted payment for TRADING WITH RDX (${submissionSuccess.planName}) with UTR ${submissionSuccess.utrNumber}. Please verify and share my Access Key.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2"
              >
                <span>Notify via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={UPI_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 flex items-center justify-center gap-2"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Message on @{UPI_CONFIG.instagramHandle}</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Payment & UTR Form */
          <div className="p-6">
            {/* Plan Selector Bar */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Select Course Duration Plan:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {LIVE_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedPlanId === plan.id
                        ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] font-semibold">{plan.duration}</div>
                    <div className="text-base font-bold font-mono-numbers text-white mt-0.5">
                      ₹{plan.priceInr}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left: Authentic Scanner Card */}
              <div className="md:col-span-5 flex flex-col items-center bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5">
                {/* Payee Avatar & Name matching user's uploaded QR */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm">
                    M
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">{UPI_CONFIG.payeeName}</div>
                    <div className="text-[10px] text-slate-400">Verified Merchant Payee</div>
                  </div>
                </div>

                {/* Real Scannable High-Res QR Code */}
                <div className="p-3 bg-white rounded-xl shadow-md mb-3 flex items-center justify-center">
                  <QRCodeSVG
                    value={upiIntentUrl}
                    size={170}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234285F4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
                      x: undefined,
                      y: undefined,
                      height: 28,
                      width: 28,
                      excavate: true,
                    }}
                  />
                </div>

                {/* UPI ID Display & Copy */}
                <div className="w-full flex items-center justify-between p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono mb-2">
                  <span className="text-slate-300 truncate mr-2">{UPI_CONFIG.upiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="p-1 hover:text-emerald-400 text-slate-400 transition-colors shrink-0"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-center mb-3">
                  Scan to pay <span className="font-bold text-white font-mono-numbers">₹{currentPlan.priceInr}</span> with any UPI app
                </div>

                {/* Direct One-Tap Mobile Payment */}
                <a
                  href={upiIntentUrl}
                  className="w-full py-2 px-3 text-center text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
                >
                  Pay with UPI App
                </a>
              </div>

              {/* Right: Real UTR Submission Form */}
              <div className="md:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mukesh Kumar"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        WhatsApp Mobile No. <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Email Address <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-slate-300">
                        12-Digit Real Banking UTR Number <span className="text-emerald-400">*</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {utrNumber.length}/12 digits
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={18}
                      placeholder="e.g. 428819401823"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value.trim())}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs tracking-wider focus:outline-none focus:border-emerald-400"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Find the 12-digit UPI Transaction ID / UTR in PhonePe, GPay, or Paytm payment receipt details.
                    </p>
                  </div>

                  {validationError && (
                    <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-start gap-2 text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Submit Real UTR for Key Verification (₹{currentPlan.priceInr})</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 text-center">
                    Strict anti-fraud policy: Fake, repetitive, or duplicate UTR entries are automatically flagged and rejected.
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
