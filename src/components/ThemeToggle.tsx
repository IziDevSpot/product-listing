'use client';

import React from 'react';
import { IconButton, useTheme as useMuiTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const muiTheme = useMuiTheme();
  const { toggleColorMode } = useThemeContext();

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {muiTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggle;