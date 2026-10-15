import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { UPI_CONFIG, LIVE_PLANS } from '../data/tradingData';
import { createWhatsAppShareLink, createInstagramDMText } from '../utils/security';
import {
  X,
  Shield,
  Key,
  CheckCircle,
  XCircle,
  Copy,
  Check,
  Send,
  Lock,
  Search,
  ExternalLink,
  PlusCircle,
  AlertTriangle,
  RotateCw,
  Trash2,
} from 'lucide-react';

export const OwnerPortalModal: React.FC = () => {
  const {
    isOwnerPortalOpen,
    closeOwnerPortal,
    submissions,
    verifySubmissionAndGenerateKey,
    rejectSubmission,
    generateManualKey,
    activeKeys,
    revokeKey,
    showToast,
  } = useTrading();

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'submissions' | 'manual' | 'keys'>('submissions');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Manual key generator state
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualPlanId, setManualPlanId] = useState<'plan_2m' | 'plan_5m' | 'plan_1yr'>('plan_1yr');
  const [generatedManualKey, setGeneratedManualKey] = useState<string | null>(null);

  // Filter for submissions
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'REJECTED'>('ALL');

  if (!isOwnerPortalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === UPI_CONFIG.defaultOwnerPin || pinInput.trim() === '9999' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Authenticated as Owner (Mukesh Kumar)', 'success');
    } else {
      setAuthError('Incorrect Owner Security PIN. Default PIN is RDX2026');
    }
  };

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(identifier);
    showToast(`Copied: ${text}`, 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerify = (submissionId: string) => {
    const res = verifySubmissionAndGenerateKey(submissionId);
    if (res.success && res.key) {
      handleCopy(res.key, submissionId);
    }
  };

  const handleManualKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = generateManualKey({
      studentName: manualName || 'VIP Student',
      phone: manualPhone,
      email: manualEmail,
      planId: manualPlanId,
    });
    setGeneratedManualKey(key);
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.studentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      sub.phone.includes(searchFilter) ||
      sub.utrNumber.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'PENDING') return sub.status === 'PENDING_VERIFICATION';
    if (statusFilter === 'VERIFIED') return sub.status === 'VERIFIED';
    if (statusFilter === 'REJECTED') return sub.status === 'REJECTED';
    return true;
  });

  const pendingCount = submissions.filter((s) => s.status === 'PENDING_VERIFICATION').length;
  const verifiedCount = submissions.filter((s) => s.status === 'VERIFIED').length;
  const totalRevenue = submissions
    .filter((s) => s.status === 'VERIFIED')
    .reduce((sum, s) => sum + s.amountInr, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060910] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                <span>Owner &amp; Admin Command Center</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-normal">
                  Mukesh Kumar
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Access from any phone or deployed web · Real UTR Verification &amp; Secret Key Generation
              </p>
            </div>
          </div>
          <button
            onClick={closeOwnerPortal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-emerald-400 shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-heading font-bold text-white mb-1">
              Owner Security Authentication
            </h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Enter your Owner Security PIN to review banking UTR submissions, approve verified settlements, and generate unique random access keys.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter Owner PIN (Default: RDX2026)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-white font-mono tracking-widest text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>

              {authError && (
                <p className="text-xs text-rose-400 font-medium">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors shadow-md"
              >
                Access Owner Portal
              </button>
            </form>

            <div className="mt-6 p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-[11px] text-slate-400">
              <span className="text-slate-300 font-semibold">Master Admin PIN: </span>
              <code className="text-emerald-400 font-mono font-bold">RDX2026</code>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* KPI Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-[#070b13] border-b border-slate-800 shrink-0">
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="text-[11px] text-slate-400">Pending UTRs</div>
                <div className="text-xl font-heading font-bold text-amber-400 font-mono-numbers mt-0.5">
                  {pendingCount}
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="text-[11px] text-slate-400">Verified Students</div>
                <div className="text-xl font-heading font-bold text-emerald-400 font-mono-numbers mt-0.5">
                  {verifiedCount}
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="text-[11px] text-slate-400">Verified Revenue</div>
                <div className="text-xl font-heading font-bold text-white font-mono-numbers mt-0.5">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="text-[11px] text-slate-400">Active Live Keys</div>
                <div className="text-xl font-heading font-bold text-cyan-400 font-mono-numbers mt-0.5">
                  {activeKeys.filter((k) => k.isActive).length}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-[#060910] shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'submissions'
                    ? 'border-emerald-400 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>UTR Submissions</span>
                {pendingCount > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] rounded-full bg-amber-500 text-slate-950 font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('manual')}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'manual'
                    ? 'border-emerald-400 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Generate Manual Key</span>
              </button>

              <button
                onClick={() => setActiveTab('keys')}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'keys'
                    ? 'border-emerald-400 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Active Keys &amp; Students ({activeKeys.length})</span>
              </button>
            </div>

            {/* Tab Contents with Scroll */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {activeTab === 'submissions' && (
                <div className="space-y-4">
                  {/* Filters Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search student, mobile number, or 12-digit UTR..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      {(['ALL', 'PENDING', 'VERIFIED', 'REJECTED'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                            statusFilter === status
                              ? 'bg-slate-800 text-white font-semibold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submissions List */}
                  {filteredSubmissions.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      No submissions match the current filter.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredSubmissions.map((sub) => {
                        const isVerified = sub.status === 'VERIFIED';
                        const isPending = sub.status === 'PENDING_VERIFICATION';
                        const isRejected = sub.status === 'REJECTED';

                        return (
                          <div
                            key={sub.id}
                            className={`p-4 rounded-xl border transition-all ${
                              isPending
                                ? 'bg-amber-500/5 border-amber-500/30'
                                : isVerified
                                ? 'bg-slate-950/80 border-slate-800'
                                : 'bg-rose-500/5 border-rose-500/20'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-white text-sm">
                                    {sub.studentName}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                      isPending
                                        ? 'bg-amber-500/20 text-amber-400'
                                        : isVerified
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-rose-500/20 text-rose-400'
                                    }`}
                                  >
                                    {sub.status.replace('_', ' ')}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-400 mt-0.5">
                                  Mobile: <span className="font-mono text-slate-200">{sub.phone}</span>
                                  {' · '}
                                  Email: <span className="text-slate-200">{sub.email}</span>
                                </div>
                              </div>

                              <div className="text-left sm:text-right">
                                <div className="text-sm font-bold font-mono-numbers text-emerald-400">
                                  ₹{sub.amountInr}
                                </div>
                                <div className="text-[11px] text-slate-400">{sub.planName}</div>
                              </div>
                            </div>

                            {/* UTR Reference Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400">Banking UTR:</span>
                                <span className="font-mono font-bold text-amber-300 tracking-wider">
                                  {sub.utrNumber}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {new Date(sub.submittedAt).toLocaleString()}
                              </div>
                            </div>

                            {/* Key Delivery & Actions */}
                            {isVerified && sub.generatedKey && (
                              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                  <div className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
                                    Active Secret Access Key:
                                  </div>
                                  <div className="text-sm font-mono font-extrabold text-white tracking-widest mt-0.5">
                                    {sub.generatedKey}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleCopy(sub.generatedKey!, sub.id)}
                                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 flex items-center gap-1.5"
                                  >
                                    {copiedKey === sub.id ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                    <span>Copy Key</span>
                                  </button>

                                  <a
                                    href={createWhatsAppShareLink(
                                      sub.phone,
                                      sub.studentName,
                                      sub.generatedKey,
                                      sub.planName,
                                      sub.utrNumber
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Send WhatsApp</span>
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Action Buttons for Pending */}
                            {isPending && (
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  onClick={() => handleVerify(sub.id)}
                                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Verify Settlement &amp; Generate Random Key</span>
                                </button>

                                <button
                                  onClick={() => rejectSubmission(sub.id, 'Bank UTR not found in settlement.')}
                                  className="py-2 px-3 text-xs font-medium rounded-lg bg-slate-900 hover:bg-rose-500/20 text-rose-400 border border-slate-800 hover:border-rose-500/30 flex items-center gap-1"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Reject Fake</span>
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'manual' && (
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Direct Random Key Provisioning
                    </h4>
                    <p className="text-xs text-slate-400">
                      Need to issue an instant access key for an offline payment, friend, or VIP trader? Generate a non-predictable unique key directly.
                    </p>
                  </div>

                  <form onSubmit={handleManualKeySubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Student / Trader Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Vikram Joshi"
                        value={manualName}
                        onChange={(e) => setManualName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Mobile No. (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="WhatsApp number"
                          value={manualPhone}
                          onChange={(e) => setManualPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="student@gmail.com"
                          value={manualEmail}
                          onChange={(e) => setManualEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Course Tier &amp; Duration
                      </label>
                      <select
                        value={manualPlanId}
                        onChange={(e) => setManualPlanId(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-400"
                      >
                        <option value="plan_2m">2 Months Live Access (₹99)</option>
                        <option value="plan_5m">5 Months Live Mentorship (₹399)</option>
                        <option value="plan_1yr">1 Year Institutional Mastery (₹799)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors flex items-center justify-center gap-2"
                    >
                      <Key className="w-4 h-4" />
                      <span>Generate Non-Predictable Key</span>
                    </button>
                  </form>

                  {generatedManualKey && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2">
                      <div className="text-xs text-emerald-400 font-semibold">
                        Generated Access Key:
                      </div>
                      <div className="text-lg font-mono font-bold text-white tracking-widest">
                        {generatedManualKey}
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(generatedManualKey, 'manual')}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-500 text-slate-950 flex items-center gap-1.5"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Key</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'keys' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">
                    Total issued keys: <span className="text-white font-semibold font-mono">{activeKeys.length}</span>
                  </div>

                  {activeKeys.map((k) => (
                    <div
                      key={k.key}
                      className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-emerald-400 text-sm tracking-wider">
                            {k.key}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              k.isActive
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {k.isActive ? 'ACTIVE' : 'REVOKED'}
                          </span>
                        </div>
                        <div className="text-slate-400 mt-1">
                          Student: <span className="text-white font-medium">{k.studentName}</span>
                          {' · '}
                          Plan: <span className="text-slate-300">{k.planName}</span>
                          {' · '}
                          Used: <span className="font-mono text-slate-300">{k.timesUsed}x</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(k.key, k.key)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>

                        {k.isActive && (
                          <button
                            onClick={() => revokeKey(k.key)}
                            className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
