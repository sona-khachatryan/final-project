'use client';

import {createSlice} from '@reduxjs/toolkit';
import {changeStatus, deletePlace, getStatus} from '@/redux/features/SinglePlace/singlePlaceThunks';

const singlePlaceSlice = createSlice({
   name: 'singlePlace',
   initialState: {
      data: {},
      status: 'unvisited',
      isInEditMode: false,
   },
   reducers: {
      updateSinglePlace: (state, action) => {
         state.data = action.payload;
      },
      updateStatus: (state, action) => {
         state.status = action.payload;
      },
      setIsInEditMode: (state, action) => {
         state.isInEditMode = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(changeStatus.fulfilled, (state, action) => {
            console.log('successfully updated');
         })
         .addCase(deletePlace.fulfilled, (state) => {
            console.log('deleted');
         });
   },
});

export const {
   updateSinglePlace,
   updateStatus,
   setIsInEditMode,
} = singlePlaceSlice.actions;
export default singlePlaceSlice.reducer;