import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/src/contexts/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * Render the application's root layout, supplying authentication context, theme, navigation, and status bar.
 *
 * @returns The root React element that wraps the app in `AuthProvider`, a `ThemeProvider` (uses `DarkTheme` when the color scheme is `"dark"`, otherwise `DefaultTheme`), a navigation `Stack` with `"login"`, `"signup"`, `"(tabs)"`, and `"modal"` screens (the modal presented with `presentation: 'modal'` and title `"Modal"`), and a `StatusBar`.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}