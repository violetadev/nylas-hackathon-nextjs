import * as React from "react";
import { useGlobalContext } from "../../context/globalContext";
import { Calendar } from "../Calendar/";
import { normalizeTimeOrDate } from "../../helpers/helpers";
import { getDate, startOfToday } from "date-fns";
import { AppointmentCardList } from "../AppointmentCardList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatEventsData } from "../DashboardSummary/utils";
import { Box, Container } from "@mui/system";
import { Button } from "@mui/material";
import { fetchCalendarData } from "../../fetch/helpers";
import { AddEvent } from "../AddEvent/AddEvent";
import { useEffect } from "react";
import { Loading } from "../Loading";

const getEventsByDate = (selectedDate, datesWithEvents) => {
  return datesWithEvents?.filter((event) => {
    const eventDateNormalized = normalizeTimeOrDate(event.when);
    if (eventDateNormalized === getDate(selectedDate)) {
      return event;
    }
  });
};

export const CalendarDashboard = () => {
  const { globalContext, setGlobalContext } = useGlobalContext();
  const [openEventModal, setOpenEventModal] = React.useState(false);

  const queryClient = useQueryClient();
  const { data: calendar, isLoading: isCalendarLoading } = useQuery({
    queryKey: ["calendar"],
    queryFn: fetchCalendarData,
    staleTime: 600000,
  });

  const handleDateChange = (date) => {
    setGlobalContext((prev) => ({
      ...prev,
      selectedDate: date,
      selectedDatesEvents: null,
    }));
  };

  useEffect(() => {
    const today = startOfToday();
    if (!globalContext?.selectedDate) {
      setGlobalContext((prev) => ({
        ...prev,
        selectedDate: today,
      }));
    }
  }, [globalContext?.selectedDate, setGlobalContext]);

  useEffect(() => {
    if (globalContext) {
      const selectedEvents =
        globalContext.selectedMonthEvents &&
        globalContext.selectedDate &&
        getEventsByDate(
          globalContext.selectedDate,
          globalContext.selectedMonthEvents
        );

      if (
        selectedEvents?.length !== globalContext.selectedDatesEvents?.length
      ) {
        setGlobalContext((prev) => ({
          ...prev,
          selectedDatesEvents: formatEventsData(selectedEvents, queryClient),
        }));
      }
    }
  }, [globalContext, setGlobalContext, calendar]);

  useEffect(() => {
    if (calendar && calendar !== globalContext?.calendar) {
      setGlobalContext((prev) => ({ ...prev, calendar }));
    }
  }, [calendar, globalContext?.calendar, setGlobalContext]);

  if (isCalendarLoading) {
    return <Loading />;
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        marginBottom: "48px",
        justifyContent: "space-between",
        height: "100vh",
        "@media (max-width: 768px)": {
          flexFlow: "row wrap-reverse",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "50vw",
          "@media (max-width: 768px)": {
            maxWidth: "100%",
          },
        }}
      >
        {globalContext?.selectedDatesEvents ? (
          <AppointmentCardList
            appointments={globalContext?.selectedDatesEvents}
          />
        ) : (
          <Loading />
        )}
      </Box>
      <Box
        component="section"
        aria-labelledby="calendar-section"
        sx={{
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{ display: "flex", flexFlow: "column", justifyContent: "center" }}
        >
          <Button
            onClick={() => setOpenEventModal(true)}
            variant="outlined"
            sx={{ justifySelf: "flex-end", margin: "8px", maxWidth: "200px" }}
            aria-label="Add a new event"
          >
            Add Event
          </Button>
        </Box>
        <AddEvent
          isOpen={openEventModal}
          closeModal={() => setOpenEventModal(false)}
        />
        <Calendar
          onDateSelector={handleDateChange}
          aria-label="Select a date from the calendar"
        />
      </Box>
    </Container>
  );
};
