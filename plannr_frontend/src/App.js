import React, { useState, useEffect } from "react";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import DashBoardTeacher from "./components/Dashboard/DashboardTeacher";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import SignUpFaculty from "./components/SignUp/SignupFaculty";
import Test from "./components/SignUp/Test";
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
          <Route path="/student/:regNo" exact element={<Dashboard />} />
          <Route
            path="/teacher/:regNo/:teacherID"
            element={<DashBoardTeacher />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-student" element={<Signup />} />
          <Route path="/signup-teacher" element={<SignUpFaculty />} />
          <Route path="/signup-test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
