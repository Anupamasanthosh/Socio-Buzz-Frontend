import { createSlice } from '@reduxjs/toolkit';

const userCommentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    addComments: (state, action) => {
      state.push (action.payload);
    },
    setComments: (state, action) => {
        return action.payload;
      },
  },
});

export const { addComments,setComments } = userCommentsSlice.actions;

export default userCommentsSlice.reducer;