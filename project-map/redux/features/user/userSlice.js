'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState ={
   email: '',
   token: '',
   id: '',
   isAdmin: false,
   userName: '',
   photoUrl: '',
   error: '',
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
         state.userName = action.payload.userName;
         state.photoUrl = action.payload.photoUrl;
         state.error = '';

      },
      removeUser(state) {
         state.email = '';
         state.token = '';
         state.id = '';
         state.isAdmin = '';
         state.userName = '';
         state.photoUrl = '';
         state.error = '';
      },
      setErrorMessage(state, action) {
         state.error = action.payload;
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

export const {
   setUser,
   updateUsername,
   removeUser,
   setErrorMessage
} = userSlice.actions;

export default userSlice.reducer;
