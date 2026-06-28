import React, { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { backgrounds } from '@/constants/tokens';

export default function FriendsRedirect() {
  useEffect(() => { router.replace('/(tabs)/impact' as any); }, []);
  return <View style={{ flex: 1, backgroundColor: backgrounds.primary }} />;
}
