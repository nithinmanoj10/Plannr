import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";

const slotTimings = require("./slotTimings");
const slotDay = require("./slotDay");

const currentDate = new Date().toISOString().slice(0, 10);

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  text: theme.typography.h6,
  formControlLabel: {
    ...theme.typography.caption,
    fontSize: "1rem",
  },
}));

const editingOptionsList = [
  { id: "allowAdding", text: "Adding" },
  { id: "allowDeleting", text: "Deleting" },
  { id: "allowUpdating", text: "Updating" },
  { id: "allowResizing", text: "Resizing" },
  { id: "allowDragging", text: "Dragging" },
];

const EditingOptionsSelector = ({ options, onOptionsChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.text}>Enabled Options</Typography>
      <FormGroup row>
        {editingOptionsList.map(({ id, text }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={options[id]}
                onChange={onOptionsChange}
                value={id}
                color="primary"
              />
            }
            classes={{ label: classes.formControlLabel }}
            label={text}
            key={id}
            disabled={
              (id === "allowDragging" || id === "allowResizing") &&
              !options.allowUpdating
            }
          />
        ))}
      </FormGroup>
    </div>
  );
};

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

function TimeTableTeacher({ classes, batch, regNo }) {
  const [classSlots, setClassSlots] = useState([]);
  const [refresh, setRefresh] = useState(1);

  // to get all the class slots
  // and store it in an array
  useEffect(() => {
    const temp = [];
    for (const key in classes) {
      if (key !== "status") {
        const slot = classes[key];

        const slotAppointment = {
          id: key,
          title: `${slot[0]}`,
          startDate: `${slotDay[slot[2]]}${slotTimings[slot[1]][0]}`,
          endDate: `${slotDay[slot[2]]}${slotTimings[slot[1]][1]}`,
          rRule: `FREQ=WEEKLY;INTERVAL=1`,
        };

        temp.push(slotAppointment);
      }
    }
    setClassSlots(temp);
  }, [classes, refresh]);

  // printing all the deleted slots
  useEffect(() => {
    classSlots.forEach((slot, index) => {
      if (slot.exDate !== undefined) {
        const deletedClassSlot = classes[slot.id];
        const urlDeleteSlot = `/deleteSlot?subjectName="${deletedClassSlot[0]}"&slotNo=${deletedClassSlot[1]}&day=${deletedClassSlot[2]}&slotClass="${batch}"&regNo="${regNo}"`;

        fetch(urlDeleteSlot)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const { status } = data;

            if (
              status === "invalidArg" ||
              status === "teacherError" ||
              status === "slotError" ||
              status === "subjectError" ||
              status === "failure"
            ) {
              alert("Error in Deletion");
              setRefresh(refresh * -1);
            }

            if (status === "success") alert("Successfully Deleted");
          });
      }
    });
  }, [classSlots]);

  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
    React.useState(false);

  const {
    allowAdding,
    allowDeleting,
    allowUpdating,
    allowResizing,
    allowDragging,
  } = editingOptions;

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          classSlots.length > 0 ? classSlots[classSlots.length - 1].id + 1 : 0;
        setClassSlots([...classSlots, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setClassSlots(
          classSlots.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setClassSlots(
          classSlots.filter((appointment) => appointment.id !== deleted)
        );
      }
      setIsAppointmentBeingCreated(false);
    },
    [setClassSlots, setIsAppointmentBeingCreated, classSlots]
  );
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });
  const handleEditingOptionsChange = React.useCallback(({ target }) => {
    const { value } = target;
    const { [value]: checked } = editingOptions;
    setEditingOptions({
      ...editingOptions,
      [value]: !checked,
    });
  });

  const TimeTableCell = React.useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <WeekView.TimeTableCell
        {...restProps}
        onDoubleClick={allowAdding ? onDoubleClick : undefined}
      />
    )),
    [allowAdding]
  );

  const CommandButton = React.useCallback(
    ({ id, ...restProps }) => {
      if (id === "deleteButton") {
        return (
          <AppointmentForm.CommandButton
            id={id}
            {...restProps}
            disabled={!allowDeleting}
          />
        );
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    },
    [allowDeleting]
  );

  return (
    <React.Fragment>
      <Paper>
        <Scheduler data={classSlots}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />

          <IntegratedEditing />
          <WeekView
            startDayHour={8}
            endDayHour={17}
            cellDuration={60}
            timeTableCellComponent={TimeTableCell}
            excludedDays={[0, 6]}
          />

          <Appointments appointmentComponent={Appointment} />

          <AppointmentTooltip showOpenButton showDeleteButton={allowDeleting} />
          <AppointmentForm
            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
          />
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
}

export default TimeTableTeacher;
