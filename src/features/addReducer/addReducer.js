import React, { useState } from "react";
import {useDispatch} from 'react-redux'

import styles from "./addReducer.module.css";
import { addReducer, persistorStore } from "../../app/store";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const key1PersistConfig = {
  key: "key3",
  storage,
  debug: true,
};



const key1Reducer = (state={value:''}, action) => {
  switch (action.type) {
    case 'addReducerValue':
      return { value: action.payload }
    default:
      return state
  }
}

// const key1PersistReducer = persistReducer(key1PersistConfig, key1Reducer);
const key1PersistReducer = key1Reducer;

export function AddReducer() {
  const dispatch = useDispatch()
  const [reducerValue, setReducerValue] = useState('test value')
  const dispatchWS = () => dispatch({type: 'WS', key: 'session', payload: {test: {data:'some data'}}})
  const dispatchEmptyPayload = () => dispatch({type: 'WS', key: 'session'})
  return (
    <div>
      <div className={styles.row}>
        <button
          onClick={(e) => addReducer("key3", key1PersistReducer)}
        >Add Reducer</button>
        <input type="input" name="reducerValue" onChange={e=>setReducerValue(e.target.value)} value={reducerValue}/>
        <button
          onClick={(e) => dispatch({type:"addReducerValue", payload: reducerValue})}
        >Add Value To Reducer</button>
      </div>
      <div className={styles.row}>
        <button
          onClick={(e) => persistorStore.pause()}
        >Pause</button>
        <button
          onClick={(e) => persistorStore.persist()}
        >Persist</button>
        <button
          onClick={(e) => persistorStore.purge()}
        >Purge</button>
        <button
          onClick={(e) => persistorStore.flush()}
        >Flush</button>
        <button
          onClick={(e) => dispatchWS()}
        >Dispacth some payload</button>
        <button
          onClick={(e) => dispatchEmptyPayload()}
        >Dispacth empty payload</button>
      </div>
    </div>
  );
}
