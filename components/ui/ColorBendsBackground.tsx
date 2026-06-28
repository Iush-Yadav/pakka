/**
 * PAKKA — ColorBendsBackground (Light Theme)
 * Simple light background. Intensity controls subtle warm tint.
 * All animated gradient complexity removed.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { backgrounds } from '@/constants/tokens';

interface ColorBendsProps {
  /** Controls warm tint strength. 0 = pure white, 1 = subtle warm. Default 0.6 */
  intensity?: number;
  /** Kept for API compat — ignored */
  showGrain?: boolean;
}

export function ColorBendsBackground({ intensity = 0.6, showGrain }: ColorBendsProps) {
  // Interpolate between pure white and a very subtle warm tint
  // intensity 0 → #FFFFFF, intensity 1 → #FFF8F5 (barely noticeable warmth)
  const warmAlpha = Math.min(Math.max(intensity, 0), 1) * 0.03;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Base white */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: backgrounds.primary }]} />
      {/* Subtle warm tint overlay */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: `rgba(255, 90, 31, ${warmAlpha})` },
        ]}
      />
    </View>
  );
}

export default ColorBendsBackground;
