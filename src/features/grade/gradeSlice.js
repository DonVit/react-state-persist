import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  grade: ''
};

export const gradeSlice = createSlice({
  name: 'grade',
  initialState,
  reducers: {
    updateGrade: (state, action) => {
      state.grade = action.payload
    }
  },
});

export const { updateGrade } = gradeSlice.actions;

export const selectGrade = (state) => state.grade.grade;


export default gradeSlice.reducer;
