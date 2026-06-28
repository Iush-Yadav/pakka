/**
 * PAKKA — Payment Sheet Modal
 * Transparent modal simulating a bottom sheet for UPI payment.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/stores/userStore';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function PaymentSheetScreen() {
  const { amount = '200', pactId, pactName } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const { addTransaction } = useUserStore();

  const handlePay = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      addTransaction({
        id: Math.random().toString(),
        type: 'deposit',
        amount: Number(amount),
        description: 'Deposit for Pact',
        pactId: pactId as string,
        pactName: pactName as string,
        status: 'completed',
        date: new Date()
      });
      router.replace('/pact/payment-success');
    }, 1500);
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => router.back()} />
      
      <View style={styles.sheet}>
        <View style={styles.handle} />
        
        <View style={styles.header}>
          <Text style={styles.title}>Secure Deposit</Text>
          <Pressable onPress={() => router.back()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#1A1A1A" />
          </Pressable>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total to Pay</Text>
          <Text style={styles.amountValue}>₹{amount}</Text>
          <Text style={styles.pactName}>For: {pactName || 'Pact Commitment'}</Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark" size={20} color="#22C55E" />
          <Text style={styles.infoText}>This amount is held securely in escrow. Show up to get 100% refunded instantly.</Text>
        </View>

        <Button
          variant="primary"
          title={loading ? "Processing..." : `Pay ₹${amount} with UPI`}
          fullWidth
          disabled={loading}
          onPress={handlePay}
          style={styles.payBtn}
        />
        
        <View style={styles.footer}>
          <Ionicons name="lock-closed" size={12} color="#999999" />
          <Text style={styles.footerText}>Secured by Razorpay</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.xl, paddingBottom: 40, ...shadows.l },
  handle: { width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginBottom: spacing.lg },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  title: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' },
  
  amountContainer: { alignItems: 'center', marginBottom: spacing.xl },
  amountLabel: { fontSize: 14, color: '#666666' },
  amountValue: { fontSize: 48, fontWeight: '800', color: '#1A1A1A', marginVertical: spacing.xs },
  pactName: { fontSize: 14, fontWeight: '600', color: accent.a500 },
  
  infoBox: { flexDirection: 'row', backgroundColor: '#DCFCE7', padding: spacing.md, borderRadius: radii.md, alignItems: 'center', gap: spacing.sm, marginBottom: spacing['2xl'] },
  infoText: { flex: 1, fontSize: 13, color: '#166534', fontWeight: '500' },
  
  payBtn: { height: 56 },
  
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: spacing.lg },
  footerText: { fontSize: 12, color: '#999999' }
});
