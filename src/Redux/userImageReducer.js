import { createSlice } from '@reduxjs/toolkit';

const userImageSlice = createSlice({
  name: 'image',
  initialState: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  reducers: {
    changeImage: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeImage } = userImageSlice.actions;

export default userImageSlice.reducer;