import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ContactType = { number: string; message: 'string' };

const initialState = {
  contacts: ['905347990557'] as string[],
};

type InitialStateType = typeof initialState;

export const contactsSlice = createSlice({
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

export const { addContact } = contactsSlice.actions;
export default contactsSlice.reducer;
