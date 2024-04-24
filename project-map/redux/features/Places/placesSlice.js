'use client';

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   allPlaces: [],
   visited: [],
   toBeVisited: []
};

const placesSlice = createSlice({
   name: 'places',
   initialState,
   reducers: {
      updateAllPlaces: (state, action) => {
         state.allPlaces = action.payload;
      },
      updateVisited: (state, action) => {
         state.visited = action.payload;
      },
      updateToBeVisited: (state, action) => {
         state.toBeVisited = action.payload;
      },
   },
   extraReducers: (builder) => {
   },
});

export const { updateAllPlaces, updateToBeVisited, updateVisited } = placesSlice.actions;
export default placesSlice.reducer;