import React from 'react';
import { View, StyleSheet } from 'react-native';
import { accent } from '@/constants/tokens';

export interface CornerMarkersProps {
  color?: string;
  opacity?: number;
  size?: number;
}

export function CornerMarkers({ color = accent.a500, opacity = 0.3, size = 14 }: CornerMarkersProps) {
  const markerStyle = { backgroundColor: color, opacity };
  return (
    <>
      {/* Top-Left */}
      <View style={[styles.marker, styles.topLeft]}>
        <View style={[styles.h, { width: size }, markerStyle]} />
        <View style={[styles.v, { height: size }, markerStyle]} />
      </View>
      {/* Top-Right */}
      <View style={[styles.marker, styles.topRight]}>
        <View style={[styles.h, { width: size }, markerStyle]} />
        <View style={[styles.v, { height: size }, markerStyle]} />
      </View>
      {/* Bottom-Left */}
      <View style={[styles.marker, styles.bottomLeft]}>
        <View style={[styles.h, { width: size }, markerStyle]} />
        <View style={[styles.v, { height: size }, markerStyle]} />
      </View>
      {/* Bottom-Right */}
      <View style={[styles.marker, styles.bottomRight]}>
        <View style={[styles.h, { width: size }, markerStyle]} />
        <View style={[styles.v, { height: size }, markerStyle]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  marker: { position: 'absolute' },
  topLeft: { top: 12, left: 12 },
  topRight: { top: 12, right: 12, alignItems: 'flex-end' },
  bottomLeft: { bottom: 12, left: 12, justifyContent: 'flex-end' },
  bottomRight: { bottom: 12, right: 12, alignItems: 'flex-end', justifyContent: 'flex-end' },
  h: { height: 1.5 },
  v: { width: 1.5 },
});

export default CornerMarkers;
