// import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Vote from "./Pages/Vote";
import ElectionsResults from "./Pages/ElectionsResults";
import ResetPassword from "./Pages/ResetPassword";
import HashValidation from "./Pages/HashValidation";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { VoteReport } from "./Pages/VoteReport";

function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/saturno/vote/"
              element={
                <ProtectedRoute Component={Vote} path="/saturno/vote/" />
              }
            />
            <Route path="/saturno/login/" element={<Login />} />
            <Route
              path="/saturno/password-reset/"
              element={<ResetPassword />}
            />
            <Route
              path="/saturno/confirm-hash/"
              element={
                <ProtectedRoute
                  Component={HashValidation}
                  path="/saturno/confirm-hash/"
                />
              }
            />
            <Route
              path="/saturno/elections-results/"
              element={
                <ProtectedRoute
                  Component={ElectionsResults}
                  path="/saturno/elections-results/"
                  // accessRole={["Admin", "Electoral_Commission"]}
                />
              }
            />
            <Route
              path="/saturno/vote-report/"
              element={
                <ProtectedRoute
                  Component={VoteReport}
                  path="/saturno/vote-report/"
                  // accessRole={["Admin", "Electoral_Commission"]}
                />
              }
            />
          </Routes>
          <Footer />
        </Router>
      </main>
    </div>
  );
}

export default App;
