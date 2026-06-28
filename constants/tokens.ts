/**
 * PAKKA DESIGN TOKENS — LIGHT THEME
 * White/cream background with vibrant orange accent.
 * Matching the Pakka app screenshots exactly.
 */

// ══════════════════════════════════════════
//  BRAND ACCENT — Pakka Orange
// ══════════════════════════════════════════
export const accent = {
  a50:  '#FFF3EE',
  a100: '#FFE0D0',
  a200: '#FFC2A0',
  a300: '#FF9E6A',
  a400: '#FF7A35',
  a500: '#FF5A1F',  // Primary brand
  a600: '#E5400A',
  a700: '#C42E00',
  a800: '#9E2300',
  a900: '#7A1A00',
} as const;

// Keep orange as alias for backward compat
export const orange = accent;

// ══════════════════════════════════════════
//  NEUTRAL PALETTE — Light Mode
// ══════════════════════════════════════════
export const neutral = {
  n0:   '#FFFFFF',   // Lightest — base bg
  n50:  '#FAFAFA',
  n100: '#F5F5F5',
  n200: '#EEEEEE',
  n300: '#E0E0E0',
  n400: '#BDBDBD',   // Borders / muted
  n500: '#9E9E9E',   // Placeholder text
  n600: '#757575',   // Secondary text
  n700: '#616161',   // Body text
  n800: '#424242',   // Strong text
  n900: '#1A1A1A',   // Primary text / headings
} as const;

// ══════════════════════════════════════════
//  SEMANTIC COLORS
// ══════════════════════════════════════════
export const semantic = {
  success: '#22C55E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger:  '#EF4444',
  dangerLight: '#FEE2E2',
  info:    '#3B82F6',
  infoLight: '#DBEAFE',
} as const;

// ══════════════════════════════════════════
//  BACKGROUNDS
// ══════════════════════════════════════════
export const backgrounds = {
  primary:   '#FFFFFF',
  secondary: '#F8F8F8',
  elevated:  '#FFFFFF',
  card:      '#FFFFFF',
  orange:    '#FF5A1F',
  orangeLight: '#FFF3EE',
  greenLight: '#F0FFF4',
  gradient: {
    start: '#FFFFFF',
    mid:   '#FFF8F5',
    end:   '#FFFFFF',
  },
} as const;

// ══════════════════════════════════════════
//  TEXT COLORS
// ══════════════════════════════════════════
export const text = {
  primary:   '#1A1A1A',
  secondary: '#666666',
  tertiary:  '#999999',
  muted:     '#BDBDBD',
  inverse:   '#FFFFFF',
  accent:    '#FF5A1F',
  success:   '#22C55E',
  danger:    '#EF4444',
} as const;

// ══════════════════════════════════════════
//  RADII
// ══════════════════════════════════════════
export const radii = {
  xs:   8,
  sm:   12,
  md:   16,
  lg:   22,
  xl:   30,
  hero: 40,
  pill: 999,
} as const;

// ══════════════════════════════════════════
//  SPACING (4px base grid)
// ══════════════════════════════════════════
export const spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

// ══════════════════════════════════════════
//  SHADOWS (for light backgrounds)
// ══════════════════════════════════════════
export const shadows = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  s: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  m: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  l: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  glow: {
    shadowColor: accent.a500,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  glowStrong: {
    shadowColor: accent.a500,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
} as const;

// ══════════════════════════════════════════
//  SPRING ANIMATION CONFIGS
// ══════════════════════════════════════════
export const springs = {
  bouncy: { damping: 12, stiffness: 180, mass: 0.8 },
  smooth: { damping: 20, stiffness: 200, mass: 1 },
  snappy: { damping: 15, stiffness: 300, mass: 0.6 },
  gentle: { damping: 25, stiffness: 120, mass: 1.2 },
} as const;

// ══════════════════════════════════════════
//  TIMING CONFIGS
// ══════════════════════════════════════════
export const timing = {
  fast:   150,
  normal: 250,
  slow:   400,
} as const;

// ══════════════════════════════════════════
//  STAGGER DELAYS
// ══════════════════════════════════════════
export const stagger = {
  base: 80,
  items: [0, 80, 160, 240, 320, 400, 480],
} as const;

// ══════════════════════════════════════════
//  CONVENIENCE EXPORTS
// ══════════════════════════════════════════
export const Colors = {
  ...accent,
  ...neutral,
  ...semantic,
  ...backgrounds,
  primary: accent.a500,
  bg: backgrounds.primary,
  bg2: backgrounds.secondary,
  text: text.primary,
  textSecondary: text.secondary,
} as const;
