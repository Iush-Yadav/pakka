/**
 * PAKKA — Friends Screen
 * Leaderboard & List
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { friends } from '@/lib/mockData';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';

export default function FriendsScreen() {
  // Sort friends by score for leaderboard
  const sortedFriends = [...friends].sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Friends</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <View style={styles.inviteCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inviteTitle}>Find your squad 🐺</Text>
              <Text style={styles.inviteDesc}>Invite friends to hold each other accountable.</Text>
            </View>
            <Button variant="secondary" title="Invite" onPress={async () => {
              try {
                await Linking.openURL(`whatsapp://send?text=${encodeURIComponent('Join me on Pakka and let\'s hold each other accountable! https://pakka.app')}`);
              } catch (e) {
                Alert.alert('Error', 'WhatsApp not installed');
              }
            }} />
          </View>

          <Text style={styles.sectionTitle}>Leaderboard</Text>
          
          <View style={styles.leaderboard}>
            {sortedFriends.length === 0 ? (
              <View style={{ padding: spacing.xl, alignItems: 'center' }}>
                <Text style={{ fontSize: 40, marginBottom: 8 }}>🐺</Text>
                <Text style={{ fontSize: 15, color: '#666666', textAlign: 'center' }}>No friends added yet. Invite your squad to start competing!</Text>
              </View>
            ) : (
              sortedFriends.map((friend, index) => (
                <View key={friend.id} style={[styles.friendRow, index < sortedFriends.length - 1 && styles.border]}>
                  <Text style={styles.rank}>#{index + 1}</Text>
                  
                  <View style={[styles.avatar, { backgroundColor: friend.avatarColor }]}>
                    <Text style={styles.avatarText}>{friend.initial}</Text>
                  </View>
                  
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{friend.name}</Text>
                    <Text style={styles.friendSub}>{friend.mutualPacts} mutual pacts</Text>
                  </View>
                  
                  <View style={styles.scoreBadge}>
                    <Text style={styles.scoreText}>{friend.score}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  scroll: { padding: spacing.xl, paddingBottom: 60 },
  
  inviteCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3EE',
    padding: spacing.xl, borderRadius: radii.xl, marginBottom: spacing['2xl'],
    borderWidth: 1, borderColor: '#FFE0D0'
  },
  inviteTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  inviteDesc: { fontSize: 13, color: '#666666', paddingRight: spacing.lg },
  
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginBottom: spacing.lg },
  
  leaderboard: {
    backgroundColor: '#FFFFFF', borderRadius: radii.xl, borderWidth: 1, borderColor: '#F0F0F0',
    ...shadows.card
  },
  friendRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg },
  border: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  
  rank: { fontSize: 16, fontWeight: '700', color: '#999999', width: 32 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  avatarText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginBottom: 2 },
  friendSub: { fontSize: 12, color: '#999999' },
  
  scoreBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill },
  scoreText: { color: '#22C55E', fontWeight: '800', fontSize: 14 }
});
