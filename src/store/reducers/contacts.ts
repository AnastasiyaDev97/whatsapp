import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  contacts: [] as string[],
};

type InitialStateType = typeof initialState;

export const appSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (
      state: InitialStateType,
      action: PayloadAction<{ userPhone: string }>,
    ) => {
      state.contacts.push(action.payload.userPhone);
    },
  },
});

export const { addContact } = appSlice.actions;
export default appSlice.reducer;
