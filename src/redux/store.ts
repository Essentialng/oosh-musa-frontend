import { configureStore } from '@reduxjs/toolkit';
import themeToggle from './slice/themeSlice';
import chatView from './slice/chatView'



const store = configureStore({
  reducer: {
    toggleTheme: themeToggle,
    viewChat: chatView,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;