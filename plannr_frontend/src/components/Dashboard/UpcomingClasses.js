import React, { useState } from "react";

function UpcomingClasses({ code, name, time }) {
  const [classCode, setClassCode] = useState(code);
  const [className, setClassName] = useState(name);
  const [classTime, setClassTime] = useState(time);

  return (
    <li className="upcoming-classes__list__item">
      <p className="class-code">{classCode}</p>
      <h4 className="class-name">{className}</h4>
      <h4 className="class-time">{classTime}</h4>
    </li>
  );
}

export default UpcomingClasses;
