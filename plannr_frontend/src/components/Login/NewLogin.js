import React, { useState, useEffect } from "react";

import LoginImg from "./LoginImg.svg";
import plannrName from "../../images/plannr_name.svg";
import { Button, Form, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

function NewSignUpStudent() {
  const navigate = useNavigate();

  function handleSignUp() {
    navigate("/signup-student");
  }

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
        setMessageContent("Successfully Logged In");
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
          if (status === "invalidArg") {
            setStatusMessage("warning");
            setMessageContent("Please input all the details");
          }
          if (status === "failure") {
            setStatusMessage("error");
            setMessageContent("There was an error in Logging In");
          }
          if (status === "wrongPass") {
            setStatusMessage("error");
            setMessageContent("The password entered is wrong");
          }
          if (status === "success") {
            setStatusMessage("success");

            setTimeout(() => {
              navigate(`/teacher/${regNo}/${teacherID}`);
            }, 1000);
          }
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

          if (status === "invalidArg") {
            setStatusMessage("warning");
            setMessageContent("Please input all the details");
          }
          if (status === "failure") {
            setStatusMessage("error");
            setMessageContent("There was an error in Logging In");
          }
          if (status === "wrongPass") {
            setStatusMessage("error");
            setMessageContent("The password entered is wrong");
          }
          if (status === "success") {
            setStatusMessage("success");

            setTimeout(() => {
              navigate(`/student/${regNo}/${batch}`);
            }, 1000);
          }
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
          src={LoginImg}
          alt="Girl Going through phone"
          className="add-slot-page__picture-section__image"
        />
      </div>
      <div className="add-slot-page__form-section">
        <h2 className="add-slot-page__form-section__title">Login</h2>
        <div className="add-slot-page__form-section__form">
          <Form success={isSuccess} warning={isWarning} error={isError}>
            <Form.Field>
              <label>Registration Number</label>
              <input placeholder="Registration Number" onChange={handleRegNo} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                placeholder="Registration Number"
                onChange={handlePassword}
              />
            </Form.Field>

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
              Login
            </Button>
            <div className="signup-page__links-block">
              <a
                href="javascript:void(0)"
                className="signup-page__links"
                onClick={handleSignUp}
              >
                Dont have an account? Register Here
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default NewSignUpStudent;
