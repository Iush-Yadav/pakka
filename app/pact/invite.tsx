/**
 * PAKKA — Invite Friends (Pact Created!)
 * Matches screenshot 3
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

const invitedFriends = [
  { initial: 'R', color: '#4A90D9' },
  { initial: 'P', color: '#E91E63' },
  { initial: 'A', color: '#7F77DD' },
  { initial: 'V', color: '#FF9800' },
];

export default function InviteScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerArea}>
            <Text style={styles.mascot}>🐺</Text>
            <Text style={styles.title}>Pact Created!</Text>
            <Text style={styles.subtitle}>Invite your friends to join.</Text>
          </View>

          {/* Pact Summary */}
          <View style={styles.card}>
            <Text style={styles.pactTitle}>Cricket at Barabati Ground 🏏</Text>
            <DetailRow emoji="📅" text="Tomorrow, 7:00 AM" />
            <DetailRow emoji="📍" text="Barabati Stadium, Cuttack" />
            <DetailRow emoji="💰" text="₹200 per person" />
            <DetailRow emoji="🍽️" text="Loser buys dinner at local dhaba" />
          </View>

          {/* Anti-Charity */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Your Anti-Charity (Backup)</Text>
            <Text style={styles.antiCharityNote}>Where your money goes if dinner isn't collected in 48h</Text>
            <View style={styles.charityRow}>
              <Text style={styles.charityEmoji}>🏛️</Text>
              <Text style={styles.charityName}>Bhakt's Party Fund</Text>
              <Text style={styles.charityTag}>(You hate politics 😂)</Text>
            </View>
          </View>

          {/* Share Link */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Share Link</Text>
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>pakka.app/join/abc123</Text>
              <Pressable style={styles.qrBtn}>
                <Ionicons name="qr-code-outline" size={20} color={accent.a500} />
              </Pressable>
            </View>
          </View>

          {/* Avatars */}
          <View style={styles.avatarRow}>
            {invitedFriends.map((f, i) => (
              <View key={i} style={[styles.avatar, { backgroundColor: f.color, marginLeft: i > 0 ? -10 : 0 }]}>
                <Text style={styles.avatarText}>{f.initial}</Text>
              </View>
            ))}
            <View style={[styles.avatar, { backgroundColor: '#E0E0E0', marginLeft: -10 }]}>
              <Text style={[styles.avatarText, { color: '#666' }]}>+2</Text>
            </View>
          </View>

          {/* WhatsApp Button */}
          <Button
            variant="whatsapp"
            title="📱 Invite on WhatsApp"
            fullWidth
            style={{ marginTop: spacing.xl }}
          />

          {/* More ways */}
          <Pressable style={styles.moreRow}>
            <Text style={styles.moreText}>More ways to invite</Text>
            <Ionicons name="share-outline" size={16} color={accent.a500} />
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function DetailRow({ emoji, text: detailText }: { emoji: string; text: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailEmoji}>{emoji}</Text>
      <Text style={styles.detailText}>{detailText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  headerArea: { alignItems: 'center', marginBottom: spacing['2xl'] },
  mascot: { fontSize: 64, marginBottom: spacing.sm },
  title: { fontSize: 26, fontWeight: '800', color: '#1A1A1A' },
  subtitle: { fontSize: 15, color: '#666666', marginTop: 4 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: radii.lg, borderWidth: 1,
    borderColor: '#F0F0F0', ...shadows.card, padding: spacing.lg, marginBottom: spacing.lg,
  },
  pactTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: spacing.md },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  detailEmoji: { fontSize: 16 },
  detailText: { fontSize: 14, color: '#424242' },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  antiCharityNote: { fontSize: 12, color: '#999999', marginBottom: spacing.sm },
  charityRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  charityEmoji: { fontSize: 16 },
  charityName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  charityTag: { fontSize: 12, color: '#999999' },
  linkRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  linkText: { fontSize: 14, color: accent.a500, fontWeight: '500' },
  qrBtn: { padding: spacing.sm, backgroundColor: '#FFF3EE', borderRadius: radii.sm },
  avatarRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg },
  avatar: {
    width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
  },
  avatarText: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  moreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, marginTop: spacing.lg },
  moreText: { fontSize: 14, color: accent.a500, fontWeight: '500' },
});
