import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Button from "./Components/Button";
import Input from "./Components/CustomInput";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <main>
        <Router>
          < Header />
          <Button />
          {/* <Input /> */}
          < Footer />
        </Router>
      </main>
    </div>
  );
}

export default App;
