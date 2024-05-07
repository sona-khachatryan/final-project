'use client';

import React from 'react';
import { Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleThemeMode} from '@/styles/themeSlice';

function ThemeSwitch(props) {
   const dispatch = useDispatch();
   const mode = useSelector(state => state.theme.mode);
   const handleToggleTheme = () => {
      console.log('switch clicked');
      dispatch(toggleThemeMode());
      console.log(localStorage);
   };

   return (
      <Switch
         checked={mode === 'dark'}
         onChange={handleToggleTheme}
         color="primary"
         sx={{
            '& .MuiSwitch-thumb': {
               backgroundColor: 'header.text',
            },
            '& .Mui-checked .MuiSwitch-thumb': {
               backgroundColor: 'text.dropdown'
            },
            '& .MuiSwitch-track': {
               backgroundColor: 'header.text'
            },
            '& .Mui-checked + .MuiSwitch-track': {
               backgroundColor: 'text.dropdown'
            }
         }}
      />
   );
}

export default ThemeSwitch;