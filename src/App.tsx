import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Button from './Components/Button'
import Input from './Components/CustomInput'

function App() {
    return (
        <div className="App">
          <main>
            <Router>
              <Button/>
              <Input/>
            </Router>
          </main>
        </div>
    );
}

export default App;
