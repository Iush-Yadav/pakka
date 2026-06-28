import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { shadows } from '@/constants/tokens';

export interface AvatarMember { name: string; color: string; }
export interface AvatarStackProps {
  members: AvatarMember[];
  size?: number;
  max?: number;
}

export function AvatarStack({ members, size = 32, max = 4 }: AvatarStackProps) {
  const visible = members.slice(0, max);
  const overflow = members.length - max;

  return (
    <View style={styles.row}>
      {visible.map((m, i) => (
        <View
          key={i}
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: 10,
              backgroundColor: m.color,
              marginLeft: i === 0 ? 0 : -8,
              zIndex: max - i,
            },
          ]}
        >
          <Text style={[styles.initial, { fontSize: size * 0.38 }]}>{m.name.charAt(0)}</Text>
        </View>
      ))}
      {overflow > 0 && (
        <View
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.1)',
              marginLeft: -8,
            },
          ]}
        >
          <Text style={[styles.initial, styles.overflowText, { fontSize: size * 0.32 }]}>+{overflow}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1A1A1A',
    ...shadows.xs,
  },
  initial: { color: '#1A1A1A', fontWeight: '700' },
  overflowText: { color: 'rgba(0,0,0,0.6)' },
});

export default AvatarStack;
