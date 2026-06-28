/**
 * PAKKA — StatusBadge
 * Color-coded pill badge for check-in / deposit statuses.
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

import { semantic, accent } from '@/constants/tokens';

export type StatusType = 'refunded' | 'checked_in' | 'missed' | 'pending' | 'forfeited';

export interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const STATUS_CONFIG: Record<StatusType, { bg: string; color: string; defaultLabel: string }> = {
  refunded: {
    bg: semantic.successLight,
    color: semantic.success,
    defaultLabel: 'Refunded',
  },
  checked_in: {
    bg: semantic.successLight,
    color: semantic.success,
    defaultLabel: 'Checked In',
  },
  missed: {
    bg: semantic.dangerLight,
    color: semantic.danger,
    defaultLabel: 'Missed',
  },
  forfeited: {
    bg: semantic.dangerLight,
    color: semantic.danger,
    defaultLabel: 'Forfeited',
  },
  pending: {
    bg: accent.a50,
    color: accent.a500,
    defaultLabel: 'Pending',
  },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const displayLabel = label ?? config.defaultLabel;

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.label, { color: config.color }]}>
        {displayLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});

export default StatusBadge;
