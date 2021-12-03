import React, { useState, useEffect } from "react";

import { Button, Form, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import plannrName from "../../images/plannr_name.svg";
import addSlotImage from "../../images/addSlotImage.svg";

function AddSlot() {
  const [firstName, setFirstName] = useState("");
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
        setMessageHeader("Form Completed");
        setMessageContent("Class added successfully");
        break;

      case "warning":
        setIsSuccess(false);
        setIsWarning(true);
        setIsError(false);
        setMessageHeader("Could you check something!");
        setMessageContent("Maybe that slot is already booked");
        break;

      case "error":
        setIsSuccess(false);
        setIsWarning(false);
        setIsError(true);
        setMessageHeader("Error");
        setMessageContent("There has been an error in adding the class");
        break;

      default:
        break;
    }
  }, [statusMessage]);

  const slotOptions = [
    { key: "s1", text: "8:00 - 9:00", value: 1 },
    { key: "s2", text: "9:00 - 10:00", value: 2 },
    { key: "s3", text: "10:15 - 11:15", value: 3 },
    { key: "s4", text: "11:15 - 12:15", value: 4 },
    { key: "s5", text: "13:00 - 14:00", value: 5 },
    { key: "s6", text: "14:00 - 17:00", value: 6 },
    { key: "s7", text: "14:00 - 15:00", value: 7 },
    { key: "s8", text: "15:00 - 16:00", value: 8 },
    { key: "s9", text: "16:00 - 17:00", value: 9 },
  ];

  const dayOptions = [
    { key: "d1", text: "Monday", value: 1 },
    { key: "d2", text: "Tuesday", value: 2 },
    { key: "d3", text: "Wednesday", value: 3 },
    { key: "d4", text: "Thursday", value: 4 },
    { key: "d5", text: "Friday", value: 5 },
  ];

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
          src={addSlotImage}
          alt="Girl Going through phone"
          className="add-slot-page__picture-section__image"
        />
      </div>
      <div className="add-slot-page__form-section">
        <h2 className="add-slot-page__form-section__title">Add New Class</h2>
        <div className="add-slot-page__form-section__form">
          <Form success={isSuccess} warning={isWarning} error={isError}>
            <Form.Field>
              <label>Class Title</label>
              <input placeholder="Class Title" />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                label="Slot"
                options={slotOptions}
                placeholder="Slot"
              />
              <Form.Select
                fluid
                label="Day"
                options={dayOptions}
                placeholder="Day"
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

            <Button type="submit">Submit</Button>
          </Form>
        </div>
        <p>{firstName}</p>
      </div>
    </div>
  );
}

export default AddSlot;
