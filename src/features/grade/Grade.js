import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGrade, updateGrade } from "./gradeSlice";
import styles from "./Grade.module.css";

export function Grade() {
  const grade = useSelector(selectGrade);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        <label htmlFor="name">Grade: </label>
        <input
          className={styles.textbox}
          aria-label="Set grade"
          name="grade"
          value={grade}
          onChange={(e) => dispatch(updateGrade(e.target.value))}
        />
      </div>
    </div>
  );
}
