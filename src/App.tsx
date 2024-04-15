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
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import Callback from "./Components/Callback";

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
                <ProtectedRoute
                  Component={VotePage}
                  path="/saturno/vote"
                />
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
                />
              }
            />
            <Route
              path="/saturno/callback/:googleToken"
              element={<Callback />}
            />
          </Routes>
          <Footer />
        </Router>
      </main>
    </div>
  );
}

export default App;
