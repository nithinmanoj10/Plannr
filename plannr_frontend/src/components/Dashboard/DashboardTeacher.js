import * as React from "react";
import plannrLogo from "../../images/plannr_logo.svg";
import { useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Calendar from "./Calendar";
import YourCourses from "./YourCourses";
import UpcomingClasses from "./UpcomingClasses";
import TimeTableTeacher from "./TimeTableTeacher";
import { deepOrange, deepPurple } from "@mui/material/colors";
import TimeTableImage from "../../images/timetable.svg";

function Dashboard() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className="dashboard--container">
      <div className="dashboard__nav-bar">
        <a href="javascript:void(0)" onClick={handleClick}>
          <img
            src={plannrLogo}
            alt="Plannr Logo"
            className="dashboard__nav-bar__logo"
          />
        </a>
        <Button text="Logout" type="button__nav-bar__logout" />
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
        <TimeTableTeacher />
      </div>
    </div>
  );
}

export default Dashboard;
