/**
 * PAKKA — Profile Setup Screen
 * Shown after clicking "Let's Get Pakka!" since Login is bypassed.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { spacing, radii, accent, shadows } from '@/constants/tokens';
import { useUserStore } from '@/stores/userStore';
import * as Haptics from 'expo-haptics';

export default function ProfileSetupScreen() {
  const { user, updateUser } = useUserStore();
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  
  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    updateUser({ name, username });
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <Text style={styles.title}>Set up your Profile</Text>
              <Text style={styles.subtitle}>Let friends know it's you</Text>
            </View>
            
            <View style={styles.avatarSection}>
              <View style={[styles.avatarCircle, { backgroundColor: user.avatarColor }]}>
                <Text style={styles.avatarInitial}>{name ? name.charAt(0).toUpperCase() : '?'}</Text>
              </View>
              <Text style={styles.avatarEdit}>Tap to change</Text>
            </View>

            <View style={styles.form}>
              <Input
                label="Full Name"
                placeholder="Rahul Sharma"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: spacing.xl }}
              />
              
              <Input
                label="Username"
                placeholder="rahul.sharma"
                value={username}
                onChangeText={setUsername}
                prefix="@"
              />
            </View>

            <View style={{ flex: 1 }} />
            
            <Button
              title="Save & Continue"
              variant="primary"
              fullWidth
              disabled={!name || !username}
              onPress={handleSave}
              style={styles.button}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flexGrow: 1, padding: spacing.xl, paddingBottom: 40 },
  header: { marginBottom: spacing['2xl'] },
  title: { fontSize: 28, fontWeight: '800', color: '#1A1A1A' },
  subtitle: { fontSize: 16, color: '#666666', marginTop: spacing.sm },
  
  avatarSection: { alignItems: 'center', marginBottom: spacing['2xl'] },
  avatarCircle: {
    width: 100, height: 100, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.m,
  },
  avatarInitial: { fontSize: 40, fontWeight: '800', color: '#FFFFFF' },
  avatarEdit: { fontSize: 14, fontWeight: '600', color: accent.a500, marginTop: spacing.md },
  
  form: { width: '100%' },
  button: { marginTop: spacing['3xl'] },
});
