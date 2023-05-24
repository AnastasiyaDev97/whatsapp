import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import app from './reducers/app';

import { clientAPI } from 'api';

export const store = configureStore({
  reducer: {
    [clientAPI.reducerPath]: clientAPI.reducer,
    app,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([clientAPI.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
