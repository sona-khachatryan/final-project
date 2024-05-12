'use client';

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   allPlaces: [],
   visited: [],
   toBeVisited: [],
   myPlaces: [],
   visitStatus: '',
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
      updateMyPlaces: (state, action) => {
         state.myPlaces = action.payload; 
      },
      updateVisitStatus: (state, action) => {
         state.visitStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
   },
});

export const {
   updateAllPlaces,
   updateToBeVisited,
   updateVisited,
   updateMyPlaces,
   updateVisitStatus
} = placesSlice.actions;
export default placesSlice.reducer;