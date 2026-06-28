/**
 * PAKKA TYPOGRAPHY — Light Theme
 * Uses system font (San Francisco on iOS, Roboto on Android).
 * Dark text on light backgrounds.
 */

import { TextStyle } from 'react-native';

const fontFamily = 'System';

export const typography: Record<string, TextStyle> = {
  // Display
  displayXL: {
    fontFamily,
    fontSize: 72,
    fontWeight: '800',
    letterSpacing: -3,
    lineHeight: 76,
    color: '#1A1A1A',
  },
  displayL: {
    fontFamily,
    fontSize: 58,
    fontWeight: '700',
    letterSpacing: -2,
    lineHeight: 64,
    color: '#1A1A1A',
  },

  // Headings
  heading: {
    fontFamily,
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: -1.5,
    lineHeight: 50,
    color: '#1A1A1A',
  },
  title: {
    fontFamily,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.8,
    lineHeight: 34,
    color: '#1A1A1A',
  },
  titleM: {
    fontFamily,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 28,
    color: '#1A1A1A',
  },
  titleS: {
    fontFamily,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
    lineHeight: 24,
    color: '#1A1A1A',
  },

  // Body
  bodyL: {
    fontFamily,
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.2,
    lineHeight: 26,
    color: '#424242',
  },
  bodyM: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.1,
    lineHeight: 24,
    color: '#424242',
  },
  bodyS: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 20,
    color: '#666666',
  },

  // Captions & Labels
  caption: {
    fontFamily,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 18,
    color: '#666666',
  },
  micro: {
    fontFamily,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 14,
    color: '#999999',
  },
  label: {
    fontFamily,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    lineHeight: 16,
    color: '#999999',
    textTransform: 'uppercase',
  },

  // Sections
  sectionTitle: {
    fontFamily,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.3,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  sectionLink: {
    fontFamily,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 18,
    color: '#FF5A1F',
  },

  // Buttons
  buttonL: {
    fontFamily,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 22,
  },
  buttonM: {
    fontFamily,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 20,
  },
  buttonS: {
    fontFamily,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
    lineHeight: 18,
  },
};
