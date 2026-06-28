/**
 * PAKKA — PactCard
 * Pact history card with status, date/time, and attendance info.
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { text as textColors, neutral, semantic, accent, radii, shadows } from '@/constants/tokens';

export type PactStatus = 'completed' | 'upcoming' | 'cancelled';

export interface PactCardProps {
  name: string;
  date: string;
  time: string;
  status: PactStatus;
  showedUp: string;
  onPress?: () => void;
}

const STATUS_STYLE: Record<PactStatus, { bg: string; color: string; label: string }> = {
  completed: {
    bg: semantic.successLight,
    color: semantic.success,
    label: 'Completed',
  },
  upcoming: {
    bg: accent.a50,
    color: accent.a500,
    label: 'Upcoming',
  },
  cancelled: {
    bg: neutral.n100,
    color: neutral.n600,
    label: 'Cancelled',
  },
};

export function PactCard({ name, date, time, status, showedUp, onPress }: PactCardProps) {
  const statusConfig = STATUS_STYLE[status];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      {/* Header row: title + status */}
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <View style={[styles.statusPill, { backgroundColor: statusConfig.bg }]}>
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Date / time row */}
      <View style={styles.dateRow}>
        <Ionicons name="calendar-outline" size={14} color={textColors.tertiary} />
        <Text style={styles.dateText}>
          {date} · {time}
        </Text>
      </View>

      {/* Attendance */}
      <Text style={styles.showedUp}>{showedUp}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 16,
    borderWidth: 1,
    borderColor: neutral.n200,
    ...shadows.card,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: textColors.primary,
    flex: 1,
    marginRight: 8,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    color: textColors.tertiary,
  },
  showedUp: {
    fontSize: 13,
    color: textColors.secondary,
  },
});

export default PactCard;
