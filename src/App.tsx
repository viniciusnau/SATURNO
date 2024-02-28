import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Vote from "./Pages/Vote";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <Header />
          <Routes>
            <Route path="/saturno/vote/" element={<Vote />} />
            <Route path="/saturno/login/" element={<Login />} />
            <Route path="/saturno/alterar-senha" element={<ResetPassword />} />
          </Routes>
          <Footer />
        </Router>
      </main>
    </div>
  );
}

export default App;
