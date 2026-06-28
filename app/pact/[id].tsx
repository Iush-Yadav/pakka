/**
 * PAKKA — Pact Details Timeline
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { usePactStore } from '@/stores/pactStore';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';

export default function PactDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { pactHistory, activePacts } = usePactStore();
  
  const pact = activePacts.find(p => p.id === id) || pactHistory.find(p => p.id === id);

  if (!pact) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text>Pact not found</Text>
        <Button title="Go Back" onPress={() => router.back()} style={{ marginTop: 20 }} />
      </View>
    );
  }

  const isCompleted = pact.status === 'completed';

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Pact Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            <Text style={styles.title}>{pact.name}</Text>
            <View style={styles.tagRow}>
              <View style={[styles.statusTag, isCompleted ? styles.statusCompleted : styles.statusActive]}>
                <Text style={[styles.statusText, isCompleted ? styles.statusCompletedText : styles.statusActiveText]}>
                  {isCompleted ? 'Completed' : 'Active'}
                </Text>
              </View>
              <Text style={styles.dateTime}>{pact.date.toString().substring(0, 10)} • {pact.time}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Timeline</Text>
          
          <View style={styles.timeline}>
            {/* Timeline Item 1 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIconContainer}>
                <Ionicons name="add-circle" size={20} color={accent.a500} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Pact Created</Text>
                <Text style={styles.timelineDesc}>You created the pact and set the stakes at ₹{('stakeAmount' in pact) ? pact.stakeAmount : 200}.</Text>
              </View>
            </View>

            {/* Timeline Item 2 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIconContainer}>
                <Ionicons name="people" size={20} color={accent.a500} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>{pact.members.length} Members Joined</Text>
                <Text style={styles.timelineDesc}>Total pool amount: ₹{(('stakeAmount' in pact) ? pact.stakeAmount : 200) * pact.members.length}.</Text>
              </View>
            </View>

            {/* Timeline Item 3 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIconContainer}>
                <Ionicons name={isCompleted ? "checkmark-circle" : "time"} size={20} color={isCompleted ? "#22C55E" : "#EAB308"} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>{isCompleted ? 'Check-in Complete' : 'Waiting for Check-in'}</Text>
                <Text style={styles.timelineDesc}>{isCompleted ? ('showedUp' in pact ? pact.showedUp : 'Check-in finished.') : 'Check-in window opens 15 mins before start time.'}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Members</Text>
          <View style={styles.card}>
            {pact.members.map((m, i) => (
              <View key={m.userId} style={[styles.memberRow, i < pact.members.length - 1 && styles.border]}>
                <View style={[styles.avatar, { backgroundColor: m.avatarColor }]}>
                  <Text style={styles.avatarText}>{m.initial}</Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{m.name}</Text>
                  <Text style={styles.memberRole}>{m.role === 'creator' ? 'Creator' : 'Member'}</Text>
                </View>
                <View style={[styles.checkInBadge, { backgroundColor: m.checkInStatus === 'checked_in' ? '#DCFCE7' : m.checkInStatus === 'missed' ? '#FEE2E2' : '#F0F0F0' }]}>
                  <Text style={[styles.checkInText, { color: m.checkInStatus === 'checked_in' ? '#22C55E' : m.checkInStatus === 'missed' ? '#EF4444' : '#666666' }]}>
                    {m.checkInStatus === 'checked_in' ? 'Checked in' : m.checkInStatus === 'missed' ? 'Missed' : 'Pending'}
                  </Text>
                </View>
              </View>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: '#FFFFFF' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  scroll: { padding: spacing.xl, paddingBottom: 60 },
  
  card: { backgroundColor: '#FFFFFF', borderRadius: radii.xl, padding: spacing.xl, marginBottom: spacing.xl, ...shadows.s, borderWidth: 1, borderColor: '#F0F0F0' },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', marginBottom: spacing.md },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  statusTag: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: radii.pill },
  statusCompleted: { backgroundColor: '#DCFCE7' },
  statusActive: { backgroundColor: '#FFF3EE' },
  statusText: { fontSize: 12, fontWeight: '700' },
  statusCompletedText: { color: '#22C55E' },
  statusActiveText: { color: accent.a500 },
  dateTime: { fontSize: 14, color: '#666666' },
  
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginBottom: spacing.md, marginTop: spacing.sm },
  
  timeline: { backgroundColor: '#FFFFFF', borderRadius: radii.xl, padding: spacing.xl, marginBottom: spacing.xl, ...shadows.s, borderWidth: 1, borderColor: '#F0F0F0' },
  timelineItem: { flexDirection: 'row', minHeight: 70 },
  timelineIconContainer: { alignItems: 'center', marginRight: spacing.lg },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#F0F0F0', marginVertical: 4 },
  timelineContent: { flex: 1, paddingBottom: spacing.xl },
  timelineTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginBottom: 2 },
  timelineDesc: { fontSize: 13, color: '#666666', lineHeight: 18 },
  
  memberRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  border: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  avatarText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 15, fontWeight: '600', color: '#1A1A1A', marginBottom: 2 },
  memberRole: { fontSize: 12, color: '#999999' },
  checkInBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radii.xs },
  checkInText: { fontSize: 11, fontWeight: '700' }
});
