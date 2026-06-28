/**
 * PAKKA — Share Invite Modal
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { accent, spacing, radii, shadows } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ShareInviteScreen() {
  const { pactName = 'Morning Run' } = useLocalSearchParams();

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const message = `Hey! I'm holding you accountable for "${pactName}". Join my pact on Pakka: https://pakka.app/join/abc123xyz`;
    try {
      await Linking.openURL(`whatsapp://send?text=${encodeURIComponent(message)}`);
      router.back();
    } catch (error) {
      Alert.alert('WhatsApp not installed', 'Please install WhatsApp to share this link.');
    }
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => router.back()} />
      
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Invite Friends 🐺</Text>
        <Text style={styles.subtitle}>Hold your squad accountable to "{pactName}"</Text>
        
        <View style={styles.qrPlaceholder}>
          <Ionicons name="qr-code" size={100} color="#1A1A1A" />
        </View>

        <View style={styles.linkBox}>
          <Text style={styles.linkText} numberOfLines={1}>pakka.app/join/abc123xyz</Text>
          <Pressable onPress={() => Haptics.selectionAsync()} style={styles.copyBtn}>
            <Ionicons name="copy-outline" size={20} color={accent.a500} />
          </Pressable>
        </View>

        <Button
          variant="primary"
          title="Share on WhatsApp"
          icon={<Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />}
          fullWidth
          onPress={handleShare}
          style={{ backgroundColor: '#25D366', marginTop: spacing.xl }}
        />
        <Button
          variant="secondary"
          title="More Options"
          fullWidth
          onPress={() => router.back()}
          style={{ marginTop: spacing.md }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.xl, paddingBottom: 40, ...shadows.l, alignItems: 'center' },
  handle: { width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginBottom: spacing.lg },
  
  title: { fontSize: 24, fontWeight: '800', color: '#1A1A1A', marginBottom: spacing.xs },
  subtitle: { fontSize: 14, color: '#666666', marginBottom: spacing['2xl'], textAlign: 'center' },
  
  qrPlaceholder: { width: 200, height: 200, backgroundColor: '#F8F8F8', borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F0F0F0', marginBottom: spacing.xl },
  
  linkBox: { width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', padding: spacing.md, borderRadius: radii.md, borderWidth: 1, borderColor: '#F0F0F0' },
  linkText: { flex: 1, fontSize: 15, color: '#1A1A1A', fontWeight: '500' },
  copyBtn: { padding: spacing.xs },
});
