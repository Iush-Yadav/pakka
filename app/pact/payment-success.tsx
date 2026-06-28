/**
 * PAKKA — Payment Success Screen
 * Matches screenshot 9
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';

export default function PaymentSuccessScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.content}>
          {/* Mascot */}
          <Text style={styles.mascot}>🎉🐧</Text>

          {/* Title */}
          <Text style={styles.title}>✨ Payment Successful! 🎉</Text>

          {/* Amount */}
          <Text style={styles.amount}>₹200</Text>
          <Text style={styles.amountLabel}>Locked for this pact</Text>

          {/* Info rows */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>✅</Text>
              <Text style={styles.infoText}>You'll get full refund if you show up</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>⚠️</Text>
              <Text style={styles.infoText}>Otherwise, it will go to your anti-charity</Text>
            </View>
          </View>

          {/* CTA */}
          <Button
            variant="secondary"
            title="All Good! ✓"
            fullWidth
            onPress={() => router.replace('/(tabs)' as any)}
            style={{ marginTop: spacing['3xl'] }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: spacing.xl, alignItems: 'center' },
  mascot: { fontSize: 72, marginBottom: spacing.xl },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', textAlign: 'center' },
  amount: { fontSize: 48, fontWeight: '800', color: '#1A1A1A', marginTop: spacing.xl },
  amountLabel: { fontSize: 14, color: '#999999', marginTop: 4 },
  infoCard: {
    backgroundColor: '#F8F8F8', borderRadius: radii.lg, padding: spacing.lg,
    marginTop: spacing['2xl'], width: '100%', gap: spacing.md,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  infoIcon: { fontSize: 18 },
  infoText: { fontSize: 14, color: '#424242', flex: 1 },
});
