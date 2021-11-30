import React from "react";
import SignupImg from "./SignupImg.svg";
function Signup() {
  return (
    <div className="parent">
      <div className="image">
        <img src={SignupImg} alt="SignupImg" />
      </div>
      <div className="container">
        <div className="header">Sign Up - Student</div>
        <div className="form-group">
          <label>UserId: </label>
          <input
            name="userId"
            placeholder="userId"
            type="text"
            className="input-field"
            required
          ></input>
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            name="password"
            placeholder="password"
            type="password"
            className="input-field"
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
            required
          ></input>
        </div>
        <div className="form-group">
          <label>Batch: </label>
          <input
            name="mobileno"
            placeholder="MobileNumber"
            type="text"
            className="input-field"
            required
          ></input>
        </div>
        <div className="buttondiv">
          <button type="submit">Submit</button>
        </div>
        <a href="#" className="signup">
          Sign Up - Student
        </a>
        <a href="#" className="signup">
          Already have an account? Login Here
        </a>
      </div>
    </div>
  );
}

export default Signup;
