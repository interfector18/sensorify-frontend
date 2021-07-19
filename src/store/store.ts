import { configureStore, MiddlewareArray, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import entriesSlice from 'store/reducers/entries';
import devicesSlice from 'store/reducers/devices';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    entries: entriesSlice.reducer,
    devices: devicesSlice.reducer,
  },
  middleware: [thunk]
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store