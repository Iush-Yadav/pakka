/**
 * PAKKA — ProgressBar (Dark Mode)
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { accent, shadows } from '@/constants/tokens';

export interface ProgressBarProps {
  progress: number;
  height?: number;
  showDot?: boolean;
  large?: boolean;
  style?: ViewStyle;
}

export function ProgressBar({
  progress,
  height = 5,
  showDot = false,
  large = false,
  style,
}: ProgressBarProps) {
  const animWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animWidth, {
      toValue: progress,
      useNativeDriver: false,
      friction: 12,
      tension: 40,
    }).start();
  }, [progress]);

  const barHeight = large ? 8 : height;
  const dotSize = large ? 16 : 8;

  return (
    <View style={[styles.track, { height: barHeight, borderRadius: barHeight / 2 }, style]}>
      <Animated.View
        style={{
          height: '100%',
          width: animWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
          borderRadius: barHeight / 2,
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={[accent.a500, accent.a300]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {showDot && (
        <Animated.View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              left: animWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              marginLeft: -dotSize / 2,
              borderWidth: large ? 3 : 0,
            },
            large && styles.dotLarge,
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    width: '100%',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: '50%',
    marginTop: -4,
    backgroundColor: accent.a500,
    shadowColor: accent.a500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  dotLarge: {
    marginTop: -8,
    borderColor: '#1A1A1A',
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
});

export default ProgressBar;
