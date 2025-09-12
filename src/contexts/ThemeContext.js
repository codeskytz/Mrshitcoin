import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [systemPreference, setSystemPreference] = useState('light');

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPreference(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
      // Auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme || savedTheme === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedThemePreference = localStorage.getItem('themePreference');
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (savedThemePreference === 'system') {
      setTheme(systemPreference);
    } else {
      setTheme(systemPreference);
    }
  }, [systemPreference]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS custom properties for theme colors
    const isDark = theme === 'dark';
    root.style.setProperty('--color-background', isDark ? '#111827' : '#ffffff');
    root.style.setProperty('--color-foreground', isDark ? '#f9fafb' : '#111827');
    root.style.setProperty('--color-card', isDark ? '#1f2937' : '#ffffff');
    root.style.setProperty('--color-card-foreground', isDark ? '#f9fafb' : '#111827');
    root.style.setProperty('--color-popover', isDark ? '#1f2937' : '#ffffff');
    root.style.setProperty('--color-popover-foreground', isDark ? '#f9fafb' : '#111827');
    root.style.setProperty('--color-primary', '#ff6600');
    root.style.setProperty('--color-primary-foreground', '#ffffff');
    root.style.setProperty('--color-secondary', isDark ? '#374151' : '#f3f4f6');
    root.style.setProperty('--color-secondary-foreground', isDark ? '#f9fafb' : '#111827');
    root.style.setProperty('--color-muted', isDark ? '#374151' : '#f3f4f6');
    root.style.setProperty('--color-muted-foreground', isDark ? '#9ca3af' : '#6b7280');
    root.style.setProperty('--color-accent', isDark ? '#374151' : '#f3f4f6');
    root.style.setProperty('--color-accent-foreground', isDark ? '#f9fafb' : '#111827');
    root.style.setProperty('--color-destructive', '#ef4444');
    root.style.setProperty('--color-destructive-foreground', '#ffffff');
    root.style.setProperty('--color-border', isDark ? '#374151' : '#e5e7eb');
    root.style.setProperty('--color-input', isDark ? '#374151' : '#ffffff');
    root.style.setProperty('--color-ring', '#ff6600');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('themePreference', 'manual');
  };

  const setThemePreference = (preference) => {
    if (preference === 'system') {
      setTheme(systemPreference);
      localStorage.removeItem('theme');
      localStorage.setItem('themePreference', 'system');
    } else {
      setTheme(preference);
      localStorage.setItem('theme', preference);
      localStorage.setItem('themePreference', 'manual');
    }
  };

  const getThemePreference = () => {
    const savedThemePreference = localStorage.getItem('themePreference');
    return savedThemePreference || 'system';
  };

  const value = {
    theme,
    systemPreference,
    toggleTheme,
    setThemePreference,
    getThemePreference,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;