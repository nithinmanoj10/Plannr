import * as React from "react";
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

const currentDate = new Date().toISOString().slice(0, 10);
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

function TimeTableTeacher() {
  const [data, setData] = React.useState(appointments);
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
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted));
      }
      setIsAppointmentBeingCreated(false);
    },
    [setData, setIsAppointmentBeingCreated, data]
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

  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating]
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating]
  );

  return (
    <React.Fragment>
      <Paper>
        <Scheduler data={data}>
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
