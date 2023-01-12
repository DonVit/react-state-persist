import React from 'react';
import { Counter } from './features/counter/Counter';
import { Name } from './features/name/Name';
import { Age } from './features/age/Age';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Name />
        <Age />
        <Counter />
      </header>
    </div>
  );
}

export default App;
