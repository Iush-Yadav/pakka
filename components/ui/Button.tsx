/**
 * PAKKA — Button (Light Theme)
 * Multi-variant button with orange accent on light backgrounds.
 */

import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { accent, text, neutral, radii, shadows } from '@/constants/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'pill' | 'whatsapp';

export interface ButtonProps {
  variant?: ButtonVariant;
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const WHATSAPP_GREEN = '#25D366';

export function Button({
  variant = 'primary',
  title,
  onPress,
  icon,
  fullWidth = false,
  disabled = false,
  style,
}: ButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pressScale = variant === 'primary' || variant === 'pill' || variant === 'whatsapp' ? 0.97 : 0.98;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: pressScale,
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

  const outerShadow = (() => {
    switch (variant) {
      case 'primary':
      case 'pill':
        return shadows.glow;
      case 'whatsapp':
        return {
          shadowColor: WHATSAPP_GREEN,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 4,
        };
      case 'secondary':
        return shadows.xs;
      case 'ghost':
      default:
        return {};
    }
  })();

  const borderRadiusValue = variant === 'pill' ? radii.pill : radii.sm;

  const getBackgroundStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: accent.a500,
          borderRadius: borderRadiusValue,
        };
      case 'pill':
        return {
          backgroundColor: accent.a500,
          borderRadius: radii.pill,
        };
      case 'secondary':
        return {
          backgroundColor: '#FFFFFF',
          borderWidth: 1.5,
          borderColor: accent.a500,
          borderRadius: borderRadiusValue,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderRadius: borderRadiusValue,
        };
      case 'whatsapp':
        return {
          backgroundColor: WHATSAPP_GREEN,
          borderRadius: borderRadiusValue,
        };
      default:
        return {
          backgroundColor: accent.a500,
          borderRadius: borderRadiusValue,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'pill':
      case 'whatsapp':
        return '#FFFFFF';
      case 'secondary':
        return accent.a500;
      case 'ghost':
        return text.primary;
      default:
        return '#FFFFFF';
    }
  };

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        outerShadow,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={disabled ? undefined : handlePressIn}
        onPressOut={disabled ? undefined : handlePressOut}
        disabled={disabled}
      >
        <View
          style={[
            getBackgroundStyle(),
            styles.content,
            fullWidth && styles.fullWidth,
            variant === 'pill' && styles.pillContent,
          ]}
        >
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <Text
            style={[
              styles.text,
              { color: getTextColor() },
            ]}
          >
            {title}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  pillContent: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  iconWrapper: {
    marginRight: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  disabled: {
    opacity: 0.45,
  },
});

export default Button;
