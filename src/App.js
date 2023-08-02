import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteStates";
import Navbar from "./components/Navbar";

import About from "./components/About";

function App() {
  return (
    <div classNameName="App">
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
