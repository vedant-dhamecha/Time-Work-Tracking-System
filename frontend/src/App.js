import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import "./App.css";
import context from "./Context/context";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navigationbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Dum from "./components/Dummy";

function App() {

  const [user, setUser] = useState({ id: null, profileImg: null });
  //   const initialTime = parseInt(Cookies.get('stopwatchTime')) || 0;
  //   const isTimeRunning = Cookies.get('isTimeRunning') === "true" ? true : false || false;
  //   const [runningTask, setRunningTask] = useState(null);
  //   const [user, setUser] = useState({ 'id': null, 'profileImg': null })
  const [nav, setNav] = useState(true);
  const [logged, setLogged] = useState(false);
  const [load, setLoad] = useState(false);
  const [notiefication, setNotification] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [profileImg, setProfileImg] = useState();
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [managerProjects, setManagerProjects] = useState([]);

  const getInformation = async () => {
    try {
      // setLoad(true)
      const res = await fetch("http://localhost:3218/getData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // setLoad(false)
      // console.log('data in app:>> ', data);
      setUser(data);
      setProfileImg(data.imgValue);
    } catch (err) {
      console.log("err in app :>> ", err);
    }
  };
  const getProjects = async () => {
    try {
      const res = await fetch(`http://localhost:3218/getProject`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data?.length > 0) {
        setProjects(data);
      } else {
        console.log("no project found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getManagerProjects = async () => {
    try {
      const res = await fetch(`http://localhost:3218/getManagerProjects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log('data :>> ', data);
      if (data?.length > 0) {
        setManagerProjects(data);
      } else {
        console.log("no project found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      Cookies.get("person") === "employee" ||
      Cookies.get("person") === "HR" ||
      Cookies.get("person") === "manager"
    ) {
      setLogged(true);
    } else {
      setLogged(false);
    }

    if (logged) {
      getInformation();
      getProjects();
      getManagerProjects();
    }
  }, [logged]);



  return (
    <>
      <context.Provider
        value={{
          nav,
          setNav,
          logged,
          setLogged,
          load,
          setLoad,
          user,
          setUser,
          profileImg,
          setProfileImg,
          projects,
          setProjects,
          projectName,
          setProjectName,
          managerProjects,
          setManagerProjects,
          notiefication,
          setNotification,
          notificationTitle,
          setNotificationTitle,
        }}
      >
        {/* <context.Provider value={{ nav, setNav, logged, setLogged, load, setLoad, user, setUser, profileImg, setProfileImg, projects, setProjects, projectName, setProjectName, time, setTime, isRunning, setIsRunning, notiefication, setNotification, notificationTitle, setNotificationTitle, runningTask, setRunningTask }}> */}
        <Router>
          {nav && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login/:person" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dummy" element={<Dum />} />
            <Route
              path="/resetPassword/:person/:idd"
              element={<ResetPassword />}
            />
          </Routes>
        </Router>

      </context.Provider>
    </>
  );
}

export default App;
