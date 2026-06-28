import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { accent, radii, shadows } from '@/constants/tokens';

export interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  dotColor?: string;
}

export function Chip({ label, active = false, onPress, dotColor }: ChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      {dotColor && <View style={[styles.dot, { backgroundColor: dotColor }]} />}
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  chipActive: {
    backgroundColor: accent.a500,
    borderColor: accent.a500,
    ...shadows.glow,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  label: { fontSize: 13, fontWeight: '500', color: 'rgba(0,0,0,0.7)' },
  labelActive: { color: '#1A1A1A' },
});

export default Chip;
