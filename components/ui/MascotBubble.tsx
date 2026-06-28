/**
 * PAKKA — MascotBubble
 * Reusable mascot emoji with a speech bubble message.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { text as textColors, neutral, shadows, radii } from '@/constants/tokens';

export interface MascotBubbleProps {
  mascotEmoji: string;
  mascotName: string;
  message: string;
  size?: 'small' | 'large';
}

export function MascotBubble({
  mascotEmoji,
  mascotName,
  message,
  size = 'large',
}: MascotBubbleProps) {
  const emojiSize = size === 'large' ? 72 : 48;
  const bubbleFontSize = size === 'large' ? 15 : 13;

  return (
    <View style={styles.wrapper}>
      {/* Mascot section */}
      <View style={styles.mascotSection}>
        <Text style={{ fontSize: emojiSize }}>{mascotEmoji}</Text>
        <Text style={styles.mascotName}>{mascotName}</Text>
      </View>

      {/* Speech bubble */}
      <View style={styles.bubbleContainer}>
        {/* Triangle pointer */}
        <View style={styles.triangleWrapper}>
          <View style={styles.triangle} />
        </View>
        <View style={[styles.bubble, shadows.card]}>
          <Text style={[styles.message, { fontSize: bubbleFontSize }]}>
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 4,
  },
  mascotSection: {
    alignItems: 'center',
  },
  mascotName: {
    fontSize: 12,
    fontWeight: '600',
    color: textColors.secondary,
    marginTop: 4,
  },
  bubbleContainer: {
    alignItems: 'center',
    width: '100%',
  },
  triangleWrapper: {
    alignItems: 'center',
    zIndex: 1,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: neutral.n200,
    width: '100%',
  },
  message: {
    color: textColors.primary,
    lineHeight: 22,
    textAlign: 'center',
  },
});

export default MascotBubble;
