import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Alert from "./components/Alert";
import Preview from "./components/Preview";
import { NoteProvider } from "./context/noteContext";
import { AuthProvider } from "./context/authContext";
import { AlertType } from "./types/types";
import "./index.css";
import Login from "./components/login";
import Signup from "./components/signup";

export const App = () => {
  const [alert, setAlert] = useState<AlertType>({
    msg: "",
    type: "",
  });
  const showAlert = (message: string, type: string) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <div>
      <AuthProvider>
        <NoteProvider>
          <Router>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </Router>
        </NoteProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
