import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: false,
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark;
    }
  },
});

export const { toggle } = ThemeSlice.actions;
export default ThemeSlice.reducer;