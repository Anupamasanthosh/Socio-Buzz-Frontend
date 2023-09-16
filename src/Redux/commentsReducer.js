import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
      addComments: (state, action) => {
        const { postId, comment } = action.payload;
        if (!state[postId]) {
          state[postId] = [];         }
        state[postId].push(comment);
      },
    setComments: (state, action) => {
      const { postId, comments } = action.payload;
      state[postId] = comments;
    },
  },
});

export const { setComments, addComments } = commentsSlice.actions;

export default commentsSlice.reducer;
