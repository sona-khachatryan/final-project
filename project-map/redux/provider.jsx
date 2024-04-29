'use client';

import {Provider} from 'react-redux';
import store from './store';
import theme from '../styles/theme';
import {ThemeProvider} from '@mui/material';


export function Providers({children}) {
   return (
      <ThemeProvider theme={theme}>
         <Provider store={store}>
            {children}
         </Provider>
      </ThemeProvider>
   );
}
