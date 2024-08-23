'use client';

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, useTheme as useMuiTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const muiTheme = useMuiTheme();
  const { mode, toggleColorMode } = useThemeContext();
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Product Listing
            </Link>
          </Typography>
          {user && (
            <Button color="inherit" onClick={handleLogout} sx={{ mr: 2 }}>
              Logout
            </Button>
          )}
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', color: 'text.primary' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;