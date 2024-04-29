'use client';

import {createSlice} from '@reduxjs/toolkit';
import {changeStatus, getStatus} from '@/redux/features/SinglePlace/singlePlaceThunks';

const singlePlaceSlice = createSlice({
   name: 'singlePlace',
   initialState: {
      data: {},
      status: 'unvisited',
   },
   reducers: {
      updateSinglePlace: (state, action) => {
         state.data = action.payload;
      },
      updateStatus: (state, action) => {
         state.status = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(changeStatus.fulfilled, (state, action) => {
         console.log('successfully updated');
      });
   },
});

export const { updateSinglePlace, updateStatus } = singlePlaceSlice.actions;
export default singlePlaceSlice.reducer;