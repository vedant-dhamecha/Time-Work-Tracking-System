import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';
import context from './Context/context';
import Dashboard from './components/Dashboard';
import Navbar from "./components/Navigationbar";
import Home from "./components/Home";

function App() {
  const [nav, setNav] = useState(true);

  return (
    <>
      <context.Provider value={{ nav, setNav }}>
        <Router>
          {nav && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
            {console.log("vedant change 1")}
=======
            {console.log("vedant")}
            {console.log("kush")}
>>>>>>> a13240c78cf90c17c0c4317e0b13ea0f1296bf3b
          </Routes>
        </Router>
      </context.Provider>
    </>
  );
}

export default App;
