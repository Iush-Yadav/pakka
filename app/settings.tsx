/**
 * PAKKA — Settings Screen
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';

const sections = [
  {
    title: 'Account',
    items: [
      { id: 'profile', icon: 'person-outline', label: 'Edit Profile' },
      { id: 'payment', icon: 'card-outline', label: 'Payment Methods' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifs', icon: 'notifications-outline', label: 'Notifications' },
      { id: 'loc', icon: 'location-outline', label: 'Location Permissions' },
      { id: 'appearance', icon: 'moon-outline', label: 'Appearance' },
    ]
  },
  {
    title: 'Support & About',
    items: [
      { id: 'help', icon: 'help-circle-outline', label: 'Help & FAQs' },
      { id: 'terms', icon: 'document-text-outline', label: 'Terms & Privacy' },
      { id: 'rate', icon: 'star-outline', label: 'Rate Pakka' },
    ]
  }
];

export default function SettingsScreen() {
  const handleItemPress = (id: string) => {
    if (id === 'help') {
      Linking.openURL('mailto:customercare.pakka@gmail.com?subject=Pakka%20Support');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          {sections.map((section, idx) => (
            <View key={idx} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.card}>
                {section.items.map((item, i) => (
                  <Pressable key={i} style={[styles.row, i < section.items.length - 1 && styles.border]} onPress={() => handleItemPress(item.id)}>
                    <Ionicons name={item.icon as any} size={20} color="#424242" style={styles.icon} />
                    <Text style={styles.label}>{item.label}</Text>
                    <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
          
          <Button
            variant="secondary"
            title="Log Out"
            fullWidth
            onPress={() => router.replace('/landing')}
            style={{ marginTop: spacing['2xl'] }}
          />
          
          <Text style={styles.version}>Pakka v1.0.0 (Production)</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' }, // Slight gray bg for settings
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: '#FFFFFF' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  scroll: { padding: spacing.xl, paddingBottom: 60 },
  
  section: { marginBottom: spacing.xl },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#999999', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.md, paddingHorizontal: spacing.sm },
  card: { backgroundColor: '#FFFFFF', borderRadius: radii.lg, ...shadows.xs, borderWidth: 1, borderColor: '#F0F0F0' },
  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg },
  border: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  icon: { marginRight: spacing.md },
  label: { flex: 1, fontSize: 15, fontWeight: '500', color: '#1A1A1A' },
  
  version: { textAlign: 'center', fontSize: 12, color: '#BDBDBD', marginTop: spacing.xl },
});
