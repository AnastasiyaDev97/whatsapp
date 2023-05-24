import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Nullable } from 'types';

const initialState = {
  activeChat: null as Nullable<string>,
};

type InitialStateType = typeof initialState;

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (
      state: InitialStateType,
      action: PayloadAction<{ activeChat: Nullable<string> }>,
    ) => {
      state.activeChat = action.payload.activeChat;
    },
  },
});

export const { setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
