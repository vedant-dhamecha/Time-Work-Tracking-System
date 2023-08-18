import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';
import context from './Context/context';
import Dashboard from './components/Dashboard';
import Navbar from "./components/Navigationbar";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [nav, setNav] = useState(true);
  const [user, setUser] = useState({ name: null, id: null });
  return (
    <>
      <context.Provider value={{ nav, setNav, user, setUser }}>
        <Router>
          {nav && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login/:person" element={<Login />} />

          </Routes>
        </Router>
      </context.Provider>
    </>
  );
}

export default App;
