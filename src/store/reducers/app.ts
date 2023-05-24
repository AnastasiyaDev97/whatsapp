import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Nullable } from 'types';

const initialState = {
  isAuth: false,
  errorText: null as Nullable<string>,
  userToken: null as Nullable<string>,
  userInstanse: null as Nullable<string>,
};

type InitialStateType = typeof initialState;

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuth: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setErrorText: (
      state: InitialStateType,
      action: PayloadAction<{ errorText: Nullable<string> }>,
    ) => {
      state.errorText = action.payload.errorText;
    },
    setUserToken: (
      state: InitialStateType,
      action: PayloadAction<{ userToken: Nullable<string> }>,
    ) => {
      state.userToken = action.payload.userToken;
    },
    setUserInstanse: (
      state: InitialStateType,
      action: PayloadAction<{ userInstanse: Nullable<string> }>,
    ) => {
      state.userInstanse = action.payload.userInstanse;
    },
  },
});

export const { setIsAuth, setErrorText, setUserToken, setUserInstanse } =
  appSlice.actions;
export default appSlice.reducer;
