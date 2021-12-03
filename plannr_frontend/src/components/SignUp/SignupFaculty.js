import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupImg from "./SignupImg.svg";
function Signup() {
  const navigate = useNavigate();

  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  function handleSignUpStudent() {
    navigate("/signup-student");
  }

  function handleLogin() {
    navigate("/login");
  }

  // function that handles the click of the form submit button
  // calls the Teacher Signup Backend
  function handleSubmit() {
    const urlTeacherSignUp = `/signupTeacher?regNo="${regNo}"&name="${name}"&pass="${password}"&dob="${DOB}"&email="${email}"&mobNo="${mobileNumber}"`;

    fetch(urlTeacherSignUp)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { result } = data;

        if (result === "invalidArg")
          alert("Please enter all the details to sign up successfully");

        if (result === "failure")
          alert("There was an error in creating an account");

        if (result === "success") navigate("/login");
      });
  }

  // function to get the Registration Number value
  function handleRegNo(e) {
    setRegNo(e.target.value);
  }

  // function to get the Name value
  function handleName(e) {
    setName(e.target.value);
  }

  // function to get the Password value
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  // function to get the Email value
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  // function to get the DOB value
  function handleDOB(e) {
    setDOB(e.target.value);
  }

  // function to get the Mobile Number value
  function handleMobile(e) {
    setMobileNumber(e.target.value);
  }

  return (
    <div className="parent">
      <div className="image">
        <img src={SignupImg} alt="SignupImg" />
      </div>
      <div className="container">
        <div className="header">Sign Up - Faculty</div>
        <div className="form-group">
          <label>Registration Number </label>
          <input
            name="regNo"
            placeholder="regNo"
            type="text"
            className="input-field"
            onChange={handleRegNo}
            required
          ></input>
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            name="Name"
            placeholder="name"
            type="text"
            className="input-field"
            onChange={handleName}
            required
          ></input>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            placeholder="password"
            type="password"
            className="input-field"
            onChange={handlePassword}
            required
          ></input>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            placeholder="email"
            type="text"
            className="input-field"
            onChange={handleEmail}
            required
          ></input>
        </div>
        <div className="form-group">
          <label>DOB</label>
          <input
            name="dob"
            placeholder="DateOfBirth"
            type="text"
            className="input-field"
            onChange={handleDOB}
            required
          ></input>
        </div>
        <div className="form-group">
          <label>MobileNo</label>
          <input
            name="mobileno"
            placeholder="MobileNumber"
            type="text"
            className="input-field"
            onChange={handleMobile}
            required
          ></input>
        </div>
        <div className="buttondiv">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <a
          href="javascript:void(0)"
          onClick={handleSignUpStudent}
          className="signup"
        >
          Sign Up - Student
        </a>
        <a href="javascript:void(0)" onClick={handleLogin} className="signup">
          Already have an account? Login Here
        </a>
      </div>
    </div>
  );
}

export default Signup;
