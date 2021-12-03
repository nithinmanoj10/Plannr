import React, { useState, useEffect } from "react";

import SignUpImg from "./SignupImg.svg";
import plannrName from "../../images/plannr_name.svg";
import { Button, Form, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

function NewSignUpStudent() {
  const navigate = useNavigate();

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageHeader, setMessageHeader] = useState("");
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    switch (statusMessage) {
      case "success":
        setIsSuccess(true);
        setIsWarning(false);
        setIsError(false);
        setMessageHeader("Welcome");
        setMessageContent("Successfully Signed In");
        break;

      case "warning":
        setIsSuccess(false);
        setIsWarning(true);
        setIsError(false);
        setMessageHeader("Could you check something!");
        break;

      case "error":
        setIsSuccess(false);
        setIsWarning(false);
        setIsError(true);
        setMessageHeader("Error");
        break;

      default:
        break;
    }
  }, [statusMessage]);

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

        if (result === "invalidArg") {
          setStatusMessage("warning");
          setMessageContent("Please input all the details");
        }
        if (result === "failure") {
          setStatusMessage("error");
          setMessageContent("There was an error in Signing Up");
        }
        if (result === "success") {
          setStatusMessage("success");

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
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
    <div className="add-slot-page">
      <div className="add-slot-page__picture-section">
        <div className="add-slot-page__picture-section__name">
          <a href="javascript:void(0)">
            <img src={plannrName} alt="Plannr Logo" className="plannr-name" />
          </a>
          <div className="plannr-tag">
            Seamless and easy to use platform that will allow you to view your
            classes for the week{" "}
          </div>
        </div>
        <img
          src={SignUpImg}
          alt="Girl Going through phone"
          className="add-slot-page__picture-section__image"
        />
      </div>
      <div className="add-slot-page__form-section">
        <h2 className="add-slot-page__form-section__title">
          Sign Up - Faculty
        </h2>
        <div className="add-slot-page__form-section__form">
          <Form success={isSuccess} warning={isWarning} error={isError}>
            <Form.Field>
              <label>Registration Number</label>
              <input placeholder="Registration Number" onChange={handleRegNo} />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Name"
                placeholder="Name"
                onChange={handleName}
              />
              <Form.Input
                type="password"
                fluid
                label="Password"
                placeholder="Password"
                onChange={handlePassword}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="E-Mail"
                placeholder="E-Mail"
                onChange={handleEmail}
              />
              <Form.Input
                fluid
                label="Date of Birth"
                placeholder="YYYY-MM-DD"
                onChange={handleDOB}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Mobile Number"
                placeholder="Mobile Number"
                onChange={handleMobile}
              />
            </Form.Group>

            {statusMessage !== "" ? (
              <Message
                success={isSuccess}
                warning={isWarning}
                error={isError}
                header={messageHeader}
                content={messageContent}
              />
            ) : (
              ""
            )}

            <Button type="submit" onClick={handleSubmit}>
              Sign Up
            </Button>
            <div className="signup-page__links-block">
              <a
                href="javascript:void(0)"
                className="signup-page__links"
                onClick={handleSignUpStudent}
              >
                Sign Up - Student
              </a>
              <a
                href="javascript:void(0)"
                className="signup-page__links"
                onClick={handleLogin}
              >
                Already have an account? Login Here
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default NewSignUpStudent;
