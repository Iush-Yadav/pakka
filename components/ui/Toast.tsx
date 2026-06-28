/**
 * PAKKA — Toast (Dark Mode)
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { radii, spacing, shadows, accent } from '@/constants/tokens';

export interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
  type?: 'success' | 'info' | 'warning';
  onDismiss?: () => void;
}

const typeColors = {
  success: 'rgba(74,222,128,0.15)',
  info: 'rgba(96,165,250,0.15)',
  warning: 'rgba(251,191,36,0.15)',
};

export function Toast({ message, icon, visible, type = 'success', onDismiss }: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, friction: 8, tension: 80 }),
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, { toValue: -100, duration: 300, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start(() => onDismiss?.());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible && !message) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], opacity }]}>
      <View style={[styles.iconBg, { backgroundColor: typeColors[type] }]}>
        <Text style={styles.iconText}>{icon || '✅'}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: radii.md,
    padding: spacing.md,
    marginHorizontal: spacing.xl,
    ...shadows.s,
  },
  iconBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconText: {
    fontSize: 14,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.85)',
  },
});

export default Toast;
