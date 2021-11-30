import React from "react";
import loginImg from "./LoginImg.svg";
function Login() {
  return (
    <div className="parent">
      <div className="image">
        <img src={loginImg} alt="LoginImg" className="login-picture" />
      </div>
      <div className="container">
        <div className="header">Login</div>
        <div className="form-group">
          <label>UserName: </label>
          <input
            placeholder="username"
            type="text"
            className="input-field"
          ></input>
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            placeholder="password"
            type="password"
            className="input-field"
          ></input>
        </div>
        <div className="buttondiv">
          <button type="submit">Submit</button>
        </div>

        <a href="#" className="signup">
          Dont have an account? Register Here
        </a>
      </div>
    </div>
  );
}

export default Login;
