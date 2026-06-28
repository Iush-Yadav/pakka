/**
 * PAKKA — Join Pact / Pact Preview
 * Matches screenshot 4
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function JoinPactScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Mascot */}
          <View style={styles.mascotArea}>
            <View style={styles.mascotCircle}>
              <Text style={styles.mascot}>🦉</Text>
            </View>
          </View>

          {/* Pact Title */}
          <Text style={styles.title}>Cricket at Barabati Ground 🏏</Text>

          {/* Details */}
          <View style={styles.card}>
            <DetailRow emoji="📅" text="Tomorrow, 7:00 AM" />
            <DetailRow emoji="📍" text="Barabati Stadium, Cuttack" />
            <DetailRow emoji="💰" text="₹200 per person" />
            <DetailRow emoji="🍽️" text="Loser buys dinner at local dhaba" />
          </View>

          {/* Charity Designation */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Supported Charity</Text>
            <Text style={styles.note}>100% of forfeited deposits will be donated here.</Text>
            <View style={styles.charityCard}>
              <Text style={styles.charityEmoji}>📚</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.charityName}>CRY India</Text>
                <Text style={styles.charityTag}>Child Rights & Education</Text>
              </View>
            </View>
          </View>

          {/* Join Button */}
          <Button
            variant="primary"
            title="Join & Pay ₹200"
            fullWidth
            onPress={() => router.push('/payment-sheet?amount=200&pactId=1&pactName=Cricket+at+Barabati+Ground' as any)}
            style={{ marginTop: spacing.xl }}
          />

          {/* Secured */}
          <View style={styles.securedRow}>
            <Ionicons name="lock-closed" size={14} color="#999999" />
            <Text style={styles.securedText}>Secured by Razorpay</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function DetailRow({ emoji, text: t }: { emoji: string; text: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailEmoji}>{emoji}</Text>
      <Text style={styles.detailText}>{t}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  mascotArea: { alignItems: 'center', marginBottom: spacing.xl },
  mascotCircle: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFF3EE',
    alignItems: 'center', justifyContent: 'center', ...shadows.s,
  },
  mascot: { fontSize: 50 },
  title: { fontSize: 24, fontWeight: '800', color: '#1A1A1A', textAlign: 'center', marginBottom: spacing.xl },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: radii.lg, borderWidth: 1,
    borderColor: '#F0F0F0', ...shadows.card, padding: spacing.lg, marginBottom: spacing.lg,
  },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  detailEmoji: { fontSize: 18 },
  detailText: { fontSize: 15, color: '#424242', fontWeight: '500' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  note: { fontSize: 12, color: '#999999', marginBottom: spacing.md },
  charityCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: '#FFF3EE', borderRadius: radii.sm, padding: spacing.md,
  },
  charityEmoji: { fontSize: 24 },
  charityName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  charityTag: { fontSize: 12, color: '#999999' },
  securedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.md },
  securedText: { fontSize: 12, color: '#999999' },
});
