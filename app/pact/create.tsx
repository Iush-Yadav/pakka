/**
 * PAKKA — Create Pact Screen
 * Matches screenshot 2: form fields with labels and values
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, backgrounds, spacing, radii, shadows, neutral } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function CreatePactScreen() {
  const [pactTitle, setPactTitle] = useState('Cricket at Barabati Ground 🏏');
  const [location, setLocation] = useState('Barabati Stadium, Cuttack');
  const [dateTime, setDateTime] = useState('Tomorrow, 7:00 AM');
  const [checkinWindow, setCheckinWindow] = useState('15 minutes');
  const [stakes, setStakes] = useState('₹200');
  const [consequence, setConsequence] = useState('Loser buys dinner at local dhaba 🍽️');

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" onPress={() => router.back()} />
          <Text style={styles.headerTitle}>Create a Pact</Text>
          <Text style={styles.mascot}>🐰</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Form Fields */}
          <View style={styles.card}>
            <FormField label="Pact Title" value={pactTitle} onChangeText={setPactTitle} />
            <Divider />
            <FormField label="Location" value={location} onChangeText={setLocation} icon="location-outline" />
            <Divider />
            <FormField label="Date & Time" value={dateTime} onChangeText={setDateTime} icon="calendar-outline" />
            <Divider />
            <FormField label="Check-in Window" value={checkinWindow} onChangeText={setCheckinWindow} icon="time-outline" />
            <Divider />
            <FormField label="Stakes (per person)" value={stakes} onChangeText={setStakes} icon="cash-outline" />
            <Divider />
            <FormField label="Consequence" value={consequence} onChangeText={setConsequence} icon="restaurant-outline" />
          </View>

          {/* CTA */}
          <Button
            variant="primary"
            title="Create Pact +"
            fullWidth
            onPress={() => router.push('/pact/invite' as any)}
            style={{ marginTop: spacing['2xl'] }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function FormField({ label, value, onChangeText, icon }: { label: string; value: string; onChangeText: (t: string) => void; icon?: string }) {
  return (
    <View style={styles.field}>
      <View style={styles.fieldHeader}>
        {icon && <Ionicons name={icon as any} size={16} color="#999999" style={{ marginRight: 6 }} />}
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#BDBDBD"
      />
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  mascot: { fontSize: 28 },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: radii.lg, borderWidth: 1,
    borderColor: '#F0F0F0', ...shadows.card, padding: spacing.lg,
  },
  field: { paddingVertical: spacing.md },
  fieldHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: '#999999', textTransform: 'uppercase', letterSpacing: 0.5 },
  fieldInput: { fontSize: 16, fontWeight: '500', color: '#1A1A1A', paddingVertical: 2 },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
});
