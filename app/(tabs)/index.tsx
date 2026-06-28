/**
 * PAKKA — Home Screen
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { useUserStore } from '@/stores/userStore';
import { usePactStore } from '@/stores/pactStore';
import { MascotBubble } from '@/components/ui/MascotBubble';
import { PactCard } from '@/components/ui/PactCard';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const { user, notifications } = useUserStore();
  const { activePacts } = usePactStore();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleCreate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(tabs)/create');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user.name.split(' ')[0]} 👋</Text>
            <Text style={styles.scoreText}>Pakka Score: <Text style={styles.scoreHighlight}>{user.pakkaScore}</Text></Text>
          </View>
          <Pressable onPress={() => router.push('/notifications')} style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <MascotBubble
            mascotEmoji="🐕"
            mascotName="Pakku"
            message="Time to check in for your Cricket match soon! Don't lose that dinner money!"
            size="small"
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Pacts</Text>
            <Pressable onPress={() => router.push('/(tabs)/mypacts')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>

          {activePacts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No active pacts right now.</Text>
              <Pressable onPress={handleCreate} style={styles.createBtn}>
                <Text style={styles.createBtnText}>+ Create one</Text>
              </Pressable>
            </View>
          ) : (
            activePacts.map(pact => (
              <PactCard
                key={pact.id}
                name={pact.name}
                date={pact.date.toLocaleDateString()}
                time={pact.time}
                status="upcoming"
                showedUp={`${pact.members.length} members joined`}
                onPress={() => router.push(`/pact/waiting?id=${pact.id}` as any)}
              />
            ))
          )}

          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Pressable style={styles.actionCard} onPress={handleCreate}>
              <View style={[styles.actionIcon, { backgroundColor: '#FFF3EE' }]}>
                <Ionicons name="add" size={24} color={accent.a500} />
              </View>
              <Text style={styles.actionText}>New Pact</Text>
            </Pressable>
            <Pressable style={styles.actionCard} onPress={() => router.push('/wallet')}>
              <View style={[styles.actionIcon, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="wallet" size={24} color="#22C55E" />
              </View>
              <Text style={styles.actionText}>Wallet</Text>
            </Pressable>
            <Pressable style={styles.actionCard} onPress={() => router.push('/friends')}>
              <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="people" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.actionText}>Friends</Text>
            </Pressable>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: '#FFFFFF' },
  greeting: { fontSize: 24, fontWeight: '800', color: '#1A1A1A' },
  scoreText: { fontSize: 14, color: '#666666', marginTop: 4 },
  scoreHighlight: { color: accent.a500, fontWeight: '700' },
  
  notifBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#EF4444', minWidth: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
  badgeText: { fontSize: 10, color: '#FFFFFF', fontWeight: '800' },
  
  scroll: { padding: spacing.xl, paddingBottom: 100 },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  seeAll: { fontSize: 14, color: accent.a500, fontWeight: '600' },
  
  emptyState: { backgroundColor: '#FFFFFF', padding: spacing.xl, borderRadius: radii.xl, alignItems: 'center', borderWidth: 1, borderColor: '#F0F0F0', ...shadows.s },
  emptyText: { fontSize: 14, color: '#999999', marginBottom: spacing.md },
  createBtn: { backgroundColor: '#FFF3EE', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radii.pill },
  createBtnText: { color: accent.a500, fontWeight: '700', fontSize: 14 },
  
  quickActions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  actionCard: { flex: 1, backgroundColor: '#FFFFFF', padding: spacing.md, borderRadius: radii.lg, alignItems: 'center', borderWidth: 1, borderColor: '#F0F0F0', ...shadows.xs },
  actionIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  actionText: { fontSize: 13, fontWeight: '600', color: '#1A1A1A' },
});
