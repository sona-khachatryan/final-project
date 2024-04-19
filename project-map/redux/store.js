'use client';

import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger/src';

export default configureStore({
   reducer: {

   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});