/**
 * Felony Fitness Brand Theme
 * 
 * Central theme configuration matching the web app's design system.
 * Defines colors, typography, spacing, and other design tokens for
 * consistent styling across the native mobile application.
 * 
 * @module theme
 */

/**
 * Main theme object containing all design tokens
 * 
 * @type {Object}
 * @property {Object} colors - Color palette
 * @property {Object} fonts - Typography settings
 * @property {Object} spacing - Spacing scale
 * @property {Object} borderRadius - Border radius values
 * @property {Object} shadows - Shadow configurations for elevation
 * @property {Object} layout - Layout constants
 */
export const theme = {
  colors: {
    // Primary Brand Colors
    primary: '#f97316', // Orange accent
    primaryHover: '#ea580c', // Darker orange for pressed states
    
    // Backgrounds
    background: '#1a202c', // Main app background
    card: '#2d3748', // Card/container background
    cardLight: '#374151', // Slightly lighter card variant
    
    // Text
    text: '#f7fafc', // Primary text color
    textSecondary: '#a0aec0', // Secondary/muted text
    textMuted: '#718096', // Even more muted text
    
    // UI Elements
    border: '#4a5568', // Borders and dividers
    
    // Status Colors
    success: '#10B981', // Success state
    warning: '#FFC107', // Warning state
    error: '#EF4444', // Error state
    info: '#3B82F6', // Info state
    
    // Chart/Graph Colors
    chartOrange: '#f97316', // Primary chart color
    chartGrid: '#4a5568', // Grid lines
    chartYellow: '#FFC107', // Secondary chart color
  },
  
  fonts: {
    family: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    sizes: {
      xs: 10,
      sm: 12,
      base: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  
  layout: {
    maxWidth: 450, // Phone-like max width from web app
    navHeight: 60, // Bottom navigation bar height
    headerHeight: 56, // Header height
  },
};

/**
 * Helper function to create consistent component styles
 * 
 * @param {Object} styleObj - Style object to process
 * @returns {Object} Processed style object
 */
export const createStyles = (styleObj) => {
  return styleObj;
};