import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";

function Calendar() {
  const [date, setDate] = React.useState(new Date());

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2b0548",
      },
      secondary: {
        main: "#4630ab",
      },
    },
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {},
        },
      },
      MuiCalendarPicker: {
        styleOverrides: {
          root: {
            transform: "scale(0.9)",
            maxHeight: "300px",
            overflowY: "hidden",
          },
          viewTransitionContainer: {
            overflowY: "hidden",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Calendar;
