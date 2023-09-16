import { createSlice } from '@reduxjs/toolkit';

const userNameSlice = createSlice({
  name: 'userName',
  initialState: '',
  reducers: {
    change: (state, action) => {
      return action.payload;
    },
  },
});

export const { change } = userNameSlice.actions;

export default userNameSlice.reducer;