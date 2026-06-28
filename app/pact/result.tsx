/**
 * PAKKA — Result Screen (Both variants)
 * Screenshots 6 (all showed) & 7 (some no-show)
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows, semantic } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { pactMembersAllShowed, pactMembers } from '@/lib/mockData';

export default function ResultScreen() {
  const [allShowed, setAllShowed] = useState(true);
  const members = allShowed ? pactMembersAllShowed : pactMembers;
  const missed = pactMembers.filter(m => m.checkInStatus === 'missed');

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Toggle */}
          <View style={styles.toggleRow}>
            <Pressable
              style={[styles.toggleBtn, allShowed && styles.toggleActive]}
              onPress={() => setAllShowed(true)}
            >
              <Text style={[styles.toggleText, allShowed && styles.toggleTextActive]}>All Showed ✅</Text>
            </Pressable>
            <Pressable
              style={[styles.toggleBtn, !allShowed && styles.toggleActive]}
              onPress={() => setAllShowed(false)}
            >
              <Text style={[styles.toggleText, !allShowed && styles.toggleTextActive]}>Some Missed ❌</Text>
            </Pressable>
          </View>

          {allShowed ? (
            /* ALL SHOWED UP */
            <>
              <View style={[styles.heroArea, { backgroundColor: '#F0FFF4' }]}>
                <Text style={styles.heroMascot}>🦊</Text>
                <Text style={styles.heroTitle}>Pakka 5/5!</Text>
                <Text style={styles.heroSubtitle}>Everyone showed up.{'\n'}Well done!</Text>
              </View>
              <View style={styles.refundCard}>
                <Text style={styles.refundLabel}>Refunded to Everyone</Text>
                <Text style={styles.refundAmount}>₹200</Text>
                <Text style={styles.refundSub}>Each</Text>
              </View>
            </>
          ) : (
            /* SOME NO-SHOW */
            <>
              <View style={[styles.heroArea, { backgroundColor: '#FFFBEB' }]}>
                <Text style={styles.heroMascot}>🐕😢</Text>
                <Text style={styles.heroTitle}>Vikas didn't show up 😢</Text>
                <Text style={styles.heroSubtitle}>Dinner's on him tonight!</Text>
              </View>
              <View style={styles.refundCard}>
                <Text style={styles.refundLabel}>Amount Held</Text>
                <Text style={styles.refundAmount}>₹200</Text>
                <Text style={styles.refundSub}>From Vikas</Text>
              </View>
            </>
          )}

          {/* Member List */}
          <View style={styles.memberCard}>
            {members.map((m, i) => (
              <View key={i} style={[styles.memberRow, i < members.length - 1 && styles.memberBorder]}>
                <View style={[styles.avatar, { backgroundColor: m.avatarColor }]}>
                  <Text style={styles.avatarText}>{m.initial}</Text>
                </View>
                <Text style={[styles.memberName, { flex: 1 }]}>{m.name}</Text>
                <View style={[
                  styles.badge,
                  m.depositStatus === 'refunded' ? styles.badgeGreen : styles.badgeRed,
                ]}>
                  <Text style={[
                    styles.badgeText,
                    m.depositStatus === 'refunded' ? styles.badgeTextGreen : styles.badgeTextRed,
                  ]}>
                    {m.depositStatus === 'refunded' ? 'Refunded' : 'Forfeited'}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <Button
            variant="secondary"
            title="View Summary"
            fullWidth
            onPress={() => allShowed ? router.back() : router.push('/pact/dinner' as any)}
            style={{ marginTop: spacing.xl }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  toggleRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: radii.pill, borderWidth: 1, borderColor: '#E0E0E0', alignItems: 'center' },
  toggleActive: { backgroundColor: accent.a500, borderColor: accent.a500 },
  toggleText: { fontSize: 13, fontWeight: '600', color: '#666666' },
  toggleTextActive: { color: '#1A1A1A' },
  heroArea: { borderRadius: radii.xl, padding: spacing['3xl'], alignItems: 'center', marginBottom: spacing.xl },
  heroMascot: { fontSize: 64, marginBottom: spacing.md },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#1A1A1A', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, color: '#666666', textAlign: 'center', marginTop: spacing.sm },
  refundCard: {
    backgroundColor: '#FFFFFF', borderRadius: radii.lg, borderWidth: 1,
    borderColor: '#F0F0F0', ...shadows.card, padding: spacing.xl, alignItems: 'center', marginBottom: spacing.xl,
  },
  refundLabel: { fontSize: 14, fontWeight: '600', color: '#666666' },
  refundAmount: { fontSize: 36, fontWeight: '800', color: '#1A1A1A', marginTop: spacing.sm },
  refundSub: { fontSize: 14, color: '#999999', marginTop: 4 },
  memberCard: {
    backgroundColor: '#FFFFFF', borderRadius: radii.lg, borderWidth: 1,
    borderColor: '#F0F0F0', ...shadows.card, padding: spacing.lg,
  },
  memberRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, gap: spacing.md },
  memberBorder: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  avatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  memberName: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill },
  badgeGreen: { backgroundColor: '#DCFCE7' },
  badgeRed: { backgroundColor: '#FEE2E2' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  badgeTextGreen: { color: '#22C55E' },
  badgeTextRed: { color: '#EF4444' },
});
