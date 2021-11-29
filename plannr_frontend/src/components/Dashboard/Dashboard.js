import * as React from "react";
import plannrLogo from "../../images/plannr_logo.svg";
import { useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Calendar from "./Calendar";
import YourCourses from "./YourCourses";
import UpcomingClasses from "./UpcomingClasses";
import TimeTable from "./TimeTable";
import { deepOrange, deepPurple } from "@mui/material/colors";

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
        <div className="user-info">
          <div className="user-info__avatar">
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>JD</Avatar>
            </Stack>
          </div>
          <div className="user-info__name">John Doe</div>
        </div>
        <Button text="Logout" type="button__nav-bar__logout" />
      </div>
      <div className="dashboard__left-info">
        <Calendar />
        <div className="upcoming-classes">
          <h3 className="upcoming-classes__title">Upcoming Classes</h3>
          <ul className="upcoming-classes__list">
            <UpcomingClasses
              code="CS3003D"
              name="Operating Systems"
              time="8:00 AM"
            />
            <UpcomingClasses
              code="CS3001D"
              name="Theory of Computation"
              time="10:15 AM"
            />
          </ul>
        </div>
      </div>
      <div className="dashboard__middle-info">
        <TimeTable />
      </div>
      <div className="dashboard__right-info">
        <div className="student-courses">
          <h3 className="student-courses__title">Your Courses</h3>
          <ul className="student-courses__list">
            <YourCourses
              color="#000"
              code="CS3001D"
              name="Theory of Computation"
            />
            <YourCourses
              color="#23ef67"
              code="CS3002D"
              name="Database and Management Systems"
            />
            <YourCourses
              color="#654321"
              code="CS3003D"
              name="Operating Systems"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
