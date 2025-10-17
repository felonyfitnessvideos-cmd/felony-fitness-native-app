/**
 * Login Screen
 * 
 * Provides email/password authentication for existing users.
 * Includes form validation, error handling, and navigation to signup.
 * 
 * @module LoginScreen
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
} from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useRouter } from 'expo-router';

/**
 * LoginScreen Component
 * 
 * Renders the login interface with email and password inputs.
 * Handles user authentication and navigation.
 * 
 * @returns {JSX.Element} The login screen component
 */
export default function LoginScreen() {
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
   * Loading state during authentication
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(false);
  
  /**
   * Router instance for navigation
   * @type {Object}
   */
  const router = useRouter();

  /**
   * Handles user login with email and password
   * 
   * Validates input fields, authenticates with Supabase, and handles errors.
   * Navigation to authenticated screens is handled automatically by auth state change.
   * 
   * @async
   * @function handleLogin
   * @returns {Promise<void>}
   */
  const handleLogin = async () => {
    // Validate required fields
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
      }
      // Navigation will be handled automatically by auth state change in AuthContext
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigates to the signup screen
   * 
   * @function navigateToSignup
   * @returns {void}
   */
  const navigateToSignup = () => {
    router.push('/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Felony Fitness</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

/**
 * StyleSheet for LoginScreen component
 * @type {Object}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: '#999',
    fontSize: 14,
  },
  signupLink: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '600',
  },
});