'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState ={
   email: null,
   token: null,
   id: null,
   isAdmin: false,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser(state, action) {
         state.email = action.payload.email;
         state.token = action.payload.token;
         state.id = action.payload.id;
         state.isAdmin = action.payload.isAdmin;
      },
      removeUser(state) {
         state.email = '';
         state.token = '';
         state.id = '';
      }
   }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
