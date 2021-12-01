import React from "react";
import plannrName from "../../images/plannr_name.svg";

function SignUp() {
  return (
    <div className="signup-page">
      <div className="signup-page__picture-section">
        <div className="signup-page__picture-section__name">
          <a href="javascript:void(0)">
            <img src={plannrName} alt="Plannr Logo" className="plannr-name" />
          </a>
          <div className="plannr-tag">Access your Time Table from anywhere</div>
        </div>
      </div>
      <div className="signup-page__form-section">Form</div>
    </div>
  );
}

export default SignUp;
