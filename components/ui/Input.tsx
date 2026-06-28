/**
 * PAKKA — Input (Light Theme)
 * Clean light-mode text input with orange focus accent.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, KeyboardTypeOptions } from 'react-native';
import { accent, neutral, text as textColors, radii, spacing } from '@/constants/tokens';

export interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  prefix?: string;
  icon?: React.ReactNode;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  style?: ViewStyle;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  prefix,
  icon,
  label,
  keyboardType,
  style,
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          focused && styles.containerFocused,
        ]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={neutral.n500}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType={keyboardType}
          selectionColor={accent.a500}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: textColors.secondary,
    marginBottom: spacing.sm,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: neutral.n300,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  containerFocused: {
    borderColor: accent.a500,
    shadowColor: accent.a500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: {
    marginRight: spacing.sm,
  },
  prefix: {
    fontSize: 15,
    fontWeight: '600',
    color: textColors.secondary,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: textColors.primary,
    padding: 0,
  },
});

export default Input;
