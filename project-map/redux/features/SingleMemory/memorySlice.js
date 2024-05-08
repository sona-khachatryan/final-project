'use client';

import {createSlice} from '@reduxjs/toolkit';

const memorySlice = createSlice({
   name: 'memories',
   initialState: {
      allMemories: [],
      singleMemory: {},
      memoryEditMode: false,
   },
   reducers: {
      updateAllMemories: (state, action) => {
         state.allMemories = action.payload;
      },
      updateSingleMemory: (state, action) => {
         state.singleMemory = action.payload;
      },
      enterMemoryEditMode: (state, action) => {
         state.memoryEditMode = action.payload;
      }
   },
   extraReducers: (builder) => {
      // builder
      //    .addCase(changeStatus.fulfilled, (state, action) => {
      //       console.log('successfully updated');
      //    })
      //    .addCase(deletePlace.fulfilled, (state) => {
      //       console.log('deleted');
      //    });
   },
});

export const {
   updateAllMemories,
   updateSingleMemory,
   enterMemoryEditMode
} = memorySlice.actions;
export default memorySlice.reducer;