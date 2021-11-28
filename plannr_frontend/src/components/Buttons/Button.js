import React, { useState } from "react";

export default function Button(props) {
  const [buttonText, setButtonText] = useState(props.text);
  const [buttonType, setButtonType] = useState(props.type);

  console.log(props.type);

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href="javascript:void(0)"
      className={`button ${props.type}`}
      onClick={props.onClick}
    >
      {buttonText}
    </a>
  );
}
