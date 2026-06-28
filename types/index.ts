export interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
  avatarUrl?: string;
  avatarColor: string;
  walletBalance: number;
  currentStreak: number;
  bestStreak: number;
  totalPoints: number;
  pakkaScore: number;
  totalPacts: number;
  reputation: number;
  noShows: number;
  createdAt: Date;
}

export type PactStatus = 'pending' | 'active' | 'completed' | 'cancelled' | 'checked_in';
export type ConsequenceType = 'dinner' | 'charity';
export type CheckInStatus = 'checked_in' | 'missed' | 'pending';

export interface Pact {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  stakeAmount: number;
  consequence: ConsequenceType;
  consequenceDetail: string;
  charityId?: string;
  charityName?: string;
  date: Date;
  time: string;
  location: string;
  locationCoords?: { latitude: number; longitude: number };
  gpsRadius: number;
  checkinWindow: number; // minutes
  status: PactStatus;
  members: PactMember[];
  totalMembers: number;
  checkedInCount: number;
  createdAt: Date;
}

export interface PactMember {
  userId: string;
  pactId: string;
  name: string;
  avatarColor: string;
  initial: string;
  role: 'creator' | 'member';
  checkInStatus: CheckInStatus;
  checkInTime?: string;
  depositStatus: 'paid' | 'refunded' | 'forfeited' | 'pending';
  joinedAt: Date;
}

export interface CheckInResult {
  pactId: string;
  pactName: string;
  allShowedUp: boolean;
  totalMembers: number;
  checkedInCount: number;
  missedCount: number;
  members: PactMember[];
  refundAmount: number;
  forfeitedAmount: number;
  consequence: ConsequenceType;
  missedMemberNames: string[];
}

export interface DinnerCollection {
  pactId: string;
  restaurantUPI: string;
  totalBill: number;
  forfeitedAmount: number;
  remainingAmount: number;
  winnerCount: number;
  winnerShareEach: number;
}

export interface Charity {
  id: string;
  name: string;
  icon: string; // Emoji or URL
  cause: string;
  description: string;
  longDescription?: string;
  impactMetric?: string; // e.g. "₹500 = 10 Meals"
  voteCount: number;
  totalDonated?: number; // Global app stats
  website?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatarColor: string;
  initial: string;
  subtitle: string;
  score: number;
  mutualPacts: number;
}

export type TransactionType = 'deposit' | 'refund' | 'donation' | 'dinner_payment';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  pactId?: string;
  pactName?: string;
  status: TransactionStatus;
  date: Date;
  receiptUrl?: string; // For donations
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'invite' | 'reminder' | 'settlement' | 'achievement' | 'donation';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  metadata?: any;
}

export interface PactHistoryItem {
  id: string;
  name: string;
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  showedUp: string; // e.g. "4/5 showed up"
  members: PactMember[];
}

export interface UserStats {
  completionRate: number;
  currentStreak: number;
  bestStreak: number;
  totalCheckIns: number;
  pactsWon: number;
  activeDays: string;
  weeklyData: number[];
}

export interface StakeInfo {
  label: string;
  value: string;
  color?: string;
}

// Legacy - keep for backward compat
export interface Habit {
  id: string;
  name: string;
  icon: string;
  category: string;
  categoryColor: string;
  pactId?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  stakeAmount?: number;
  friendCount?: number;
  meta: string;
  todayStatus: 'pending' | 'completed' | 'missed';
}

export interface CheckIn {
  id: string;
  userId: string;
  habitId: string;
  pactId?: string;
  date: string;
  completedAt: Date;
  proofType: 'manual' | 'photo' | 'location';
  verified: boolean;
}
