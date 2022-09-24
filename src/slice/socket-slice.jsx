import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  object: '',
};

export const socketSlice = createSlice({
  name: 'socketoject',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    socketReducer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { socketReducer } = socketSlice.actions;

export default socketSlice.reducer;
