import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
   name: 'theme',
   initialState: {
      mode: 'light', // Initial theme mode
   },
   reducers: {
      toggleThemeMode: (state) => {
         state.mode = state.mode === 'light' ? 'dark' : 'light';
      },
      setMode: (state, action) => {
         state.mode = action.payload;
      },
   },
});

export const { toggleThemeMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;