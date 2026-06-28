/**
 * PAKKA — Map Picker Modal
 * Uses expo-location to fetch real device GPS and reverse geocodes the address.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { usePactStore } from '@/stores/pactStore';

export default function MapPickerScreen() {
  const [radius, setRadius] = useState(500);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('Locating...');
  const [coords, setCoords] = useState<{latitude: number, longitude: number} | null>(null);
  
  const setDraftLocation = usePactStore(s => s.setDraftLocation);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setAddress('Location Access Denied');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setCoords({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        
        let geo = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        if (geo.length > 0) {
          const place = geo[0];
          setAddress(`${place.name || place.street}, ${place.city}`);
        } else {
          setAddress('Unknown Location');
        }
      } catch (e) {
        setAddress('Could not fetch location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleConfirm = () => {
    if (!coords) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setDraftLocation({
      address,
      latitude: coords.latitude,
      longitude: coords.longitude,
      radius
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color="#1A1A1A" />
        </Pressable>
        <Text style={styles.headerTitle}>Check-in Location</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.mapMock}>
        {loading ? (
          <ActivityIndicator size="large" color={accent.a500} />
        ) : (
          <>
            <Ionicons name="map-outline" size={80} color="#E0E0E0" />
            <View style={styles.pin}>
              <View style={[styles.radiusCircle, { width: radius / 2, height: radius / 2, borderRadius: radius / 4 }]} />
              <Ionicons name="location" size={40} color={accent.a500} style={{ position: 'absolute' }} />
            </View>
            <Text style={styles.mapLabel}>{address}</Text>
          </>
        )}
      </View>

      <View style={styles.controls}>
        <Text style={styles.radiusLabel}>Check-in Radius</Text>
        <Text style={styles.radiusValue}>{radius} meters</Text>
        
        <View style={styles.sliderMock}>
          <View style={styles.sliderTrack} />
          <View style={[styles.sliderFill, { width: `${(radius/1000)*100}%` }]} />
          <Pressable 
            style={[styles.sliderThumb, { left: `${(radius/1000)*100}%` }]} 
            onPress={() => {
              Haptics.selectionAsync();
              setRadius(r => r === 1000 ? 100 : r + 100);
            }} 
          />
        </View>
        
        <Button
          variant="primary"
          title={loading ? "Locating..." : "Confirm Location"}
          fullWidth
          disabled={loading || !coords}
          onPress={handleConfirm}
          style={{ marginTop: spacing['2xl'] }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.xl, paddingBottom: spacing.md },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  
  mapMock: { flex: 1, backgroundColor: '#F8F8F8', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F0F0F0' },
  pin: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  radiusCircle: { backgroundColor: 'rgba(255, 90, 31, 0.2)', borderWidth: 1, borderColor: accent.a500, borderStyle: 'dashed' },
  mapLabel: { position: 'absolute', bottom: spacing.xl, backgroundColor: '#FFFFFF', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radii.pill, ...shadows.s, fontWeight: '600' },
  
  controls: { padding: spacing.xl, paddingBottom: 40 },
  radiusLabel: { fontSize: 14, color: '#666666' },
  radiusValue: { fontSize: 28, fontWeight: '800', color: '#1A1A1A', marginTop: 4, marginBottom: spacing.xl },
  
  sliderMock: { height: 40, justifyContent: 'center', position: 'relative' },
  sliderTrack: { height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, width: '100%' },
  sliderFill: { position: 'absolute', left: 0, height: 6, backgroundColor: accent.a500, borderRadius: 3 },
  sliderThumb: { position: 'absolute', width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: accent.a500, marginLeft: -12, ...shadows.xs },
});
