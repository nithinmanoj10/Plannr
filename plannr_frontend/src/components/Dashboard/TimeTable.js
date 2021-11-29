import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { style } from "@mui/system";

/*const timeTableHeight = document.getElementById(
  "dashboard__middle-info"
).offsetHeight;*/
const currentDate = new Date().toISOString().slice(0, 10);
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
    startDate: "2021-11-30T15:00",
    endDate: "2021-11-30T16:00",
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

function TimeTable() {
  return (
    <Paper>
      <Scheduler data={appointments}>
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
