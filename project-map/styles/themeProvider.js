'use client';

import {darkTheme, lightTheme} from '@/styles/theme';
import {ThemeProvider} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';

import React, {useEffect, useState} from 'react';
import {setMode, setTheme} from '@/styles/themeSlice';

function MyThemeProvider({children}) {
   const mode = useSelector((state) => state.theme.mode);
   const selectedTheme = mode === 'dark' ? darkTheme : lightTheme;
   return (
      <ThemeProvider theme={selectedTheme}>
         {children}
      </ThemeProvider>
   );
}

export default MyThemeProvider;