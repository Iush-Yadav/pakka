/**
 * PAKKA — Wallet Screen
 * Transactions, deposits, refunds, donation history.
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows, text as textColors } from '@/constants/tokens';
import { useUserStore } from '@/stores/userStore';
import { Ionicons } from '@expo/vector-icons';

export default function WalletScreen() {
  const { user, transactions } = useUserStore();

  const getTransactionIcon = (type: string) => {
    switch(type) {
      case 'deposit': return { icon: 'arrow-down', color: '#EAB308', bg: '#FEF9C3' };
      case 'refund': return { icon: 'arrow-up', color: '#22C55E', bg: '#DCFCE7' };
      case 'donation': return { icon: 'heart', color: '#EF4444', bg: '#FEE2E2' };
      case 'dinner_payment': return { icon: 'restaurant', color: accent.a500, bg: '#FFF3EE' };
      default: return { icon: 'card', color: '#666666', bg: '#F0F0F0' };
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Wallet</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceValue}>₹{user.walletBalance}</Text>
            
            <View style={styles.upiRow}>
              <View style={styles.upiBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                <Text style={styles.upiText}>UPI Linked</Text>
              </View>
              <Text style={styles.upiId}>{user.phone.replace(/[^0-9]/g, '')}@ybl</Text>
            </View>
            
            <View style={styles.cardActions}>
              <View style={styles.actionBtn}>
                <Text style={styles.actionText}>Add Money</Text>
              </View>
              <View style={[styles.actionBtn, styles.actionBtnOutline]}>
                <Text style={[styles.actionText, { color: '#1A1A1A' }]}>Withdraw</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {transactions.map(tx => {
            const style = getTransactionIcon(tx.type);
            return (
              <View key={tx.id} style={styles.txRow}>
                <View style={[styles.txIconContainer, { backgroundColor: style.bg }]}>
                  <Ionicons name={style.icon as any} size={20} color={style.color} />
                </View>
                <View style={styles.txDetails}>
                  <Text style={styles.txDesc}>{tx.description}</Text>
                  <Text style={styles.txDate}>{tx.date.toLocaleDateString()} · {tx.status}</Text>
                </View>
                <Text style={[
                  styles.txAmount, 
                  { color: tx.type === 'refund' ? '#22C55E' : '#1A1A1A' }
                ]}>
                  {tx.type === 'refund' ? '+' : '-'}₹{tx.amount}
                </Text>
              </View>
            );
          })}
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
  
  balanceCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: radii.xl,
    padding: spacing['2xl'],
    marginBottom: spacing['2xl'],
    ...shadows.card,
  },
  balanceLabel: { fontSize: 14, color: '#A3A3A3', fontWeight: '500' },
  balanceValue: { fontSize: 48, fontWeight: '800', color: '#FFFFFF', marginVertical: spacing.sm },
  upiRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xl },
  upiBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(34,197,94,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: radii.xs, gap: 4 },
  upiText: { fontSize: 11, fontWeight: '600', color: '#4ADE80' },
  upiId: { fontSize: 13, color: '#A3A3A3' },
  
  cardActions: { flexDirection: 'row', gap: spacing.md },
  actionBtn: { flex: 1, backgroundColor: accent.a500, paddingVertical: 12, borderRadius: radii.md, alignItems: 'center' },
  actionBtnOutline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#333333' },
  actionText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: spacing.lg },
  
  txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  txIconContainer: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  txDetails: { flex: 1 },
  txDesc: { fontSize: 15, fontWeight: '600', color: '#1A1A1A', marginBottom: 2 },
  txDate: { fontSize: 12, color: '#999999' },
  txAmount: { fontSize: 16, fontWeight: '700' },
});
