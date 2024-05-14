'use client';

import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
   name: 'pagination',
   initialState: {
      currentPage: 1,
      pageSize: 4,
   },
   reducers: {
      setCurrentPage(state, action) {
         state.currentPage = action.payload;
      },
   },
});

export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;