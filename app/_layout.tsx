import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { backgrounds } from '@/constants/tokens';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Geist-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => { if (error) throw error; }, [error]);
  useEffect(() => { if (loaded) SplashScreen.hideAsync(); }, [loaded]);
  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-expect-error */}
      <StatusBar style="dark" backgroundColor={backgrounds.primary} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: backgrounds.primary },
          animation: 'fade',
        }}
        initialRouteName="welcome"
      >
        <Stack.Screen name="welcome" options={{ animation: 'none' }} />
        <Stack.Screen name="landing" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="pact" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="donation-certificate" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
        <Stack.Screen name="share-invite" options={{ animation: 'slide_from_bottom', presentation: 'transparentModal' }} />
        <Stack.Screen name="payment-sheet" options={{ animation: 'slide_from_bottom', presentation: 'transparentModal' }} />
        <Stack.Screen name="map-picker" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
        <Stack.Screen name="profile-setup" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
