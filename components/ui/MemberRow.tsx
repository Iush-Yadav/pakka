/**
 * PAKKA — MemberRow
 * Member list row with avatar, name, check-in info, and deposit status badge.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { text as textColors, neutral } from '@/constants/tokens';
import { StatusBadge, StatusType } from './StatusBadge';

export interface MemberRowProps {
  name: string;
  initial: string;
  avatarColor: string;
  checkInTime?: string;
  status: 'checked_in' | 'missed' | 'pending';
  depositStatus: 'refunded' | 'forfeited' | 'pending';
}

export function MemberRow({
  name,
  initial,
  avatarColor,
  checkInTime,
  status,
  depositStatus,
}: MemberRowProps) {
  const statusText = (() => {
    switch (status) {
      case 'checked_in':
        return `Checked in${checkInTime ? ` · ${checkInTime}` : ''}`;
      case 'missed':
        return 'Not checked in';
      case 'pending':
      default:
        return 'Not checked in yet';
    }
  })();

  return (
    <View style={styles.row}>
      {/* Avatar */}
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>

      {/* Name + status info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>

      {/* Deposit status badge */}
      <StatusBadge status={depositStatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: neutral.n200,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: textColors.primary,
  },
  statusText: {
    fontSize: 12,
    color: textColors.tertiary,
    marginTop: 2,
  },
});

export default MemberRow;
