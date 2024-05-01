'use client';

import React from 'react';
import { Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleThemeMode} from '@/styles/themeSlice';

function ThemeSwitch(props) {
   const dispatch = useDispatch();
   const mode = useSelector((state) => state.theme.mode);

   const handleToggleTheme = () => {
      dispatch(toggleThemeMode());
   };

   return (
      <Switch
         checked={mode === 'dark'}
         onChange={handleToggleTheme}
         color="primary"
      />
   );
}

export default ThemeSwitch;