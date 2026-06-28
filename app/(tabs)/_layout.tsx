import React from 'react';
import { Tabs } from 'expo-router';
import { GooeyNav } from '@/components/navigation/GooeyNav';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props: any) => <GooeyNav {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="mypacts" options={{ title: 'My Pacts' }} />
      <Tabs.Screen
        name="create"
        options={{ title: 'Add' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('pact', { screen: 'create' });
          },
        })}
      />
      <Tabs.Screen name="impact" options={{ title: 'Impact' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="friends" options={{ href: null }} />
      <Tabs.Screen name="stats" options={{ href: null }} />
    </Tabs>
  );
}
