/**
 * PAKKA — Dinner Collection Screen
 * Matches screenshot 8
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows, semantic } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function DinnerScreen() {
  const [upiId, setUpiId] = useState('xyzdhaba@upi');
  const [billAmount, setBillAmount] = useState('₹800');

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" onPress={() => router.back()} />
          <Text style={styles.headerTitle}>Collect Dinner</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Restaurant Info */}
          <View style={styles.card}>
            <Text style={styles.label}>Restaurant UPI ID:</Text>
            <TextInput style={styles.input} value={upiId} onChangeText={setUpiId} placeholderTextColor="#BDBDBD" />

            <View style={styles.divider} />

            <Text style={styles.label}>Total Bill Amount:</Text>
            <TextInput style={styles.input} value={billAmount} onChangeText={setBillAmount} placeholderTextColor="#BDBDBD" />
          </View>

          {/* Bill Split */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Bill Split</Text>

            <View style={styles.splitRow}>
              <View style={styles.splitLeft}>
                <Text style={styles.splitPlus}>+</Text>
                <Text style={styles.splitLabel}>From Vikas (Held)</Text>
              </View>
              <Text style={[styles.splitAmount, { color: semantic.success }]}>₹200</Text>
            </View>

            <View style={styles.splitRow}>
              <View style={styles.splitLeft}>
                <Text style={styles.splitPlus}>+</Text>
                <Text style={styles.splitLabel}>From Winners (3 people)</Text>
              </View>
              <Text style={styles.splitAmount}>₹600</Text>
            </View>

            <Text style={styles.eachPays}>Each pays ₹200</Text>
          </View>

          {/* Pay Button */}
          <Button
            variant="primary"
            title="Pay Restaurant ₹600"
            fullWidth
            onPress={() => router.back()}
            style={{ marginTop: spacing.xl }}
          />

          <Text style={styles.note}>₹200 already held will be added</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: radii.lg, borderWidth: 1,
    borderColor: '#F0F0F0', ...shadows.card, padding: spacing.lg, marginBottom: spacing.lg,
  },
  label: { fontSize: 12, fontWeight: '600', color: '#999999', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  input: { fontSize: 16, fontWeight: '500', color: '#1A1A1A', paddingVertical: 6 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginBottom: spacing.md },
  splitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm },
  splitLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  splitPlus: { fontSize: 16, fontWeight: '700', color: accent.a500 },
  splitLabel: { fontSize: 14, color: '#424242' },
  splitAmount: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  eachPays: { fontSize: 13, color: '#999999', marginTop: spacing.sm },
  note: { textAlign: 'center', fontSize: 12, color: '#999999', marginTop: spacing.md },
});
