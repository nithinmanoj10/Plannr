import React from "react";
import plannrLogo from "../../images/plannr_logo.svg";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";

function HomePageDesc() {
  const navigate = useNavigate();

  function handleClick() {
    console.log("Hellooooo");
    navigate("/student");
  }

  return (
    <div className="homepage-description">
      <img
        src={plannrLogo}
        alt="Plannr Logo"
        className="homepage-description__logo"
      />
      <h1 className="homepage-description__title">
        Access your Time Table from anywhere
      </h1>
      <p className="homepage-description__para">
        Seamless and easy to use platform that will allow you to view your
        classes for the week
      </p>
      <Button text="Get Started" type="button__solid" onClick={handleClick} />
    </div>
  );
}

export default HomePageDesc;
