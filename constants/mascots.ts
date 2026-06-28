/**
 * PAKKA MASCOT SYSTEM
 * Each major screen has a different mascot character.
 */

export interface Mascot {
  id: string;
  name: string;
  species: string;
  role: string;
  emoji: string;
  tagline: string;
  expressions: string[];
}

export const mascots: Record<string, Mascot> = {
  pakku: {
    id: 'pakku',
    name: 'Pakku',
    species: 'The Shiba',
    role: 'Motivation',
    emoji: '🐕',
    tagline: 'Let\'s make it Pakka!',
    expressions: ['Happy', 'Excited', 'Thinking', 'Oops!', 'Proud', 'Sleepy'],
  },
  bunny: {
    id: 'bunny',
    name: 'Bunny',
    species: 'The Planner',
    role: 'Planning',
    emoji: '🐰',
    tagline: 'Plan it right!',
    expressions: ['Happy', 'Focused', 'Thinking', 'Oops!', 'Yay!', 'Sleepy'],
  },
  togo: {
    id: 'togo',
    name: 'Togo',
    species: 'The Hype Booster',
    role: 'Invites',
    emoji: '🐺',
    tagline: 'Let\'s get the squad!',
    expressions: ['Happy', 'Hyped', 'Cheering', 'Dreamy', 'Thinking', 'Tired'],
  },
  ollie: {
    id: 'ollie',
    name: 'Ollie',
    species: 'The Organizer',
    role: 'Tips',
    emoji: '🦉',
    tagline: 'Smart moves only!',
    expressions: ['Happy', 'Focused', 'Thinking', 'Oops!', 'Smart', 'Sleepy'],
  },
  milo: {
    id: 'milo',
    name: 'Milo',
    species: 'The Motivator',
    role: 'Consistency',
    emoji: '🐢',
    tagline: 'Slow and steady wins!',
    expressions: ['Happy', 'Ready', 'Thinking', 'Oops!', 'Determined', 'Tired'],
  },
  coco: {
    id: 'coco',
    name: 'Coco',
    species: 'The Checker',
    role: 'Check-ins',
    emoji: '🐧',
    tagline: 'Check-in time!',
    expressions: ['Happy', 'Checking', 'Thinking', 'Oops!', 'Cool', 'Sleepy'],
  },
  foxy: {
    id: 'foxy',
    name: 'Foxy',
    species: 'The Celebrator',
    role: 'Celebration',
    emoji: '🦊',
    tagline: 'You did it!',
    expressions: ['Happy', 'Excited', 'Dancing', 'Surprised', 'Proud', 'Sleepy'],
  },
  momo: {
    id: 'momo',
    name: 'Momo',
    species: 'The Caretaker',
    role: 'Charity & Kindness',
    emoji: '🐼',
    tagline: 'Kindness matters!',
    expressions: ['Happy', 'Caring', 'Thinking', 'Sad', 'Grateful', 'Sleepy'],
  },
};

// Screen → Mascot mapping
export const screenMascots: Record<string, string> = {
  onboarding: 'pakku',
  home: 'pakku',
  createPact: 'bunny',
  inviteFriends: 'togo',
  joinPact: 'ollie',
  waitingRoom: 'togo',
  liveCheckin: 'coco',
  resultSuccess: 'foxy',
  resultPartial: 'pakku',
  dinnerCollection: 'foxy',
  paymentSuccess: 'coco',
  profile: 'pakku',
  pactHistory: 'bunny',
  friends: 'togo',
  impact: 'momo',
  antiCharity: 'momo',
  settings: 'ollie',
};

// Motivational quotes
export const motivationalQuotes = [
  { text: 'Discipline today, freedom tomorrow.', mascot: 'pakku' },
  { text: 'Small pact today, big habit forever.', mascot: 'bunny' },
  { text: 'Show up, or miss out!', mascot: 'togo' },
  { text: 'Plans don\'t work unless you Pakka!', mascot: 'ollie' },
  { text: 'Consistency is our superpower.', mascot: 'milo' },
  { text: 'No excuses, only Pakka!', mascot: 'coco' },
  { text: 'We don\'t just make plans, we make Pakka promises!', mascot: 'foxy' },
  { text: 'Every check-in counts.', mascot: 'coco' },
];

// Anti-charity list (humorous "charities" you DON'T want to support)
export const antiCharities = [
  { id: 'ac1', name: 'Bhakt\'s Party Fund', subtitle: '(You hate politics)', emoji: '🏛️' },
  { id: 'ac2', name: 'Slow Internet Fund', subtitle: '(For suffering by buffering)', emoji: '📶' },
  { id: 'ac3', name: 'Monday Blues Foundation', subtitle: '(No one likes Mondays)', emoji: '😩' },
  { id: 'ac4', name: 'Traffic Jam Sponsor', subtitle: '(Why so much jam?)', emoji: '🚗' },
  { id: 'ac5', name: 'Wake Up Early Fund', subtitle: '(Never gonna happen)', emoji: '⏰' },
  { id: 'ac6', name: 'Cold Coffee Complaints', subtitle: '(Nobody deserves cold coffee)', emoji: '☕' },
];
