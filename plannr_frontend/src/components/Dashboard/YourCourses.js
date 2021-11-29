import React, { useState } from "react";

function YourCourses({ color, code, name }) {
  const [courseCode, setCourseCode] = useState(code);
  const [courseName, setCourseName] = useState(name);
  const [courseColor, setCourseColor] = useState(color);

  const style = {
    backgroundColor: courseColor,
  };

  return (
    <li className="student-courses__list__item">
      <div className="course-details">
        <p className="course-details__code">{courseCode}</p>
        <h4 className="course-details__name">{courseName}</h4>
      </div>
      <div className="course-color" style={style}></div>
    </li>
  );
}

export default YourCourses;
