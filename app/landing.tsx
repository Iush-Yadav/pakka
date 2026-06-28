/**
 * PAKKA — Onboarding / Landing Screen
 * Matches screenshot 1 exactly: mascot, speech bubble, features, CTA
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, backgrounds, spacing, radii, shadows } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Logo */}
          <Text style={styles.logo}>PAKKA<Text style={styles.dot}>.</Text></Text>
          <Text style={styles.subtitle}>Pakka aayega?</Text>
          <Text style={styles.subtitleOrange}>Pakka promises only.</Text>

          {/* Mascot Circle */}
          <View style={styles.mascotContainer}>
            <View style={styles.mascotCircle}>
              <Text style={styles.mascotEmoji}>🐕</Text>
            </View>
          </View>

          {/* Speech Bubble */}
          <View style={styles.speechBubble}>
            <View style={styles.speechArrow} />
            <View style={styles.speechRow}>
              <View style={styles.pLogo}>
                <Text style={styles.pText}>P</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.speechText}>Say it.</Text>
                <Text style={styles.speechText}>Mean it.</Text>
                <Text style={styles.speechTextBold}>Pakka it.</Text>
              </View>
            </View>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>🔴</Text>
              <View>
                <Text style={styles.featureTitle}>Real Consequences</Text>
                <Text style={styles.featureDesc}>No more fake promises</Text>
              </View>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>💰</Text>
              <View>
                <Text style={styles.featureTitle}>Your Money Back</Text>
                <Text style={styles.featureDesc}>If you show up, it's yours</Text>
              </View>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>👫</Text>
              <View>
                <Text style={styles.featureTitle}>Built for Friends</Text>
                <Text style={styles.featureDesc}>Fun, not punishment.{'\n'}Habits that last</Text>
              </View>
            </View>
          </View>

          {/* CTA */}
          <Button
            variant="primary"
            title="Let's Get Pakka! 🐕"
            fullWidth
            onPress={() => router.replace('/(tabs)/' as any)}
            style={{ marginTop: spacing['2xl'] }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  logo: { fontSize: 42, fontWeight: '800', color: '#1A1A1A', letterSpacing: -1.5, marginTop: spacing.lg },
  dot: { color: accent.a500 },
  subtitle: { fontSize: 22, fontWeight: '700', color: '#1A1A1A', marginTop: spacing.xs },
  subtitleOrange: { fontSize: 16, fontWeight: '600', color: accent.a500, marginTop: 2 },
  mascotContainer: { alignItems: 'center', marginTop: spacing['2xl'] },
  mascotCircle: {
    width: 130, height: 130, borderRadius: 65, backgroundColor: '#FFF3EE',
    alignItems: 'center', justifyContent: 'center',
    ...shadows.m,
  },
  mascotEmoji: { fontSize: 64 },
  speechBubble: {
    backgroundColor: '#F8F8F8', borderRadius: radii.lg, padding: spacing.lg,
    marginTop: spacing.xl, borderWidth: 1, borderColor: '#F0F0F0',
    ...shadows.xs,
  },
  speechArrow: {
    position: 'absolute', top: -8, left: 40, width: 16, height: 16,
    backgroundColor: '#F8F8F8', borderTopWidth: 1, borderLeftWidth: 1,
    borderColor: '#F0F0F0', transform: [{ rotate: '45deg' }],
  },
  speechRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  pLogo: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: accent.a500,
    alignItems: 'center', justifyContent: 'center',
  },
  pText: { fontSize: 22, fontWeight: '800', color: '#1A1A1A' },
  speechText: { fontSize: 16, color: '#666666', fontWeight: '500' },
  speechTextBold: { fontSize: 18, color: '#1A1A1A', fontWeight: '700' },
  features: { marginTop: spacing['3xl'], gap: spacing.lg },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  featureIcon: { fontSize: 20, marginTop: 2 },
  featureTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  featureDesc: { fontSize: 13, color: '#666666', marginTop: 2 },
  loginLink: { alignItems: 'center', marginTop: spacing.xl, paddingVertical: spacing.md },
  loginText: { fontSize: 14, color: '#999999' },
  loginBold: { color: accent.a500, fontWeight: '600' },
});
