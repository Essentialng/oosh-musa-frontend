// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slice/user.slice';
import themeReducer from './slice/themeSlice';
import isViewReducer from './slice/chatView'
import postReducer from './slice/post.slice'
import authReducer from './slice/auth.slice'

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  viewChat: isViewReducer,
  posts: postReducer,
  auth: authReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
