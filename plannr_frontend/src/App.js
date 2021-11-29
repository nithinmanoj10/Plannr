import React, { useState, useEffect } from "react";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import DashBoardTeacher from "./components/Dashboard/DashboardTeacher";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/members")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((item) => {
        setData(item.members);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/student" element={<Dashboard />} />
          <Route path="/teacher" element={<DashBoardTeacher />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
