// Felony Fitness Brand Theme
// Matches the web app's design system

export const theme = {
  colors: {
    // Primary Brand Colors
    primary: '#f97316', // Orange accent (--accent-color)
    primaryHover: '#ea580c', // Darker orange (--accent-color-hover)
    
    // Backgrounds
    background: '#1a202c', // Main background (--background-color)
    card: '#2d3748', // Card/container background (--card-color)
    cardLight: '#374151', // Slightly lighter card variant
    
    // Text
    text: '#f7fafc', // Primary text (--text-primary)
    textSecondary: '#a0aec0', // Secondary/muted text (--text-secondary)
    textMuted: '#718096',
    
    // UI Elements
    border: '#4a5568', // Borders and dividers (--border-color)
    
    // Status Colors
    success: '#10B981',
    warning: '#FFC107',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Chart/Graph Colors
    chartOrange: '#f97316',
    chartGrid: '#4a5568',
    chartYellow: '#FFC107',
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
    navHeight: 60, // Bottom nav height
    headerHeight: 56,
  },
};

// Helper function to create consistent component styles
export const createStyles = (styleObj) => {
  return styleObj;
};