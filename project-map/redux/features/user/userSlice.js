'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState ={
   email: '',
   token: '',
   id: ''
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser(state, action) {
         state.email = action.payload.email;
         state.token = action.payload.token;
         state.id = action.payload.id;
      },
      removeUser(state) {
         state.email = null;
         state.token = null;
         state.id = null;
      },
      updateUsername: (state, action) => {
         // Ensure that state.user is not undefined before updating username
         if (state.user) {
            state.user.username = action.payload;
         } else {
            console.error('User object is undefined');
         }
      }
   }
});

export const { setUser, updateUsername, removeUser } = userSlice.actions;

export default userSlice.reducer;
