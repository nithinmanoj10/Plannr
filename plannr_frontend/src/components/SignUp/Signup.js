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
  const [batch, setBatch] = useState("A");

  // function that handles the click of the form submit button
  // calls the Student Signup Backend
  function handleSubmit() {
    const urlSignUpStudent = `/signupStudent?regNo="${regNo}"&name="${name}"&pass="${password}"&dob="${DOB}"&email="${email}"&mobNo="${mobileNumber}"&class="${batch}"`;

    fetch(urlSignUpStudent)
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

  // go to login page if already signed up
  function handleAlreadyRegistered() {
    navigate("/login");
  }

  // go to sign up page for teachers
  function handleTeacherSignUp() {
    navigate("/signup-teacher");
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

  // function to get the Batch value
  function handleBatch(e) {
    setBatch(e.target.value);
  }

  return (
    <div className="parent">
      <div className="image">
        <img src={SignupImg} alt="SignupImg" className="login-picture" />
      </div>
      <div className="container">
        <div className="header">Sign Up - Student</div>
        <div className="form-group">
          <label>RegNo: </label>
          <input
            name="regNo"
            placeholder="Registration Number"
            type="text"
            className="input-field"
            required
            onChange={handleRegNo}
          ></input>
        </div>
        <div className="form-group">
          <label>Name: </label>
          <input
            name="name"
            placeholder="Name"
            type="text"
            className="input-field"
            required
            onChange={handleName}
          ></input>
        </div>

        <div className="form-group">
          <label>Password: </label>
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
          <label>Email: </label>
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
          <label>DOB: </label>
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
          <label>MobileNo: </label>
          <input
            name="mobileno"
            placeholder="MobileNumber"
            type="text"
            className="input-field"
            onChange={handleMobile}
            required
          ></input>
        </div>
        <div className="form-group">
          <label>Batch: </label>
          <select
            name="batch"
            className="input-field"
            placeholder="batch"
            onChange={handleBatch}
            required
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>
        </div>
        <div className="buttondiv">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <a
          href="javascript:void(0)"
          className="signup"
          onClick={handleTeacherSignUp}
        >
          Sign Up - Faculty
        </a>
        <a
          href="javascript:void(0)"
          className="signup"
          onClick={handleAlreadyRegistered}
        >
          Already have an account? Login Here
        </a>
      </div>
      {/* <p>{regNo}</p>
      <p>{name}</p>
      <p>{password}</p>
      <p>{email}</p>
      <p>{DOB}</p>
      <p>{mobileNumber}</p>
      <p>{batch}</p> */}
    </div>
  );
}

export default Signup;
