/**
 * App Index / Initial Route
 * 
 * Handles authentication-based routing. Redirects users to login if not authenticated,
 * or to the main app tabs if logged in. Shows a loading spinner during auth check.
 * 
 * @module Index
 */

import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';

/**
 * Index Component
 * 
 * Root route that determines where to navigate based on authentication state.
 * Shows a loading indicator while checking auth status.
 * 
 * @returns {JSX.Element} Loading screen with auth-based navigation
 */
export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (!user && inAuthGroup) {
      // User is not signed in and trying to access protected route
      router.replace('/login');
    } else if (user && !inAuthGroup) {
      // User is signed in but on auth screen
      router.replace('/(tabs)');
    } else if (!user) {
      // User is not signed in, show login
      router.replace('/login');
    } else {
      // User is signed in, show main app
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  // Show loading indicator while checking auth state
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f97316" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a202c',
  },
});