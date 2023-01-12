import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectName, updateName } from "./nameSlice";
import styles from "./Name.module.css";

export function Name() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        <label htmlFor="name">Name: </label>
        <input
          className={styles.textbox}
          aria-label="Set name"
          name="name"
          value={name}
          onChange={(e) => dispatch(updateName(e.target.value))}
        />
      </div>
    </div>
  );
}
