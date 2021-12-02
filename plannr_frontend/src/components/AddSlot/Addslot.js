import React, { useState } from "react";

import { Button, Checkbox, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import plannrName from "../../images/plannr_name.svg";
import addSlotImage from "../../images/addSlotImage.svg";

function AddSlot() {
  const [firstName, setFirstName] = useState("");

  function handleFirstName(e) {
    setFirstName(e.target.value);
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
          src={addSlotImage}
          alt="Girl Going through phone"
          className="add-slot-page__picture-section__image"
        />
      </div>
      <div className="add-slot-page__form-section">
        <p>{firstName}</p>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder="First Name" onChange={handleFirstName} />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder="Last Name" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default AddSlot;
