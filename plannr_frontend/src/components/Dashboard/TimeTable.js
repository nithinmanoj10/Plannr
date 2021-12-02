import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";

const slotTimings = require("./slotTimings");
const slotDay = require("./slotDay");

/*const timeTableHeight = document.getElementById(
  "dashboard__middle-info"
).offsetHeight;*/
// const currentDate = new Date().toISOString().slice(0, 10);
const currentDate = "2021-12-09";
console.log(currentDate);
const appointments = [
  {
    title: "Operating Systems",
    startDate: "2021-11-29T09:00",
    endDate: "2021-11-29T10:00",
  },
  {
    title: "Database and Management Systems",
    startDate: "2021-11-29T10:15",
    endDate: "2021-11-29T11:15",
  },
  {
    title: "OS Lab",
    startDate: "2021-11-29T14:00",
    endDate: "2021-11-29T17:00",
  },
  {
    title: "Theory of Computation",
    startDate: "2021-11-30T12:00",
    endDate: "2021-11-30T13:00",
  },
  {
    title: "Engineering Economics",
    startDate: "2021-12-02T15:00",
    endDate: "2021-12-02T16:00",
  },
];

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#2b0548",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

function TimeTable({ classes }) {
  const [classSlots, setClassSlots] = useState([]);
  const [classesTime, setClassesTime] = useState([]);
  const [classSlotsReady, setClassSlotsReady] = useState(false);

  // to get all the class slots
  // and store it in an array
  useEffect(() => {
    const temp = [];
    for (const key in classes) {
      if (key !== "status") {
        const slot = classes[key];

        console.log("Slot 1: " + slotTimings[slot[1]]);

        const slotAppointment = {
          title: `${slot[0]}`,
          startDate: `${slotDay[slot[2]]}${slotTimings[slot[1]][0]}`,
          endDate: `${slotDay[slot[2]]}${slotTimings[slot[1]][1]}`,
          rRule: `FREQ=WEEKLY;INTERVAL=1`,
        };

        temp.push(slotAppointment);
        setClassSlots(temp);
      }
    }
  }, [classes]);

  // once all classSlots are stored in an array
  // useEffect(() => {
  //   const classAppointments = [];

  //   classSlots.forEach((element, index) => {
  //     console.log(element);
  //   });
  // }, [classSlotsReady]);

  return (
    <Paper>
      <Scheduler data={classSlots}>
        <ViewState defaultCurrentDate={currentDate} />
        <WeekView
          startDayHour={8}
          endDayHour={17}
          cellDuration={60}
          excludedDays={[0, 6]}
        />
        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip />
        <CurrentTimeIndicator shadePreviousCells={false} />
      </Scheduler>
    </Paper>
  );
}

export default TimeTable;
