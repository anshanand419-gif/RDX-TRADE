import React, { createContext, useContext, useState, useEffect } from 'react';
import { PaymentSubmission, AccessKeyRecord, LivePlan, Book, PDFItem, Course } from '../types';
import { validateUTR, generateRandomAccessKey, calculateExpirationDate } from '../utils/security';
import { LIVE_PLANS } from '../data/tradingData';

interface TradingContextType {
  // Bookmarks
  savedItems: string[];
  toggleSaveItem: (id: string) => void;
  isItemSaved: (id: string) => boolean;

  // Payments & Submissions
  submissions: PaymentSubmission[];
  submitPaymentUtr: (params: {
    studentName: string;
    phone: string;
    email: string;
    planId: 'plan_2m' | 'plan_5m' | 'plan_1yr';
    utrNumber: string;
  }) => { success: boolean; error?: string; submissionId?: string };

  // Owner Actions
  verifySubmissionAndGenerateKey: (submissionId: string) => { success: boolean; key?: string; error?: string };
  rejectSubmission: (submissionId: string, reason?: string) => void;
  generateManualKey: (params: {
    studentName: string;
    phone: string;
    email: string;
    planId: 'plan_2m' | 'plan_5m' | 'plan_1yr';
  }) => string;
  revokeKey: (key: string) => void;

  // Keys & User Live Access
  activeKeys: AccessKeyRecord[];
  currentUserAccess: AccessKeyRecord | null;
  unlockWithKey: (key: string) => { success: boolean; message: string; access?: AccessKeyRecord };
  logoutLiveAccess: () => void;

  // Modals & Navigation
  activePaymentPlan: LivePlan | null;
  openPaymentModal: (plan: LivePlan) => void;
  closePaymentModal: () => void;

  isOwnerPortalOpen: boolean;
  openOwnerPortal: () => void;
  closeOwnerPortal: () => void;

  isUnlockKeyModalOpen: boolean;
  openUnlockKeyModal: () => void;
  closeUnlockKeyModal: () => void;

  isLiveTradingFloorOpen: boolean;
  openLiveTradingFloor: () => void;
  closeLiveTradingFloor: () => void;

  activeBookReader: Book | null;
  openBookReader: (book: Book) => void;
  closeBookReader: () => void;

  activePdfViewer: PDFItem | null;
  openPdfViewer: (pdf: PDFItem) => void;
  closePdfViewer: () => void;

  activeCoursePlayer: Course | null;
  openCoursePlayer: (course: Course) => void;
  closeCoursePlayer: () => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

const STORAGE_KEY_SUBMISSIONS = 'rdx_trading_submissions_v2';
const STORAGE_KEY_KEYS = 'rdx_trading_keys_v2';
const STORAGE_KEY_SAVED = 'rdx_trading_saved_v2';
const STORAGE_KEY_USER_ACCESS = 'rdx_trading_current_access_v2';

export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Saved bookmarks
  const [savedItems, setSavedItems] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED);
      return stored ? JSON.parse(stored) : ['trading-in-the-zone', 'candlestick-bible-2026'];
    } catch {
      return ['trading-in-the-zone', 'candlestick-bible-2026'];
    }
  });

  // Submissions list
  const [submissions, setSubmissions] = useState<PaymentSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    // Initial realistic demo submissions for the owner portal
    return [
      {
        id: 'sub_demo_1',
        studentName: 'Rahul Verma',
        phone: '9876543210',
        email: 'rahul.verma@gmail.com',
        planId: 'plan_1yr',
        planName: '1 Year Institutional Mastery (₹799)',
        amountInr: 799,
        utrNumber: '428819401823',
        submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'PENDING_VERIFICATION',
      },
      {
        id: 'sub_demo_2',
        studentName: 'Amit Sharma',
        phone: '9123456780',
        email: 'amit.sharma@outlook.com',
        planId: 'plan_5m',
        planName: '5 Months Live Mentorship (₹399)',
        amountInr: 399,
        utrNumber: '428790314891',
        submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        status: 'VERIFIED',
        generatedKey: 'RDX-9K2F-48XM-7QL3',
        verifiedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'sub_demo_3',
        studentName: 'Priya Nair',
        phone: '9988776655',
        email: 'priya.nair@gmail.com',
        planId: 'plan_2m',
        planName: '2 Months Live Access (₹99)',
        amountInr: 99,
        utrNumber: '428651239845',
        submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        status: 'VERIFIED',
        generatedKey: 'RDX-3P8W-91TY-5HN2',
        verifiedAt: new Date(Date.now() - 3600000 * 11).toISOString(),
      },
    ];
  });

  // Active Keys registry
  const [activeKeys, setActiveKeys] = useState<AccessKeyRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_KEYS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        key: 'RDX-9K2F-48XM-7QL3',
        studentName: 'Amit Sharma',
        phone: '9123456780',
        email: 'amit.sharma@outlook.com',
        planId: 'plan_5m',
        planName: '5 Months Live Mentorship',
        utrNumber: '428790314891',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        expiresAt: calculateExpirationDate('plan_5m'),
        isActive: true,
        timesUsed: 3,
      },
      {
        key: 'RDX-3P8W-91TY-5HN2',
        studentName: 'Priya Nair',
        phone: '9988776655',
        email: 'priya.nair@gmail.com',
        planId: 'plan_2m',
        planName: '2 Months Live Access',
        utrNumber: '428651239845',
        createdAt: new Date(Date.now() - 3600000 * 11).toISOString(),
        expiresAt: calculateExpirationDate('plan_2m'),
        isActive: true,
        timesUsed: 1,
      },
    ];
  });

  // Current logged in student access
  const [currentUserAccess, setCurrentUserAccess] = useState<AccessKeyRecord | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER_ACCESS);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Modals state
  const [activePaymentPlan, setActivePaymentPlan] = useState<LivePlan | null>(null);
  const [isOwnerPortalOpen, setIsOwnerPortalOpen] = useState(false);
  const [isUnlockKeyModalOpen, setIsUnlockKeyModalOpen] = useState(false);
  const [isLiveTradingFloorOpen, setIsLiveTradingFloorOpen] = useState(false);
  const [activeBookReader, setActiveBookReader] = useState<Book | null>(null);
  const [activePdfViewer, setActivePdfViewer] = useState<PDFItem | null>(null);
  const [activeCoursePlayer, setActiveCoursePlayer] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_KEYS, JSON.stringify(activeKeys));
  }, [activeKeys]);

  useEffect(() => {
    if (currentUserAccess) {
      localStorage.setItem(STORAGE_KEY_USER_ACCESS, JSON.stringify(currentUserAccess));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER_ACCESS);
    }
  }, [currentUserAccess]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const toggleSaveItem = (id: string) => {
    setSavedItems((prev) => {
      const isSaved = prev.includes(id);
      if (isSaved) {
        showToast('Removed from your saved library', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your personal trading library', 'success');
        return [...prev, id];
      }
    });
  };

  const isItemSaved = (id: string) => savedItems.includes(id);

  // Submit UTR with real verification checks
  const submitPaymentUtr = (params: {
    studentName: string;
    phone: string;
    email: string;
    planId: 'plan_2m' | 'plan_5m' | 'plan_1yr';
    utrNumber: string;
  }) => {
    const { studentName, phone, email, planId, utrNumber } = params;

    if (!studentName.trim()) {
      return { success: false, error: 'Please enter your full name.' };
    }
    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number for key delivery.' };
    }
    if (!email.trim() || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // High security validation on UTR
    const validation = validateUTR(utrNumber, submissions);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    const plan = LIVE_PLANS.find((p) => p.id === planId) || LIVE_PLANS[0];
    const newSubmission: PaymentSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      studentName: studentName.trim(),
      phone: cleanPhone,
      email: email.trim().toLowerCase(),
      planId,
      planName: `${plan.durationLabel} (₹${plan.priceInr})`,
      amountInr: plan.priceInr,
      utrNumber: validation.normalizedUtr,
      submittedAt: new Date().toISOString(),
      status: 'PENDING_VERIFICATION',
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    showToast('Payment UTR submitted! Owner verification is now underway.', 'success');
    return { success: true, submissionId: newSubmission.id };
  };

  // Owner action: Verify UTR & generate non-predictable unique random key
  const verifySubmissionAndGenerateKey = (submissionId: string) => {
    const submission = submissions.find((s) => s.id === submissionId);
    if (!submission) {
      return { success: false, error: 'Submission not found' };
    }

    if (submission.status === 'VERIFIED' && submission.generatedKey) {
      return { success: true, key: submission.generatedKey };
    }

    // Generate non-predictable random key
    const newKey = generateRandomAccessKey();
    const expiresAt = calculateExpirationDate(submission.planId);

    const keyRecord: AccessKeyRecord = {
      key: newKey,
      studentName: submission.studentName,
      phone: submission.phone,
      email: submission.email,
      planId: submission.planId,
      planName: submission.planName,
      utrNumber: submission.utrNumber,
      createdAt: new Date().toISOString(),
      expiresAt,
      isActive: true,
      timesUsed: 0,
    };

    // Update submissions
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? {
              ...sub,
              status: 'VERIFIED',
              generatedKey: newKey,
              verifiedAt: new Date().toISOString(),
            }
          : sub
      )
    );

    // Save active key
    setActiveKeys((prev) => [keyRecord, ...prev.filter((k) => k.key !== newKey)]);

    showToast(`Access Key ${newKey} generated successfully!`, 'success');
    return { success: true, key: newKey };
  };

  // Owner action: Reject fake or invalid UTR
  const rejectSubmission = (submissionId: string, reason?: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? {
              ...sub,
              status: 'REJECTED',
              notes: reason || 'Invalid or unverified banking reference.',
            }
          : sub
      )
    );
    showToast('Submission marked as rejected.', 'info');
  };

  // Owner manual key generation
  const generateManualKey = (params: {
    studentName: string;
    phone: string;
    email: string;
    planId: 'plan_2m' | 'plan_5m' | 'plan_1yr';
  }) => {
    const plan = LIVE_PLANS.find((p) => p.id === params.planId) || LIVE_PLANS[0];
    const newKey = generateRandomAccessKey();
    const expiresAt = calculateExpirationDate(params.planId);

    const keyRecord: AccessKeyRecord = {
      key: newKey,
      studentName: params.studentName || 'VIP Trader',
      phone: params.phone || '',
      email: params.email || '',
      planId: params.planId,
      planName: `${plan.durationLabel} (₹${plan.priceInr})`,
      utrNumber: 'MANUAL_OWNER_PROVISION',
      createdAt: new Date().toISOString(),
      expiresAt,
      isActive: true,
      timesUsed: 0,
    };

    setActiveKeys((prev) => [keyRecord, ...prev]);
    showToast(`Manual Access Key created: ${newKey}`, 'success');
    return newKey;
  };

  const revokeKey = (key: string) => {
    setActiveKeys((prev) =>
      prev.map((k) => (k.key === key ? { ...k, isActive: false } : k))
    );
    if (currentUserAccess?.key === key) {
      setCurrentUserAccess(null);
    }
    showToast(`Access Key ${key} has been revoked.`, 'info');
  };

  // Student unlocks live course with Key
  const unlockWithKey = (keyInput: string) => {
    const cleanKey = keyInput.trim().toUpperCase();
    if (!cleanKey) {
      return { success: false, message: 'Please enter your Access Key.' };
    }

    const matchedKey = activeKeys.find(
      (k) => k.key.toUpperCase() === cleanKey && k.isActive
    );

    if (!matchedKey) {
      return {
        success: false,
        message: 'Invalid or expired Access Key. Please check the spelling or contact owner on Instagram @griffin.arnav002.',
      };
    }

    // Check expiration
    if (new Date(matchedKey.expiresAt) < new Date()) {
      return {
        success: false,
        message: `This Access Key expired on ${new Date(matchedKey.expiresAt).toLocaleDateString()}. Please renew your Live Course subscription.`,
      };
    }

    // Increment usage
    setActiveKeys((prev) =>
      prev.map((k) => (k.key === matchedKey.key ? { ...k, timesUsed: k.timesUsed + 1 } : k))
    );

    setCurrentUserAccess(matchedKey);
    setIsUnlockKeyModalOpen(false);
    setIsLiveTradingFloorOpen(true);
    showToast(`Welcome ${matchedKey.studentName}! Live Course & Trading Floor unlocked.`, 'success');
    return { success: true, message: 'Access granted!', access: matchedKey };
  };

  const logoutLiveAccess = () => {
    setCurrentUserAccess(null);
    setIsLiveTradingFloorOpen(false);
    showToast('Logged out of Live Course session.', 'info');
  };

  return (
    <TradingContext.Provider
      value={{
        savedItems,
        toggleSaveItem,
        isItemSaved,
        submissions,
        submitPaymentUtr,
        verifySubmissionAndGenerateKey,
        rejectSubmission,
        generateManualKey,
        revokeKey,
        activeKeys,
        currentUserAccess,
        unlockWithKey,
        logoutLiveAccess,
        activePaymentPlan,
        openPaymentModal: (plan) => setActivePaymentPlan(plan),
        closePaymentModal: () => setActivePaymentPlan(null),
        isOwnerPortalOpen,
        openOwnerPortal: () => setIsOwnerPortalOpen(true),
        closeOwnerPortal: () => setIsOwnerPortalOpen(false),
        isUnlockKeyModalOpen,
        openUnlockKeyModal: () => setIsUnlockKeyModalOpen(true),
        closeUnlockKeyModal: () => setIsUnlockKeyModalOpen(false),
        isLiveTradingFloorOpen,
        openLiveTradingFloor: () => setIsLiveTradingFloorOpen(true),
        closeLiveTradingFloor: () => setIsLiveTradingFloorOpen(false),
        activeBookReader,
        openBookReader: (book) => setActiveBookReader(book),
        closeBookReader: () => setActiveBookReader(null),
        activePdfViewer,
        openPdfViewer: (pdf) => setActivePdfViewer(pdf),
        closePdfViewer: () => setActivePdfViewer(null),
        activeCoursePlayer,
        openCoursePlayer: (course) => setActiveCoursePlayer(course),
        closeCoursePlayer: () => setActiveCoursePlayer(null),
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};
