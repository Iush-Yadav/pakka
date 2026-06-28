/**
 * PAKKA — CountdownTimer
 * Circular countdown with orange progress ring using react-native-svg.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { accent, text as textColors, neutral } from '@/constants/tokens';

export interface CountdownTimerProps {
  hours?: number;
  minutes: number;
  seconds: number;
  /** Total minutes for the ring to represent full progress */
  totalMinutes?: number;
  size?: number;
  label?: string;
}

export function CountdownTimer({
  hours,
  minutes,
  seconds,
  totalMinutes,
  size = 180,
}: CountdownTimerProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate progress as fraction remaining
  const total = totalMinutes ? totalMinutes * 60 : (minutes * 60 + seconds) || 1;
  const remaining = minutes * 60 + seconds;
  const progress = remaining / total;
  const strokeDashoffset = circumference * (1 - progress);

  const timeString = `${hours !== undefined ? `${String(hours).padStart(2, '0')}:` : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* SVG ring */}
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={neutral.n200}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={accent.a500}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Center text overlay */}
      <View style={styles.centerText}>
        <Text style={styles.labelText}>Time Left</Text>
        <Text style={styles.timeText}>{timeString}</Text>
        <Text style={styles.unitText}>min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 12,
    fontWeight: '500',
    color: textColors.tertiary,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 40,
    fontWeight: '800',
    color: textColors.primary,
    letterSpacing: -1,
  },
  unitText: {
    fontSize: 13,
    fontWeight: '500',
    color: textColors.tertiary,
    marginTop: 2,
  },
});

export default CountdownTimer;
