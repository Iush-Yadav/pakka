/**
 * PAKKA — Donation Certificate Modal
 * Celebrates when a forfeited deposit goes to a charity.
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { charities } from '@/lib/mockData';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function DonationCertificateScreen() {
  const { amount = '200', charityId = 'cry1' } = useLocalSearchParams();
  const charity = charities.find(c => c.id === charityId) || charities[0];

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Placeholder for native share
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#1A1A1A" />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Certificate Card */}
          <View style={styles.certificate}>
            <View style={styles.certHeader}>
              <Text style={styles.mascot}>🐼</Text>
              <Text style={styles.certTitle}>Certificate of Impact</Text>
              <Text style={styles.certSubtitle}>Every missed pact creates kindness.</Text>
            </View>

            <View style={styles.certBody}>
              <Text style={styles.certText}>This certifies that</Text>
              <Text style={styles.userName}>Ayush Yadav</Text>
              <Text style={styles.certText}>has donated</Text>
              <Text style={styles.amount}>₹{amount}</Text>
              <Text style={styles.certText}>to</Text>
              <View style={styles.charityRow}>
                <Text style={styles.charityIcon}>{charity.icon}</Text>
                <Text style={styles.charityName}>{charity.name}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <Text style={styles.impactText}>Impact Generated:</Text>
              <Text style={styles.impactMetric}>{charity.impactMetric}</Text>
            </View>
            
            <View style={styles.certFooter}>
              <View style={styles.seal}>
                <Text style={styles.sealText}>PAKKA</Text>
                <Text style={styles.sealTextSmall}>VERIFIED</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.date}>{new Date().toLocaleDateString('en-GB')}</Text>
                <Text style={styles.signature}>Pakka Foundation</Text>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              variant="primary"
              title="Share Certificate"
              icon={<Ionicons name="share-social" size={18} color="#FFFFFF" />}
              fullWidth
              onPress={handleShare}
            />
            <Button
              variant="ghost"
              title="Back to Pacts"
              fullWidth
              onPress={() => {
                Haptics.selectionAsync();
                router.back();
              }}
              style={{ marginTop: spacing.md }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F5' }, // Very subtle warm background
  header: { alignItems: 'flex-end', paddingHorizontal: spacing.xl, paddingTop: spacing.md },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', ...shadows.xs },
  scroll: { padding: spacing.xl, paddingBottom: 60, alignItems: 'center' },
  
  certificate: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: radii.xl,
    padding: spacing['2xl'],
    borderWidth: 8,
    borderColor: '#FFF0E5',
    ...shadows.m,
  },
  certHeader: { alignItems: 'center', marginBottom: spacing.xl },
  mascot: { fontSize: 48, marginBottom: spacing.sm },
  certTitle: { fontSize: 24, fontWeight: '800', color: accent.a500, fontFamily: 'serif', textAlign: 'center' },
  certSubtitle: { fontSize: 13, color: '#999999', marginTop: 4, fontStyle: 'italic' },
  
  certBody: { alignItems: 'center' },
  certText: { fontSize: 14, color: '#666666', marginVertical: spacing.sm },
  userName: { fontSize: 28, fontWeight: '700', color: '#1A1A1A', fontFamily: 'serif' },
  amount: { fontSize: 36, fontWeight: '800', color: '#1A1A1A', marginVertical: spacing.xs },
  
  charityRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginVertical: spacing.sm },
  charityIcon: { fontSize: 24 },
  charityName: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  
  divider: { height: 1, width: '80%', backgroundColor: '#F0F0F0', marginVertical: spacing.xl },
  
  impactText: { fontSize: 12, fontWeight: '600', color: accent.a500, textTransform: 'uppercase', letterSpacing: 1 },
  impactMetric: { fontSize: 15, fontWeight: '500', color: '#424242', textAlign: 'center', marginTop: spacing.sm, paddingHorizontal: spacing.lg },
  
  certFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: spacing['3xl'] },
  seal: { 
    width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: accent.a500, 
    alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' 
  },
  sealText: { fontSize: 10, fontWeight: '800', color: accent.a500 },
  sealTextSmall: { fontSize: 6, fontWeight: '600', color: accent.a500, marginTop: 2 },
  
  date: { fontSize: 14, color: '#1A1A1A', fontWeight: '500', marginBottom: 2 },
  signature: { fontSize: 12, color: '#999999', fontStyle: 'italic' },
  
  actions: { width: '100%', marginTop: spacing['2xl'] },
});
