'use client';

import {darkTheme, lightTheme} from '@/styles/theme';
import {ThemeProvider} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';

import React, {useEffect} from 'react';
import {setMode} from '@/styles/themeSlice';


function MyThemeProvider({children}) {
   const dispatch = useDispatch();
   const mode = useSelector(state => state.theme.mode);

   useEffect(() => {
      const themeModeFromLocalStorage = (localStorage.getItem('themeMode'));
      if (themeModeFromLocalStorage) {
         dispatch(setMode(themeModeFromLocalStorage));
      }
   }, [dispatch]);

   return (
      <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
         {children}
      </ThemeProvider>
   );
}
export default MyThemeProvider;