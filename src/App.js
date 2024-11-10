import React from 'react';
import { Counter } from './features/counter/Counter';
import { Name } from './features/name/Name';
import { Age } from './features/age/Age';
import { Grade } from './features/grade/Grade';
import './App.css';
import { AddReducer } from './features/addReducer/addReducer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Name />
        <Age />
        <Grade />
        <Counter />
        <AddReducer />
      </header>
    </div>
  );
}

export default App;
