/**
 * PAKKA — Impact Screen
 * Browse verified charities, impact statistics.
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { charities } from '@/lib/mockData';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ImpactScreen() {
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Social Impact ❤️</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>₹133,700</Text>
            <Text style={styles.heroSubtitle}>Total Donated by Pakka Users</Text>
            <View style={styles.heroStats}>
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatValue}>1,240</Text>
                <Text style={styles.heroStatLabel}>Meals Served</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatValue}>45</Text>
                <Text style={styles.heroStatLabel}>Kids Educated</Text>
              </View>
            </View>
          </View>

          <View style={styles.tabs}>
            <View style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>Verified NGOs</Text>
            </View>
            <View style={styles.tab}>
              <Text style={styles.tabText}>My Impact</Text>
            </View>
          </View>

          {charities.map(charity => (
            <View key={charity.id} style={styles.charityCard}>
              <View style={styles.charityHeader}>
                <View style={styles.charityIconWrapper}>
                  <Text style={styles.charityIcon}>{charity.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.charityName}>{charity.name}</Text>
                  <Text style={styles.charityCause}>{charity.cause}</Text>
                </View>
                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
              </View>
              
              <Text style={styles.charityDesc}>{charity.description}</Text>
              
              <View style={styles.impactBox}>
                <Ionicons name="flash" size={14} color={accent.a500} />
                <Text style={styles.impactText}>{charity.impactMetric}</Text>
              </View>
              
              <Button
                variant="secondary"
                title="Select as Default"
                fullWidth
                onPress={() => {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }}
              />
            </View>
          ))}
          
          {/* Test Certificate button */}
          <Button
            variant="ghost"
            title="View Sample Certificate"
            onPress={() => router.push('/donation-certificate')}
            style={{ marginTop: spacing.xl }}
          />

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: '#FFFFFF' },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#1A1A1A' },
  scroll: { padding: spacing.xl, paddingBottom: 100 },
  
  heroCard: { backgroundColor: '#1A1A1A', borderRadius: radii.xl, padding: spacing.xl, marginBottom: spacing.xl, ...shadows.card },
  heroTitle: { fontSize: 36, fontWeight: '800', color: '#FFFFFF', textAlign: 'center' },
  heroSubtitle: { fontSize: 14, color: '#A3A3A3', textAlign: 'center', marginTop: 4 },
  heroStats: { flexDirection: 'row', marginTop: spacing.xl, backgroundColor: '#333333', borderRadius: radii.lg, padding: spacing.md },
  heroStatItem: { flex: 1, alignItems: 'center' },
  heroStatValue: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  heroStatLabel: { fontSize: 11, color: '#A3A3A3', marginTop: 2, textTransform: 'uppercase' },
  heroStatDivider: { width: 1, backgroundColor: '#4D4D4D' },
  
  tabs: { flexDirection: 'row', marginBottom: spacing.xl, backgroundColor: '#E0E0E0', borderRadius: radii.pill, padding: 4 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: radii.pill },
  activeTab: { backgroundColor: '#FFFFFF', ...shadows.s },
  tabText: { fontSize: 14, fontWeight: '600', color: '#666666' },
  activeTabText: { color: '#1A1A1A' },
  
  charityCard: { backgroundColor: '#FFFFFF', borderRadius: radii.xl, padding: spacing.xl, marginBottom: spacing.lg, ...shadows.s, borderWidth: 1, borderColor: '#F0F0F0' },
  charityHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  charityIconWrapper: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF3EE', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  charityIcon: { fontSize: 24 },
  charityName: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  charityCause: { fontSize: 13, color: '#666666', marginTop: 2 },
  
  charityDesc: { fontSize: 14, color: '#424242', lineHeight: 20, marginBottom: spacing.lg },
  
  impactBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3EE', padding: spacing.sm, borderRadius: radii.md, marginBottom: spacing.lg, gap: 6 },
  impactText: { fontSize: 12, fontWeight: '600', color: accent.a500, flex: 1 },
});
