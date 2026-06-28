/**
 * PAKKA — Welcome Screen (Light Theme Splash)
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 8, tension: 40 }),
    ]).start();

    const timeout = setTimeout(() => {
      router.replace('/landing' as any);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.center, { opacity, transform: [{ scale }] }]}>
        <Text style={styles.logo}>PAKKA<Text style={styles.dot}>.</Text></Text>
        <Text style={styles.tagline}>Pakka promises only.</Text>
      </Animated.View>
      <Text style={styles.version}>v1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  center: { alignItems: 'center' },
  logo: { fontSize: 56, fontWeight: '800', color: '#1A1A1A', letterSpacing: -2 },
  dot: { color: '#FF5A1F' },
  tagline: { fontSize: 16, color: '#999999', marginTop: 8, fontWeight: '500' },
  version: { position: 'absolute', bottom: 40, fontSize: 12, color: '#BDBDBD' },
});
