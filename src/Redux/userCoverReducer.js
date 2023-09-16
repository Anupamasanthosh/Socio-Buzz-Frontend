import { createSlice } from '@reduxjs/toolkit';

const userCoverImageSlice = createSlice({
  name: 'coverImage',
  initialState: 'https://www.shutterstock.com/image-photo/colorful-hot-air-balloons-flying-260nw-1033306540.jpg',
  reducers: {
    changeCoverImage: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeCoverImage } = userCoverImageSlice.actions;

export default userCoverImageSlice.reducer;