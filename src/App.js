import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NotesState";
import Login from "./Components/Login-Signup/Login";
import Signup from "./Components/Login-Signup/Signup";

function App() {
  return (
    <NoteState>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
