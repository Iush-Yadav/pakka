import React from 'react';
import { Stack } from 'expo-router';
import { backgrounds } from '@/constants/tokens';

export default function PactLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: backgrounds.primary } }}>
      <Stack.Screen name="create" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="invite" />
      <Stack.Screen name="join" />
      <Stack.Screen name="checkin" />
      <Stack.Screen name="result" />
      <Stack.Screen name="dinner" />
      <Stack.Screen name="payment-success" />
    </Stack>
  );
}
