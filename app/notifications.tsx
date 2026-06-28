/**
 * PAKKA — Notifications Screen
 * Activity feed for invites, reminders, and settlements.
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { useUserStore } from '@/stores/userStore';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function NotificationsScreen() {
  const { notifications, markNotificationRead } = useUserStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'invite': return { name: 'mail', color: '#3B82F6', bg: '#DBEAFE' };
      case 'reminder': return { name: 'time', color: '#F59E0B', bg: '#FEF3C7' };
      case 'donation': return { name: 'heart', color: '#EF4444', bg: '#FEE2E2' };
      case 'settlement': return { name: 'checkmark-circle', color: '#22C55E', bg: '#DCFCE7' };
      default: return { name: 'notifications', color: '#666666', bg: '#F0F0F0' };
    }
  };

  const handlePress = (id: string) => {
    Haptics.selectionAsync();
    markNotificationRead(id);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyMascot}>😴</Text>
              <Text style={styles.emptyText}>All caught up!</Text>
            </View>
          ) : (
            notifications.map(n => {
              const icon = getIcon(n.type);
              return (
                <Pressable 
                  key={n.id} 
                  style={[styles.notificationCard, !n.read && styles.unreadCard]}
                  onPress={() => handlePress(n.id)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: icon.bg }]}>
                    <Ionicons name={icon.name as any} size={20} color={icon.color} />
                  </View>
                  <View style={styles.content}>
                    <Text style={[styles.title, !n.read && styles.unreadText]}>{n.title}</Text>
                    <Text style={styles.body}>{n.body}</Text>
                    <Text style={styles.time}>
                      {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Text>
                  </View>
                  {!n.read && <View style={styles.unreadDot} />}
                </Pressable>
              );
            })
          )}
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
  
  notificationCard: {
    flexDirection: 'row', padding: spacing.lg, borderRadius: radii.lg,
    backgroundColor: '#FFFFFF', marginBottom: spacing.md, borderWidth: 1, borderColor: '#F0F0F0',
    alignItems: 'flex-start'
  },
  unreadCard: { backgroundColor: '#FFF8F5', borderColor: '#FFE0D0' },
  
  iconContainer: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  content: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: '#424242', marginBottom: 2 },
  unreadText: { color: '#1A1A1A', fontWeight: '800' },
  body: { fontSize: 13, color: '#666666', lineHeight: 18 },
  time: { fontSize: 11, color: '#999999', marginTop: spacing.sm },
  
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: accent.a500, marginTop: 6 },
  
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyMascot: { fontSize: 64, marginBottom: spacing.md },
  emptyText: { fontSize: 16, color: '#999999', fontWeight: '500' }
});
