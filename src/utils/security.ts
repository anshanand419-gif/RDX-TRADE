import { PaymentSubmission, AccessKeyRecord } from '../types';

/**
 * Validates UTR / Transaction Reference Number with high-security rules
 * Indian UPI UTR numbers are 12 digits (numeric). IMPS/NEFT can be 12-22 alphanumeric.
 */
export function validateUTR(utr: string, existingSubmissions: PaymentSubmission[]): {
  isValid: boolean;
  error?: string;
  normalizedUtr: string;
} {
  const trimmed = utr.trim().replace(/\s+/g, '');

  if (!trimmed) {
    return { isValid: false, error: 'UTR number cannot be empty', normalizedUtr: '' };
  }

  // Check length: standard UPI is 12 digits, banking references can be up to 18
  if (trimmed.length < 12 || trimmed.length > 18) {
    return {
      isValid: false,
      error: 'Invalid UTR length. Real UPI UTR numbers are exactly 12 digits (or 16-18 for IMPS/NEFT).',
      normalizedUtr: trimmed,
    };
  }

  // Reject obvious fake repeating sequences (e.g., 000000000000, 111111111111, 999999999999)
  const isAllSameChar = /^(\w)\1+$/.test(trimmed);
  if (isAllSameChar) {
    return {
      isValid: false,
      error: 'Security alert: Detected fake repetitive UTR. Please enter your real banking UTR number.',
      normalizedUtr: trimmed,
    };
  }

  // Reject obvious ascending/descending sequences (e.g., 123456789012, 012345678901)
  const isAscending = '01234567890123456789'.includes(trimmed);
  const isDescending = '98765432109876543210'.includes(trimmed);
  if (isAscending || isDescending) {
    return {
      isValid: false,
      error: 'Security alert: Detected fake sequential UTR pattern. Real bank references are random.',
      normalizedUtr: trimmed,
    };
  }

  // Standard UPI check: if 12 characters, must be numeric
  if (trimmed.length === 12 && !/^\d{12}$/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Invalid format. A 12-character UPI UTR must contain only numbers from your payment app.',
      normalizedUtr: trimmed,
    };
  }

  // Check for duplicates in existing submissions
  const isDuplicate = existingSubmissions.some(
    (sub) => sub.utrNumber.toLowerCase() === trimmed.toLowerCase()
  );
  if (isDuplicate) {
    return {
      isValid: false,
      error: 'This UTR number has already been submitted in the system. Duplicate submissions are flagged.',
      normalizedUtr: trimmed,
    };
  }

  return { isValid: true, normalizedUtr: trimmed };
}

/**
 * Generates a cryptographically random, non-predictable access key
 * Format: RDX-XXXX-XXXX-XXXX
 */
export function generateRandomAccessKey(): string {
  // Use crypto.getRandomValues for true non-predictable randomness
  const charset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude ambiguous chars like 0, O, 1, I
  const segments: string[] = [];

  for (let s = 0; s < 3; s++) {
    let segment = '';
    const randomBytes = new Uint8Array(4);
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(randomBytes);
      for (let i = 0; i < 4; i++) {
        segment += charset[randomBytes[i] % charset.length];
      }
    } else {
      for (let i = 0; i < 4; i++) {
        segment += charset[Math.floor(Math.random() * charset.length)];
      }
    }
    segments.push(segment);
  }

  return `RDX-${segments.join('-')}`;
}

/**
 * Calculates plan expiration date based on duration
 */
export function calculateExpirationDate(planId: 'plan_2m' | 'plan_5m' | 'plan_1yr'): string {
  const now = new Date();
  if (planId === 'plan_2m') {
    now.setMonth(now.getMonth() + 2);
  } else if (planId === 'plan_5m') {
    now.setMonth(now.getMonth() + 5);
  } else if (planId === 'plan_1yr') {
    now.setFullYear(now.getFullYear() + 1);
  }
  return now.toISOString();
}

/**
 * Prepares direct WhatsApp message for the owner to send to student
 */
export function createWhatsAppShareLink(
  phone: string,
  studentName: string,
  key: string,
  planName: string,
  utr: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  // Format international number (default India +91 if 10 digits)
  const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

  const message = `Namaste ${studentName}! 🚀\n\nYour payment for *TRADING WITH RDX - ${planName}* has been verified!\n\n📋 *Payment UTR:* ${utr}\n🔑 *Your Secret Access Key:* \n*${key}*\n\n👉 *How to Access:*\n1. Visit TRADING WITH RDX website\n2. Click "Enter Access Key" on the Live Course section\n3. Paste your key to unlock the Live Trading Floor & VIP Materials!\n\nFor any live doubts, follow our official Instagram: @griffin.arnav002\n\nWelcome to the RDX Trading Community! 🔥`;

  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Prepares Instagram DM template text for the owner to copy
 */
export function createInstagramDMText(
  studentName: string,
  key: string,
  planName: string
): string {
  return `Hey ${studentName}! Your TRADING WITH RDX ${planName} is verified. Your key is: ${key}. Enter it on the website to access the live trading room! Official IG: @griffin.arnav002`;
}
