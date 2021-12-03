import { flexbox } from "@mui/system";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import loginImg from "./LoginImg.svg";

function Login() {
  const navigate = useNavigate();

  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");

  // function that handles the submit button
  // for the login form. Uses the fetch() function
  // to get the required values from server.py
  function handleSubmit() {
    const isTeacher = regNo[0] === "P" && regNo[1] === "R" ? true : false;

    if (isTeacher === true) {
      console.log("Teacher Logging In");
      const urlLoginTeacher = `/loginTeacher?regNo="${regNo}"&pass="${password}"`;

      fetch(urlLoginTeacher)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { regNo, name, email, status, teacherID } = data;

          if (status === "invalidArg") alert("Please enter all the details");
          if (status === "failure") alert("Error in Logging In");
          if (status === "wrongPass") alert("Wrong Password");
          if (status === "success") navigate(`/teacher/${regNo}/${teacherID}`);
        });
    }

    if (isTeacher === false) {
      const urlLoginStudent = `/loginStudent?regNo="${regNo}"&pass="${password}"`;

      fetch(urlLoginStudent)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const { batch, email, name, regNo, status } = data;

          if (status === "invalidArg") alert("Please enter all the details");
          if (status === "failure") alert("Error in Logging In");
          if (status === "wrongPass") alert("Wrong Password");
          if (status === "success") navigate(`/student/${regNo}/${batch}`);
        });
    }
  }

  // function that gets the regNo value
  function handleRegNo(e) {
    setRegNo(e.target.value);
  }

  // function that gets the password value
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="parent">
      <div className="image">
        <img src={loginImg} alt="LoginImg" className="login-picture" />
      </div>
      <div className="container">
        <div className="header-title">Login</div>
        <div className="form-group">
          <label>Registration Number </label>
          <input
            placeholder="Registration Number"
            type="text"
            className="input-field"
            onChange={handleRegNo}
          ></input>
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            placeholder="password"
            type="password"
            className="input-field"
            onChange={handlePassword}
          ></input>
        </div>
        <div className="buttondiv">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <a href="javascript:void(0)" className="signup">
          Dont have an account? Register Here
        </a>
      </div>
      {/* <p>{regNo}</p>
      <p>{password}</p> */}
    </div>
  );
}

export default Login;
