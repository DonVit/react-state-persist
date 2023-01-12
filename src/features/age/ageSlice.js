import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  age: '0'
};

export const ageSlice = createSlice({
  name: 'age',
  initialState,
  reducers: {
    updateAge: (state, action) => {
      state.age = action.payload
    }
  },
});

export const { updateAge } = ageSlice.actions;

export const selectAge = (state) => state.age.age;


export default ageSlice.reducer;
