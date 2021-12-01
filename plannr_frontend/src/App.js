import React, { useState, useEffect } from "react";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import DashBoardTeacher from "./components/Dashboard/DashboardTeacher";
import Login from "./components/Login/Login";
import SignUp from "./components/NewSignUp/SignUp";
import SignUpFaculty from "./components/SignUp/SignupFaculty";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/student/:studentID" exact element={<Dashboard />} />
          <Route path="/teacher" element={<DashBoardTeacher />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-teacher" element={<SignUpFaculty />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
