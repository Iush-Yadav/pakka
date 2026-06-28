/**
 * PAKKA — My Pacts Screen
 * Matches screenshot 11: filter tabs, pact history cards
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { pactHistory } from '@/lib/mockData';

type Filter = 'All' | 'Completed' | 'Upcoming';

export default function MyPactsScreen() {
  const [filter, setFilter] = useState<Filter>('All');
  const filters: Filter[] = ['All', 'Completed', 'Upcoming'];

  const filteredPacts = pactHistory.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return p.status === 'completed';
    if (filter === 'Upcoming') return p.status === 'upcoming';
    return true;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>My Pacts</Text>

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          {filters.map(f => (
            <Pressable
              key={f}
              style={[styles.filterPill, filter === f && styles.filterPillActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {filteredPacts.map((pact, i) => (
            <Pressable
              key={pact.id}
              style={styles.pactCard}
              onPress={() => router.push('/pact/result' as any)}
            >
              <View style={styles.pactHeader}>
                <Text style={styles.pactName}>{pact.name}</Text>
                <View style={[styles.statusBadge, pact.status === 'completed' ? styles.badgeGreen : styles.badgeOrange]}>
                  <Text style={[styles.statusText, pact.status === 'completed' ? styles.textGreen : styles.textOrange]}>
                    {pact.status === 'completed' ? 'Completed' : 'Upcoming'}
                  </Text>
                </View>
              </View>
              <Text style={styles.pactMeta}>{pact.date} · {pact.time}</Text>
              <Text style={styles.pactShowed}>{pact.showedUp}</Text>
            </Pressable>
          ))}

          {filteredPacts.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📋</Text>
              <Text style={styles.emptyText}>No pacts found</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: '800', color: '#1A1A1A', paddingHorizontal: spacing.xl, paddingTop: spacing.lg },
  filterRow: { flexDirection: 'row', paddingHorizontal: spacing.xl, marginTop: spacing.lg, gap: spacing.sm },
  filterPill: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: radii.pill,
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  filterPillActive: { backgroundColor: accent.a500, borderColor: accent.a500 },
  filterText: { fontSize: 13, fontWeight: '600', color: '#666666' },
  filterTextActive: { color: '#1A1A1A' },
  scroll: { padding: spacing.xl, paddingBottom: 120 },
  pactCard: {
    backgroundColor: '#FFFFFF', borderRadius: radii.lg, borderWidth: 1,
    borderColor: '#F0F0F0', ...shadows.card, padding: spacing.lg, marginBottom: spacing.md,
  },
  pactHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  pactName: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', flex: 1, marginRight: spacing.sm },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill },
  badgeGreen: { backgroundColor: '#DCFCE7' },
  badgeOrange: { backgroundColor: '#FFF3EE' },
  statusText: { fontSize: 11, fontWeight: '600' },
  textGreen: { color: '#22C55E' },
  textOrange: { color: accent.a500 },
  pactMeta: { fontSize: 13, color: '#999999', marginTop: 6 },
  pactShowed: { fontSize: 13, color: '#666666', marginTop: 4 },
  emptyState: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.md },
  emptyText: { fontSize: 16, color: '#999999' },
});
