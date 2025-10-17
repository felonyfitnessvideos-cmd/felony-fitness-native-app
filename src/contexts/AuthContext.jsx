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
 * AuthProvider Component
 * 
 * Wraps the application to provide authentication context to all child components.
 * Automatically listens for auth state changes and updates the context accordingly.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component with auth state
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
 * Custom hook to access authentication context
 * 
 * @returns {Object} Authentication context value
 * @returns {Object|null} return.session - Current user session
 * @returns {Object|null} return.user - Current user object
 * @returns {boolean} return.loading - Loading state
 * @throws {Error} If used outside of AuthProvider
 * 
 * @example
 * const { user, loading } = useAuth();
 * if (loading) return <LoadingSpinner />;
 * if (!user) return <LoginScreen />;
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}