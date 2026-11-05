'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const transitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Check saved theme; default is LIGHT if not set
    const saved = localStorage.getItem('sajdex-theme') as Theme | null;
    if (saved === 'dark') {
      setThemeState('dark');
      document.documentElement.classList.add('dark');
    } else {
      setThemeState('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const applyThemeClasses = (newTheme: Theme) => {
    // Add theme-transition class to animate colors & borders smoothly
    document.documentElement.classList.add('theme-transition');

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }
    // Remove after transition finishes so hover states remain snappy
    transitionTimeoutRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 400);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('sajdex-theme', newTheme);

    // Support View Transitions API if available (Chrome 111+, Edge, Safari 18+)
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        applyThemeClasses(newTheme);
      });
    } else {
      applyThemeClasses(newTheme);
    }
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
