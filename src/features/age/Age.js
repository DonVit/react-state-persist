import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAge, updateAge } from "./ageSlice";
import styles from "./Age.module.css";

export function Age() {
  const age = useSelector(selectAge);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        <label htmlFor="age">Age: </label>
        <input
          className={styles.textbox}
          aria-label="Set age"
          name="age"
          value={age}
          onChange={(e) => dispatch(updateAge(e.target.value))}
        />
      </div>
    </div>
  );
}
