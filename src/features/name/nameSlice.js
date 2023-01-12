import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: ''
};

export const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload
    }
  },
});

export const { updateName } = nameSlice.actions;

export const selectName = (state) => state.name.name;


export default nameSlice.reducer;
