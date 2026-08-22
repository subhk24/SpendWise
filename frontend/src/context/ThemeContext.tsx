// import React, { createContext, useContext, useState, useEffect } from 'react';

// type Theme = 'light' | 'dark' | 'system';

// interface ThemeContextType {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
//   isDark: boolean;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [theme, setThemeState] = useState<Theme>(
//     () => (localStorage.getItem('spendwise_theme') as Theme) || 'system'
//   );
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const root = window.document.documentElement;
//     const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

//     const applyDark = theme === 'dark' || (theme === 'system' && systemDark);
    
//     if (applyDark) {
//       root.classList.add('dark');
//       setIsDark(true);
//     } else {
//       root.classList.remove('dark');
//       setIsDark(false);
//     }

//     localStorage.setItem('spendwise_theme', theme);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme: setThemeState, isDark }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error('useTheme must be used within ThemeProvider');
//   return context;
// };

import React, { createContext, useContext } from 'react';

interface ThemeContextType {
  theme: 'light';
  setTheme: (theme: 'light') => void;
  isDark: false;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  isDark: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  React.useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
    localStorage.setItem('spendwise_theme', 'light');
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: 'light',
        setTheme: () => {},
        isDark: false,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);