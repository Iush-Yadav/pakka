/**
 * PAKKA — GooeyNav (Light Theme)
 * Bottom tab bar with white background, orange active accent,
 * and elevated center "Create" button.
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

import { accent, neutral, shadows } from '@/constants/tokens';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  route: string;
  label: string;
  iconFocused: IconName;
  iconDefault: IconName;
}

const TABS: TabConfig[] = [
  { route: 'index', label: 'Home', iconFocused: 'home', iconDefault: 'home-outline' },
  { route: 'mypacts', label: 'My Pacts', iconFocused: 'document-text', iconDefault: 'document-text-outline' },
  { route: 'create', label: 'Create', iconFocused: 'add', iconDefault: 'add' },
  { route: 'impact', label: 'Impact', iconFocused: 'heart', iconDefault: 'heart-outline' },
  { route: 'profile', label: 'Profile', iconFocused: 'person', iconDefault: 'person-outline' },
];

export function GooeyNav({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 4 }]}>
      <View style={styles.content}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const tabConfig = TABS.find(t => t.route === route.name) || TABS[0];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.navigate(route.name);
            }
          };

          // Center create button — special rendering
          if (route.name === 'create') {
            return (
              <Pressable key={route.key} onPress={onPress} style={styles.createButtonWrapper}>
                <BlurView intensity={60} tint="light" style={[styles.createButton, shadows.glow]}>
                  <Ionicons name="add" size={24} color="#1A1A1A" />
                </BlurView>
                <Text style={styles.createLabel}>{tabConfig.label}</Text>
              </Pressable>
            );
          }

          return (
            <TabItem
              key={route.key}
              isFocused={isFocused}
              onPress={onPress}
              iconName={isFocused ? tabConfig.iconFocused : tabConfig.iconDefault}
              label={tabConfig.label}
            />
          );
        })}
      </View>
    </View>
  );
}

function TabItem({
  isFocused,
  onPress,
  iconName,
  label,
}: {
  isFocused: boolean;
  onPress: () => void;
  iconName: IconName;
  label: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isFocused ? 1.05 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  }, [isFocused]);

  return (
    <Pressable onPress={onPress} style={styles.tabItem}>
      <Animated.View style={[styles.tabContent, { transform: [{ scale }] }]}>
        <Ionicons
          name={iconName}
          size={22}
          color={isFocused ? accent.a500 : neutral.n400}
        />
        <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: neutral.n200,
  },
  content: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: neutral.n400,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: accent.a500,
  },
  createButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  createButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 90, 31, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -15,
    overflow: 'hidden',
  },
  createLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: accent.a500,
    marginTop: 2,
  },
});
