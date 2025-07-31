import { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'underground' | 'futuristic' | 'creepy' | 'neon' | 'matrix';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { id: Theme; name: string; icon: string }[];
}

const themes = [
  { id: 'underground' as Theme, name: 'Underground', icon: '🕊️' },
  { id: 'futuristic' as Theme, name: 'Cyber Future', icon: '🤖' },
  { id: 'creepy' as Theme, name: 'Horror Vault', icon: '👻' },
  { id: 'neon' as Theme, name: 'Neon City', icon: '🌃' },
  { id: 'matrix' as Theme, name: 'Digital Rain', icon: '💊' }
];

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('pigeonflix-theme');
    return (saved as Theme) || 'underground';
  });

  useEffect(() => {
    localStorage.setItem('pigeonflix-theme', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};