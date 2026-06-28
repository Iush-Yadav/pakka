import React, { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { backgrounds } from '@/constants/tokens';

export default function StatsRedirect() {
  useEffect(() => { router.replace('/(tabs)/mypacts' as any); }, []);
  return <View style={{ flex: 1, backgroundColor: backgrounds.primary }} />;
}
