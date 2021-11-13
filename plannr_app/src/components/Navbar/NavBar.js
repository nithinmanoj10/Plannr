import React from "react";
import logo from "../../images/logo.png";
import Button from "../Buttons/Button";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <a href="#">
          <img src={logo} alt="Plannr Logo" className="logo__img"></img>
        </a>
      </div>
      <ul className="nav-bar__list">
        <li className="nav-bar__list__item">
          <a href="#" className="nav-bar__list__item__link">
            About
          </a>
        </li>
        <li className="nav-bar__list__item">
          <a href="#" className="nav-bar__list__item__link">
            How To Use
          </a>
        </li>
        <li className="nav-bar__list__item">
          <a href="#" className="nav-bar__list__item__link">
            Contact Us
          </a>
        </li>
      </ul>

      <div className="nav-bar__buttons">
        <Button text="Login" />
        <Button text="Sign Up" type="button__solid" />
      </div>
    </nav>
  );
}
