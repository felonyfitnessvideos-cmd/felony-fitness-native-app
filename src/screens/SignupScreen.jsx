/**
 * Signup Screen
 * 
 * Handles new user registration with email, password, and profile information.
 * Includes validation for password matching and minimum length requirements.
 * 
 * @module SignupScreen
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';

/**
 * Render the signup screen and handle new user registration.
 * Collects first name, last name, email, and password, performs validation,
 * creates the account via Supabase, and routes the user on success.
 * @returns {JSX.Element} The signup screen component.
 */

/**
 * Validate input and create a new user account.
 *
 * Ensures all fields are provided, passwords match, and password meets length
 * requirements before calling the authentication backend. Presents user-facing
 * alerts for validation failures and signup results.
 */
 
/**
 * Navigate back to the login screen.
 */
export default function SignupScreen() {
  /**
   * User's email address
   * @type {[string, Function]}
   */
  const [email, setEmail] = useState('');
  
  /**
   * User's password
   * @type {[string, Function]}
   */
  const [password, setPassword] = useState('');
  
  /**
   * Password confirmation for validation
   * @type {[string, Function]}
   */
  const [confirmPassword, setConfirmPassword] = useState('');
  
  /**
   * User's first name
   * @type {[string, Function]}
   */
  const [firstName, setFirstName] = useState('');
  
  /**
   * User's last name
   * @type {[string, Function]}
   */
  const [lastName, setLastName] = useState('');
  
  /**
   * Loading state during account creation
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(false);
  
  /**
   * Router instance for navigation
   * @type {Object}
   */
  const router = useRouter();

  /**
   * Handles new user signup with validation
   * 
   * Validates all input fields, checks password requirements,
   * creates user account in Supabase, and handles email confirmation flow.
   * 
   * @async
   * @function handleSignup
   * @returns {Promise<void>}
   */
  const handleSignup = async () => {
    // Validate all required fields are filled
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          },
        },
      });

      if (authError) {
        Alert.alert('Signup Failed', authError.message);
        return;
      }

      // Check if email confirmation is required
      if (authData?.user && !authData.session) {
        Alert.alert(
          'Success',
          'Account created! Please check your email to verify your account.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      } else {
        Alert.alert('Success', 'Account created successfully!');
        // Navigation will be handled automatically by auth state change
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigates back to the login screen
   * 
   * @function navigateToLogin
   * @returns {void}
   */
  const navigateToLogin = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Felony Fitness today</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor={theme.colors.textMuted}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            autoComplete="name-given"
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor={theme.colors.textMuted}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            autoComplete="name-family"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.textMuted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />

          <TextInput
            style={styles.input}
            placeholder="Password (min 6 characters)"
            placeholderTextColor={theme.colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={theme.colors.textMuted}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/**
 * StyleSheet for SignupScreen component
 * @type {Object}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  button: {
    backgroundColor: theme.colors.error,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: theme.colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
});