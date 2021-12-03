import * as React from "react";
import { useState, useEffect } from "react";
import plannrLogo from "../../images/plannr_logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Buttons/Button";
import Calendar from "./Calendar";
import TimeTableTeacher from "./TimeTableTeacher";
import TimeTableImage from "../../images/timetable.svg";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

function Dashboard() {
  const navigate = useNavigate();

  const EnggBranches = require("./EnggBranches");
  const { regNo, teacherID } = useParams();
  const enggCode = regNo.slice(-2);
  const batch = EnggBranches[enggCode];

  const [classes, setClasses] = useState({});

  // As soon as the dashboard loads
  // get the classes for this teacher
  useEffect(() => {
    console.log("Getting classes");
    fetch(`/getSlots?class="${batch}"`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setClasses(data);
        console.log(classes);
      });
  }, [batch]);

  function handleClick() {
    navigate("/login");
  }

  function handleLogo() {
    navigate("/");
  }
  // when teacher clicks the add slot button
  function handleAddSlot() {
    navigate(`/add-slot/${regNo}/${batch}/${teacherID}`);
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2b0548",
      },
      secondary: {
        main: "#4630ab",
      },
    },
  });

  return (
    <div className="dashboard--container">
      <div className="dashboard__nav-bar">
        <a href="javascript:void(0)" onClick={handleLogo}>
          <img
            src={plannrLogo}
            alt="Plannr Logo"
            className="dashboard__nav-bar__logo"
          />
        </a>
        <Button
          text="Logout"
          type="button__nav-bar__logout"
          onClick={handleClick}
        />
      </div>
      <div className="dashboard__left-info">
        <Calendar />
        <div className="upcoming-classes">
          <img
            src={TimeTableImage}
            className="time-table-image"
            alt="Time Table"
          />
        </div>
      </div>
      <div className="dashboard__middle-info">
        <TimeTableTeacher classes={classes} batch={batch} regNo={regNo} />
      </div>
      <div className="add-slot-icon" onClick={handleAddSlot}>
        <ThemeProvider theme={theme}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Dashboard;
