import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import VotePage from "./Pages/VotePage";
import VotePagePdf from "./Pages/VotePagePdf";
import ResetPassword from "./Pages/ResetPassword";
import ElectionsResults from "./Pages/ElectionsResults";
import HashValidation from "./Pages/HashValidation";
import Callback from "./Components/Callback";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { Register } from "./Pages/Register";
import { VoteReport } from "./Pages/VoteReport";
import ApproveRegister from "./Pages/ApproveRegister";
import { ClearCookiesProvider } from "./Components/ClearCookiesProvider";
import Error404 from "./Pages/Error404";

function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <ClearCookiesProvider>
            <Header />
            <Routes>
              <Route
                path="/saturno/vote/"
                element={
                  <ProtectedRoute Component={VotePage} path="/saturno/vote" />
                }
              />
              <Route
                path="/saturno/vote-pdf/"
                element={
                  <ProtectedRoute
                    Component={VotePagePdf}
                    path="/saturno/vote-pdf/"
                  />
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
                    accessRole={["electoral commission", "admin"]}
                  />
                }
              />
              <Route
                path="/saturno/vote-report/"
                element={
                  <ProtectedRoute
                    Component={VoteReport}
                    path="/saturno/vote-report/"
                    accessRole={["electoral commission", "admin"]}
                  />
                }
              />
              <Route
                path="/saturno/approve-register/"
                element={
                  <ProtectedRoute
                    Component={ApproveRegister}
                    path="/saturno/approve-register/"
                    accessRole={["admin"]}
                  />
                }
              />
              <Route
                path="/saturno/callback/:googleToken"
                element={<Callback />}
              />
              <Route path="/saturno/register/" element={<Register />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
          </ClearCookiesProvider>
        </Router>
      </main>
    </div>
  );
}

export default App;
