import * as React from "react";
import plannrLogo from "../../images/plannr_logo.svg";
import { useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
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
      <div className="dashboard__left-info">Calendar</div>
      <div className="dashboard__middle-info">Time Table</div>
      <div className="dashboard__right-info">Courses</div>
    </div>
  );
}

export default Dashboard;
