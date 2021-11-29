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
    title: "Mail New Leads for Follow Up",
    startDate: "2019-06-23T10:00",
    endDate: "2019-06-23T11:00",
  },
  {
    title: "Product Meeting",
    startDate: "2019-06-23T08:00",
    endDate: "2019-06-23T09:00",
  },
  { title: "Send Territory Sales Breakdown", startDate: "2019-06-23T12:35" },
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
