'use client';

import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { ThemeContextProvider, useThemeContext } from '@/contexts/ThemeContext';

const ThemeProviderInner = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useThemeContext();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContextProvider>
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </ThemeContextProvider>
  );
};