/**
 * PAKKA — Live Check-in Screen
 * Uses expo-location to verify distance between current user and pact location.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { accent, spacing, radii, shadows, semantic } from '@/constants/tokens';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import * as Location from 'expo-location';
import { usePactStore } from '@/stores/pactStore';
import { useUserStore } from '@/stores/userStore';
import { Button } from '@/components/ui/Button';
import * as Haptics from 'expo-haptics';

// Haversine formula to calculate distance in meters
function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Radius of earth in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

export default function CheckinScreen() {
  const { id } = useLocalSearchParams();
  const { activePacts, checkIn } = usePactStore();
  const { user } = useUserStore();
  
  const pact = activePacts.find(p => p.id === id);
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s === 0) {
          setMinutes(m => {
            if (m === 0) { clearInterval(interval); return 0; }
            return m - 1;
          });
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!pact) {
    return <View style={styles.container}><Text>Pact not found</Text></View>;
  }

  const currentUserMember = pact.members.find(m => m.userId === user.id);
  const hasCheckedIn = currentUserMember?.checkInStatus === 'checked_in';

  const handleCheckIn = async () => {
    if (!pact.locationCoords) {
      // Mock pacts might not have coords, so just allow it
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      checkIn(pact.id, user.id);
      return;
    }

    setChecking(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need your location to verify check-in.');
      setChecking(false);
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const distance = getDistanceFromLatLonInMeters(
        location.coords.latitude, 
        location.coords.longitude,
        pact.locationCoords.latitude,
        pact.locationCoords.longitude
      );

      if (distance <= pact.gpsRadius) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        checkIn(pact.id, user.id);
        Alert.alert('Success!', `You checked in successfully! (${Math.round(distance)}m from target)`);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Too Far', `You are ${Math.round(distance)}m away from the location. You need to be within ${pact.gpsRadius}m.`);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to get current location.');
    } finally {
      setChecking(false);
    }
  };

  const totalTime = 15 * 60;
  const elapsed = totalTime - (minutes * 60 + seconds);
  const progress = elapsed / totalTime;
  const size = 180;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" onPress={() => router.back()} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle} numberOfLines={1}>{pact.name}</Text>
            <Text style={styles.headerSub}>Check-in Window: {pact.time}</Text>
          </View>
          <Text style={styles.mascot}>🐧</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.timerArea}>
            <Svg width={size} height={size}>
              <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#F0F0F0" strokeWidth={strokeWidth} fill="none" />
              <Circle cx={size / 2} cy={size / 2} r={radius} stroke={accent.a500} strokeWidth={strokeWidth}
                fill="none" strokeLinecap="round" strokeDasharray={`${circumference}`}
                strokeDashoffset={strokeDashoffset} rotation="-90" origin={`${size / 2}, ${size / 2}`}
              />
            </Svg>
            <View style={styles.timerContent}>
              <Text style={styles.timerLabel}>Time Left</Text>
              <Text style={styles.timerValue}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </Text>
              <Text style={styles.timerUnit}>min</Text>
            </View>
          </View>

          <Button 
            title={checking ? "Verifying GPS..." : hasCheckedIn ? "Checked In Successfully" : "Verify My Location & Check In"}
            disabled={checking || hasCheckedIn}
            onPress={handleCheckIn}
            fullWidth
            style={{ marginBottom: spacing.xl, backgroundColor: hasCheckedIn ? '#22C55E' : accent.a500 }}
          />

          <Text style={styles.checkedText}>{pact.checkedInCount} / {pact.totalMembers} Checked In</Text>

          <View style={styles.memberCard}>
            {pact.members.map((m, i) => (
              <View key={i} style={[styles.memberRow, i < pact.members.length - 1 && styles.memberBorder]}>
                <View style={[styles.avatar, { backgroundColor: m.avatarColor }]}>
                  <Text style={styles.avatarText}>{m.initial}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.memberName}>{m.name}</Text>
                  <Text style={styles.memberTime}>
                    {m.checkInStatus === 'checked_in' ? `Checked in · ${m.checkInTime}` : 'Not checked in yet'}
                  </Text>
                </View>
                {m.checkInStatus === 'checked_in' ? (
                  <Ionicons name="checkmark-circle" size={22} color={semantic.success} />
                ) : (
                  <Ionicons name="time-outline" size={22} color="#BDBDBD" />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  headerSub: { fontSize: 12, color: '#999999', marginTop: 2 },
  mascot: { fontSize: 28 },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  timerArea: { alignItems: 'center', justifyContent: 'center', marginVertical: spacing['2xl'] },
  timerContent: { position: 'absolute', alignItems: 'center' },
  timerLabel: { fontSize: 12, color: '#999999', fontWeight: '500' },
  timerValue: { fontSize: 42, fontWeight: '800', color: '#1A1A1A', marginTop: 4 },
  timerUnit: { fontSize: 14, color: '#999999', marginTop: 2 },
  checkedText: { textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginBottom: spacing.md },
  memberCard: { backgroundColor: '#FFFFFF', borderRadius: radii.lg, borderWidth: 1, borderColor: '#F0F0F0', ...shadows.card, padding: spacing.lg },
  memberRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, gap: spacing.md },
  memberBorder: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  avatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  memberName: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  memberTime: { fontSize: 12, color: '#999999', marginTop: 2 },
});
