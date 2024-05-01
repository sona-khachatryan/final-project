'use client';

import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger/src';
import places from './features/Places/placesSlice';
import singlePlace from './features/SinglePlace/singlePlaceSlice';
import theme from '@/styles/themeSlice';
export default configureStore({
   reducer: {
      places,
      singlePlace,
      theme
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});