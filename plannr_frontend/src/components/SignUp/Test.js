import React from "react";

function Test() {
  function handleClick() {
    console.log("Hellllo");

    fetch(
      '/signupStudent?regNo="B190645CS"&name="Nithin"&pass="Password"&dob="2001-09-22"&email="nithinp.manoj@gmail.com"&mobNo="7306321595"&class="CSE-B"'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <h1 onClick={handleClick}>Click Me!</h1>
    </div>
  );
}

export default Test;
