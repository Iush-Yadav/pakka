import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { backgrounds, accent } from '@/constants/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: backgrounds.primary },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  link: { marginTop: 15, paddingVertical: 15 },
  linkText: { fontSize: 14, color: accent.a500 },
});
