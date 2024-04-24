'use client';

import {createSlice} from '@reduxjs/toolkit';

const singlePlaceSlice = createSlice({
   name: 'singlePlace',
   initialState: {
      data: {},
   },
   reducers: {
      updateSinglePlace: (state, action) => {
         state.data = action.payload;
      },
   },
   extraReducers: (builder) => {
   },
});

export const { updateSinglePlace } = singlePlaceSlice.actions;
export default singlePlaceSlice.reducer;