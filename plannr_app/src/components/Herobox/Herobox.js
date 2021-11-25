import React from "react";
import Button from "../Buttons/Button";
import heroBoxVector from "../../images/heroBoxVector.svg";

export default function Herobox() {
  return (
    <div className="hero-box">
      <div className="hero-box__text">
        <div className="hero-box__container">
          <h1 className="hero-box__text__heading">
            Access Your Time Table From Anywhere
          </h1>
          <p className="hero-box__text__description">
            Seamless and easy to use platform that will allow you to view your
            classes for the week
          </p>
          <Button text="Get Started" type="button__solid" />
        </div>
      </div>
      <div className="hero-box__image">
        <img src={heroBoxVector} className="hero-box__image__vector"></img>
      </div>
    </div>
  );
}
