/**
 * PAKKA — Profile Screen
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { useUserStore } from '@/stores/userStore';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ProfileScreen() {
  const { user, stats } = useUserStore();

  const handlePress = (route: string) => {
    Haptics.selectionAsync();
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable onPress={() => handlePress('/settings')} style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: user.avatarColor }]}>
              <Text style={styles.avatarText}>{user.name ? user.name.charAt(0) : '?'}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.username}>@{user.username}</Text>
            </View>
            <Pressable onPress={() => handlePress('/profile-setup')} style={styles.editBtn}>
              <Ionicons name="pencil" size={16} color="#666666" />
            </Pressable>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statScore}>{user.pakkaScore}</Text>
              <Text style={styles.statLabel}>Pakka Score</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statScore, { color: '#EAB308' }]}>🔥 {stats.currentStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Dashboard</Text>
          
          <View style={styles.menuGroup}>
            <Pressable style={styles.menuItem} onPress={() => handlePress('/wallet')}>
              <View style={[styles.menuIcon, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="wallet" size={20} color="#22C55E" />
              </View>
              <Text style={styles.menuLabel}>Wallet & Transactions</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>₹{user.walletBalance}</Text></View>
              <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem} onPress={() => handlePress('/friends')}>
              <View style={[styles.menuIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="people" size={20} color="#3B82F6" />
              </View>
              <Text style={styles.menuLabel}>Friends & Leaderboard</Text>
              <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
            </Pressable>
            
            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem} onPress={() => handlePress('/(tabs)/mypacts')}>
              <View style={[styles.menuIcon, { backgroundColor: '#FFF3EE' }]}>
                <Ionicons name="document-text" size={20} color={accent.a500} />
              </View>
              <Text style={styles.menuLabel}>Pact History</Text>
              <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
            </Pressable>
          </View>

          <View style={styles.achievementCard}>
            <View style={styles.achievementHeader}>
              <Text style={styles.mascot}>🦊</Text>
              <View>
                <Text style={styles.achievementTitle}>Reliability Master</Text>
                <Text style={styles.achievementDesc}>Completed 5 pacts in a row!</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: '#FFFFFF' },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#1A1A1A' },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: spacing.xl, paddingBottom: 100 },
  
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing['2xl'] },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md, ...shadows.s },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  profileInfo: { flex: 1 },
  name: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 2 },
  username: { fontSize: 14, color: '#666666' },
  editBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E0E0E0', alignItems: 'center', justifyContent: 'center' },
  
  statsGrid: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing['2xl'] },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', padding: spacing.lg, borderRadius: radii.lg, alignItems: 'center', borderWidth: 1, borderColor: '#F0F0F0', ...shadows.xs },
  statScore: { fontSize: 28, fontWeight: '800', color: accent.a500, marginBottom: 4 },
  statLabel: { fontSize: 12, fontWeight: '600', color: '#999999', textTransform: 'uppercase' },
  
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginBottom: spacing.md },
  
  menuGroup: { backgroundColor: '#FFFFFF', borderRadius: radii.xl, borderWidth: 1, borderColor: '#F0F0F0', ...shadows.s, marginBottom: spacing['2xl'] },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg },
  menuIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  menuLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  menuDivider: { height: 1, backgroundColor: '#F0F0F0', marginLeft: 72 },
  
  badge: { backgroundColor: '#F0F0F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill, marginRight: spacing.sm },
  badgeText: { fontSize: 13, fontWeight: '700', color: '#1A1A1A' },
  
  achievementCard: { backgroundColor: '#FFFFFF', borderRadius: radii.xl, padding: spacing.xl, borderWidth: 1, borderColor: '#F0F0F0', ...shadows.s },
  achievementHeader: { flexDirection: 'row', alignItems: 'center' },
  mascot: { fontSize: 36, marginRight: spacing.md },
  achievementTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  achievementDesc: { fontSize: 13, color: '#666666', marginTop: 2 },
});
