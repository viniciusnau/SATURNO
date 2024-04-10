import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import VotePage from "./Pages/VotePage";
import VotePagePdf from "./Pages/VotePagePdf";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <Header />
          <Routes>
            <Route path="/saturno/vote/" element={<VotePage />} />
            <Route path="/saturno/vote-pdf/" element={<VotePagePdf />} />
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
