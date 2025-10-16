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
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an initial session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Set up a listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup the subscription on component unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

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
 * 
 * @example
 * const { user, loading } = useAuth();
 */
export function useAuth() {
  return useContext(AuthContext);
}