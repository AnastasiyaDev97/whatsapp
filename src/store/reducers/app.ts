import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { AppStatusType, Nullable } from 'types';

const initialState = {
  status: 'idle' as AppStatusType,
  isAuth: true,
  errorText: null as Nullable<string>,
  userToken:
    '586f4c97b4c146ae9e2f21bc3902e30298ea966a5f284bb689' /* null  */ as Nullable<string>,
  userInstanse: '1101824331' /* null */ as Nullable<string>,
};

type InitialStateType = typeof initialState;

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus: (
      state: InitialStateType,
      action: PayloadAction<{ status: AppStatusType }>,
    ) => {
      state.status = action.payload.status;
    },
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

export const { setAppStatus, setIsAuth, setErrorText, setUserToken, setUserInstanse } =
  appSlice.actions;
export default appSlice.reducer;
