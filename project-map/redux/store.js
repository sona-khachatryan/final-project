'use client';

import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger/src';
import places from './features/Places/placesSlice';
import singlePlace from './features/SinglePlace/singlePlaceSlice';
import theme from '@/styles/themeSlice';
import memories from './features/SingleMemory/memorySlice';
export default configureStore({
   reducer: {
      places,
      singlePlace,
      theme,
      memories
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});