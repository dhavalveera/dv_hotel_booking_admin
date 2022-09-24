import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

// redux persist
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';

// slices
import socketSlice from '../slice/socket-slice';

// Reducers
const reducers = combineReducers({
  socket: socketSlice,
});

// Persist Config
const persistConfig = {
  key: 'rootRedux',
  storage,
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: [thunk],
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
