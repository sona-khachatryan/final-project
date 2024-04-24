'use client';

import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger/src';
import places from './features/Places/placesSlice';
import singlePlace from './features/SinglePlace/singlePlaceSlice';

export default configureStore({
   reducer: {
      places,
      singlePlace
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});