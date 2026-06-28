/**
 * PAKKA — Create Pact
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Ionicons } from '@expo/vector-icons';
import { usePactStore } from '@/stores/pactStore';
import { currentUser } from '@/lib/mockData';
import * as Haptics from 'expo-haptics';

export default function CreatePactScreen() {
  const { addPact, draftLocation } = usePactStore();
  const [title, setTitle] = useState('');
  const [stake, setStake] = useState('200');

  const handleCreate = () => {
    if (!title || !draftLocation) {
      alert('Please set title and location');
      return;
    }
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    const newPact = {
      id: Math.random().toString(),
      name: title,
      description: 'Created from app',
      createdBy: currentUser.id,
      stakeAmount: Number(stake),
      consequence: 'dinner' as const,
      consequenceDetail: 'Loser buys dinner',
      charityId: 'cry1',
      date: new Date(Date.now() + 86400000),
      time: '7:00 AM',
      location: draftLocation.address,
      locationCoords: { latitude: draftLocation.latitude, longitude: draftLocation.longitude },
      gpsRadius: draftLocation.radius,
      checkinWindow: 15,
      status: 'active' as const,
      members: [{
        userId: currentUser.id,
        pactId: 'temp',
        name: currentUser.name,
        avatarColor: currentUser.avatarColor,
        initial: currentUser.name.charAt(0),
        role: 'creator' as const,
        checkInStatus: 'pending' as const,
        depositStatus: 'paid' as const,
        joinedAt: new Date()
      }],
      totalMembers: 1,
      checkedInCount: 0,
      createdAt: new Date(),
    };
    
    addPact(newPact);
    router.push(`/share-invite?pactName=${encodeURIComponent(title)}` as any);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create a Pact <Text style={{ fontSize: 24 }}>🐰</Text></Text>
        </View>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            
            <View style={styles.card}>
              <Input
                label="Pact Title"
                placeholder="e.g. Cricket at Barabati Ground 🏏"
                value={title}
                onChangeText={setTitle}
                style={{ marginBottom: spacing.xl }}
              />
              
              <Input
                label="Stakes (per person)"
                placeholder="200"
                value={stake}
                onChangeText={setStake}
                keyboardType="numeric"
                prefix="₹"
              />
            </View>
            
            <Text style={styles.sectionTitle}>Logistics</Text>
            
            <View style={styles.card}>
              <Pressable style={styles.row} onPress={() => router.push('/map-picker')}>
                <View style={styles.iconBox}><Ionicons name="location" size={20} color="#1A1A1A" /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>Location & Radius</Text>
                  <Text style={styles.rowValue} numberOfLines={1}>
                    {draftLocation ? `${draftLocation.address} • ${draftLocation.radius}m` : 'Tap to set location'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
              </Pressable>
              
              <View style={styles.divider} />
              
              <Pressable style={styles.row}>
                <View style={styles.iconBox}><Ionicons name="calendar" size={20} color="#1A1A1A" /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>Date & Time</Text>
                  <Text style={styles.rowValue}>Tomorrow, 7:00 AM</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>Forfeited Deposits Go To</Text>
            <View style={styles.card}>
              <Pressable style={styles.row} onPress={() => router.push('/(tabs)/impact')}>
                <View style={styles.iconBox}><Ionicons name="heart" size={20} color="#EF4444" /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>Selected Charity</Text>
                  <Text style={styles.rowValue}>CRY India 📚</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
              </Pressable>
            </View>

            <Button
              variant="primary"
              title="Create Pact +"
              fullWidth
              disabled={!title}
              onPress={handleCreate}
              style={{ marginTop: spacing.xl }}
            />
            
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: '#FFFFFF' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1A1A1A' },
  scroll: { padding: spacing.xl, paddingBottom: 100 },
  
  card: { backgroundColor: '#FFFFFF', borderRadius: radii.xl, padding: spacing.xl, marginBottom: spacing.xl, ...shadows.s, borderWidth: 1, borderColor: '#F0F0F0' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#999999', textTransform: 'uppercase', marginBottom: spacing.md, paddingHorizontal: spacing.sm },
  
  row: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F8F8F8', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  rowLabel: { fontSize: 12, color: '#666666', marginBottom: 2 },
  rowValue: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: spacing.lg, marginLeft: 56 },
});
