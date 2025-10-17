/**
 * Authentication Context
 * 
 * Provides authentication state and user data to all components in the app.
 * Handles authentication state changes and manages user sessions.
 * 
 * @module AuthContext
 */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabaseClient';

/**
 * Authentication context object
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * Provides authentication state (session, user, loading) to descendant components.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Components to render inside the provider.
 * @returns {JSX.Element} The AuthContext provider that renders children after the initial auth check completes.
 */
export function AuthProvider({ children }) {
  /**
   * Current authentication session
   * @type {[Object|null, Function]}
   */
  const [session, setSession] = useState(null);
  
  /**
   * Current authenticated user
   * @type {[Object|null, Function]}
   */
  const [user, setUser] = useState(null);
  
  /**
   * Loading state for initial authentication check
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches the initial session and handles errors
     * @async
     * @function fetchInitialSession
     */
    const fetchInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Failed to get session:', error);
          setSession(null);
          setUser(null);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Unexpected error fetching session:', error);
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialSession();

    /**
     * Subscription to authentication state changes
     * Automatically updates session and user when auth state changes
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      /**
       * Auth state change callback
       * @param {string} _event - The authentication event type
       * @param {Object|null} session - The new session object
       */
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    /**
     * Cleanup function to unsubscribe from auth changes
     * @function cleanup
     */
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  /**
   * Context value object
   * @type {Object}
   * @property {Object|null} session - Current user session
   * @property {Object|null} user - Current user object
   * @property {boolean} loading - Loading state
   */
  const value = {
    session,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * Access the authentication context provided by AuthProvider.
 *
 * @returns {{session: Object|null, user: Object|null, loading: boolean}} An object with the current `session` (object or `null`), `user` (object or `null`), and `loading` (boolean) state.
 * @throws {Error} If used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}