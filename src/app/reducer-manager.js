import { combineReducers } from 'redux';

function createReducerManager(initialReducers) {
  // Start with the initial set of reducers
  const reducers = { ...initialReducers };

  // Generate the combined reducer initially
  let combinedReducer = combineReducers(reducers);

  // Function to add a new reducer
  function add(key, reducer) {
    if (!key || reducers[key]) {
      return; // Exit if reducer with this key already exists
    }

    // Add the new reducer and update the combined reducer
    reducers[key] = reducer;
    combinedReducer = combineReducers(reducers);
  }

  // Function to remove a reducer
  function remove(key) {
    if (!key || !reducers[key]) {
      return; // Exit if there's no reducer with this key
    }

    // Delete the reducer and recreate the combined reducer
    delete reducers[key];
    combinedReducer = combineReducers(reducers);
  }

  // The main reducer function that Redux will use
  function reduce(state, action) {
    return combinedReducer(state, action);
  }

  // Expose utility functions
  return {
    getReducerMap: () => reducers,
    reduce,
    add,
    remove,
  };
}

export default createReducerManager;
