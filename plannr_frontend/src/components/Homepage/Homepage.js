import React from "react";
import homepageVector from "../../images/Homepage_Vector.svg";
import HomePageDesc from "./HomePageDesc";

function Homepage() {
  return (
    <div className="homepage">
      <HomePageDesc />
      <img
        src={homepageVector}
        alt="Home Page Vector"
        className="homepage__vector"
      />
    </div>
  );
}

export default Homepage;
