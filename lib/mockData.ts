import type { User, Pact, PactMember, Friend, UserStats, Charity, StakeInfo, PactHistoryItem, CheckInResult, AppNotification, Transaction } from '@/types';

// ══════════════════════════════════════════
//  CURRENT USER — Matches screenshot profile
// ══════════════════════════════════════════
export const currentUser: User = {
  id: '1',
  name: 'New User',
  username: 'user_123',
  phone: '',
  avatarColor: '#FF5A1F',
  walletBalance: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalPoints: 0,
  pakkaScore: 0,
  totalPacts: 0,
  reputation: 0,
  noShows: 0,
  createdAt: new Date(),
};

// ══════════════════════════════════════════
//  PACT MEMBERS
// ══════════════════════════════════════════
export const pactMembers: PactMember[] = [];

export const pactMembersAllShowed: PactMember[] = [];

// ══════════════════════════════════════════
//  ACTIVE PACTS
// ══════════════════════════════════════════
export const activePacts: Pact[] = [];

// ══════════════════════════════════════════
//  PACT HISTORY
// ══════════════════════════════════════════
export const pactHistory: PactHistoryItem[] = [];

// ══════════════════════════════════════════
//  FRIENDS
// ══════════════════════════════════════════
export const friends: Friend[] = [];

// ══════════════════════════════════════════
//  CHARITIES (REAL INDIAN NGOs)
// ══════════════════════════════════════════
export const charities: Charity[] = [
  { 
    id: 'akshaya1', 
    name: 'Akshaya Patra', 
    icon: '🍱', 
    cause: 'Hunger Relief', 
    description: 'Providing mid-day meals to millions of school children in India every day.',
    longDescription: 'The Akshaya Patra Foundation is an NGO in India headquartered in Bengaluru. It strives to eliminate classroom hunger by implementing the Mid-Day Meal Scheme in government schools and government-aided schools.',
    impactMetric: '₹1,500 feeds a child for an entire academic year.',
    voteCount: 1240,
    totalDonated: 45000,
    website: 'https://www.akshayapatra.org'
  },
  { 
    id: 'cry1', 
    name: 'CRY India', 
    icon: '📚', 
    cause: 'Child Rights', 
    description: 'Child Rights and You (CRY) ensures every child receives basic education and healthcare.',
    longDescription: 'CRY works towards restoring basic rights to underprivileged Indian children. They focus on education, healthcare, and protection from exploitation.',
    impactMetric: '₹3,000 supports a child\'s education for a year.',
    voteCount: 980,
    totalDonated: 32000,
  },
  { 
    id: 'goonj1', 
    name: 'Goonj', 
    icon: '👕', 
    cause: 'Rural Development', 
    description: 'Using urban discard as a tool to trigger large-scale rural development work.',
    longDescription: 'Goonj highlights clothing as a basic but unaddressed need. They use urban surplus material to reward rural communities for their labor in community development projects.',
    impactMetric: '₹500 sponsors a comprehensive family dignity kit.',
    voteCount: 850,
    totalDonated: 28500,
  },
  { 
    id: 'wwf1', 
    name: 'WWF India', 
    icon: '🐅', 
    cause: 'Wildlife Conservation', 
    description: 'Protecting endangered species and preserving India\'s natural heritage.',
    longDescription: 'World Wide Fund for Nature India is committed to environmental conservation, stopping the degradation of the planet\'s natural environment, and building a future where humans live in harmony with nature.',
    impactMetric: '₹1,000 helps protect 1 acre of critical tiger habitat.',
    voteCount: 650,
    totalDonated: 15200,
  },
  { 
    id: 'helpage1', 
    name: 'HelpAge India', 
    icon: '👴', 
    cause: 'Elder Care', 
    description: 'Supporting disadvantaged elders to live active, healthy, and dignified lives.',
    longDescription: 'HelpAge India is a leading charity platform in India working with and for disadvantaged elderly for nearly 4 decades.',
    impactMetric: '₹2,000 sponsors a cataract surgery for an elder.',
    voteCount: 520,
    totalDonated: 11000,
  }
];

// ══════════════════════════════════════════
//  NOTIFICATIONS & TRANSACTIONS
// ══════════════════════════════════════════
export const mockNotifications: AppNotification[] = [];

export const mockTransactions: Transaction[] = [];

// User Stats
export const userStats: UserStats = { completionRate: 0, currentStreak: 0, bestStreak: 0, totalCheckIns: 0, pactsWon: 0, activeDays: '0/30', weeklyData: [0, 0, 0, 0, 0, 0, 0] };

// Legacy Exports
export const todayHabits: any[] = [];
export const sparklineData = [40, 60, 80, 70, 90, 100, 85];
export const chartData = [48, 30, 20, 10, 8];
