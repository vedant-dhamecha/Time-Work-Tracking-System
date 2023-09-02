import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import './App.css';
import context from './Context/context';
import Dashboard from './components/Dashboard';
import Navbar from "./components/Navigationbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [nav, setNav] = useState(true);
  const [user, setUser] = useState({ name: null, id: null });
  const [logged, setLogged] = useState(false);
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (Cookies.get('person')) { setLogged(true) } else { setLogged(false) }
  }, [])

  return (
    <>
      <context.Provider value={{ nav, setNav, user, setUser, logged, setLogged, load, setLoad }}>
        <Router>
          {nav && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login/:person" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetPassword/:person/:idd" element={<ResetPassword />} />
          </Routes>
        </Router>
      </context.Provider>
    </>
  );
}

export default App;
