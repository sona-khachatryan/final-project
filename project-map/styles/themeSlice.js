import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
   name: 'theme',
   initialState: {
      mode: 'light',
   },
   reducers: {
      toggleThemeMode: (state) => {
         const newMode = state.mode === 'light' ? 'dark' : 'light';
         localStorage.setItem('themeMode', newMode);
         state.mode = newMode;
      },
      setMode: (state, action) => {
         localStorage.setItem('themeMode', action.payload);
         state.mode = action.payload;
      },
   },
});

export const { toggleThemeMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;