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
 * Ensure required Supabase credentials are present.
 *
 * @throws {Error} If one or both credentials are missing; the error message lists the missing environment variables (EXPO_PUBLIC_SUPABASE_URL and/or EXPO_PUBLIC_SUPABASE_ANON_KEY or their expo config equivalents).
 */
function validateSupabaseCredentials() {
  const missingVars = [];
  
  if (!supabaseUrl) {
    missingVars.push('EXPO_PUBLIC_SUPABASE_URL (or extra.supabaseUrl in app.json)');
  }
  
  if (!supabaseAnonKey) {
    missingVars.push('EXPO_PUBLIC_SUPABASE_ANON_KEY (or extra.supabaseAnonKey in app.json)');
  }
  
  if (missingVars.length > 0) {
    const errorMessage = `Missing required Supabase credentials: ${missingVars.join(', ')}. Please check your environment configuration.`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

// Validate credentials before creating client
validateSupabaseCredentials();

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