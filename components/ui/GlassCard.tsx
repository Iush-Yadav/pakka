/**
 * PAKKA — GlassCard (Light Theme)
 * Clean white card with subtle shadow. No blur effects.
 */

import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { radii, shadows, neutral } from '@/constants/tokens';

export interface GlassCardProps {
  /** Kept for API compatibility — ignored in light theme */
  variant?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  borderRadius?: number;
  pressable?: boolean;
  onPress?: () => void;
}

export function GlassCard({
  variant,
  children,
  style,
  borderRadius = radii.md,
  pressable = false,
  onPress,
}: GlassCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const containerStyle: ViewStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius,
    borderWidth: 1,
    borderColor: neutral.n200,
    ...shadows.card,
    overflow: 'hidden',
  };

  const card = (
    <View style={[containerStyle, style]}>
      {children}
    </View>
  );

  if (pressable) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {card}
        </Pressable>
      </Animated.View>
    );
  }

  return card;
}

export default GlassCard;
