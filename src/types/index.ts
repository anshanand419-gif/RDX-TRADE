export interface Book {
  id: string;
  title: string;
  author: string;
  category: 'psychology' | 'price-action' | 'technical' | 'classics' | 'derivatives';
  rating: number;
  reviewsCount: number;
  pages: number;
  year: number;
  badge?: string;
  description: string;
  keyTakeaways: string[];
  corePrinciples: { title: string; explanation: string }[];
  chapterList: string[];
  excerpt: string;
  downloadFilename: string;
}

export interface PDFItem {
  id: string;
  title: string;
  category: 'candlesticks' | 'patterns' | 'smc' | 'options' | 'risk-management' | 'journal';
  fileSize: string;
  pages: number;
  downloadCount: number;
  description: string;
  highlights: string[];
  contentSections: {
    heading: string;
    description: string;
    bulletPoints: string[];
    proTip: string;
  }[];
  downloadFilename: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'practice' | 'quiz';
  description: string;
  keyTakeaway: string;
}

export interface CourseModule {
  moduleNumber: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  modulesCount: number;
  rating: number;
  studentsCount: number;
  category: 'price-action' | 'options' | 'smc' | 'scalping' | 'psychology';
  thumbnail: string;
  description: string;
  whatYouWillLearn: string[];
  modules: CourseModule[];
}

export interface LivePlan {
  id: 'plan_2m' | 'plan_5m' | 'plan_1yr';
  duration: string;
  durationLabel: string;
  priceInr: number;
  originalPriceInr: number;
  popular?: boolean;
  bestValue?: boolean;
  badge?: string;
  description: string;
  features: string[];
  recommendedFor: string;
}

export interface PaymentSubmission {
  id: string;
  studentName: string;
  phone: string;
  email: string;
  planId: 'plan_2m' | 'plan_5m' | 'plan_1yr';
  planName: string;
  amountInr: number;
  utrNumber: string;
  submittedAt: string;
  status: 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  generatedKey?: string;
  verifiedAt?: string;
  notes?: string;
}

export interface AccessKeyRecord {
  key: string;
  studentName: string;
  phone: string;
  email: string;
  planId: 'plan_2m' | 'plan_5m' | 'plan_1yr';
  planName: string;
  utrNumber: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
  timesUsed: number;
}
