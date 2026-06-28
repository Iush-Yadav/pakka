/**
 * PAKKA — Waiting Room
 * Shown before the check-in window opens.
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { usePactStore } from '@/stores/pactStore';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { CountdownTimer } from '@/components/ui/CountdownTimer';

export default function WaitingRoomScreen() {
  const { id } = useLocalSearchParams();
  const { activePacts } = usePactStore();
  const pact = activePacts.find(p => p.id === id);

  if (!pact) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text>Pact not found</Text>
        <Button title="Go Back" onPress={() => router.back()} style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Waiting Room</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <Text style={styles.mascot}>🦉</Text>
          <Text style={styles.title}>{pact.name}</Text>
          <Text style={styles.subtitle}>Check-in window opens in</Text>
          
          <View style={{ marginVertical: spacing['3xl'] }}>
            {/* Mocking 2 hours 15 mins for waiting room */}
            <CountdownTimer hours={2} minutes={15} seconds={30} size={220} label="Time to Check-in" />
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="people" size={20} color={accent.a500} />
              <Text style={styles.statValue}>{pact.members.length}</Text>
              <Text style={styles.statLabel}>Joined</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Ionicons name="cash" size={20} color="#22C55E" />
              <Text style={styles.statValue}>₹{pact.stakeAmount * pact.members.length}</Text>
              <Text style={styles.statLabel}>Total Pool</Text>
            </View>
          </View>

        </View>
        
        <View style={styles.footer}>
          <Button
            variant="secondary"
            title="Invite More Friends"
            fullWidth
            onPress={() => router.push(`/share-invite?pactName=${pact.name}` as any)}
            style={{ marginBottom: spacing.md }}
          />
          <Button
            variant="primary"
            title="Simulate Check-in Time"
            fullWidth
            onPress={() => router.replace(`/pact/checkin?id=${pact.id}` as any)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  
  content: { flex: 1, alignItems: 'center', paddingTop: spacing['3xl'], paddingHorizontal: spacing.xl },
  mascot: { fontSize: 48, marginBottom: spacing.sm },
  title: { fontSize: 24, fontWeight: '800', color: '#1A1A1A', textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#666666', marginTop: 4 },
  
  statsRow: { flexDirection: 'row', backgroundColor: '#F8F8F8', borderRadius: radii.lg, padding: spacing.lg, width: '100%', borderWidth: 1, borderColor: '#F0F0F0', ...shadows.xs },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginTop: spacing.sm },
  statLabel: { fontSize: 12, color: '#666666', marginTop: 2 },
  divider: { width: 1, height: '100%', backgroundColor: '#E0E0E0' },
  
  footer: { padding: spacing.xl, paddingBottom: 40 },
});
