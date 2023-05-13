import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import Signup from "./components/signup";
import NoteState from "./context/noteState";
import { useState } from "react";
import Alert from "./components/Alert";
import Preview from "./components/Preview";

export const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/preview" element={<Preview />} />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          />
        </Routes>
      </Router>
    </NoteState>
  );
};

export default App;
