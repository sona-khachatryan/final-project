'use client';

import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger/src';
import places from './features/Places/placesSlice';
import singlePlace from './features/SinglePlace/singlePlaceSlice';
import useReducer from './features/user/userSlice.js';

export default configureStore({
   reducer: {
      places,
      singlePlace,
      useReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});