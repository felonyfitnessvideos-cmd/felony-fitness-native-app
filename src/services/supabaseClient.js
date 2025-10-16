/**
 * Supabase Client Configuration
 * 
 * This module initializes and exports the Supabase client for use throughout
 * the React Native application. It configures authentication with AsyncStorage
 * for persistent sessions across app restarts.
 * 
 * @module supabaseClient
 */

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Retrieve Supabase credentials from environment variables
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Supabase client instance configured for React Native
 * 
 * Features:
 * - AsyncStorage for session persistence
 * - Auto-refresh tokens
 * - Persistent sessions across app restarts
 * 
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});