"use client";

import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../context/globalContext";
import { AppointmentCardList } from "../AppointmentCardList";
import { LatestAppointments } from "../LatestAppointments";
import { formatEventsData } from "../DashboardSummary/utils";
import { fetchEventsByMonth } from "../../fetch/helpers";
import { Loading } from "../Loading";

export const EventsSummary: React.FC = () => {
  const { globalContext, setGlobalContext } = useGlobalContext();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${year}-${month}`;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["upcomingEvents", globalContext?.calendar?.id],
    queryFn: () => fetchEventsByMonth(formattedDate),
    enabled: !!globalContext?.calendar?.id,
  });

  useEffect(() => {
    if (data && !globalContext?.upcomingEvents) {
      console.log(data, "data");
      setGlobalContext((prev) => ({
        ...prev,
        upcomingEvents: formatEventsData(data, queryClient) || [],
      }));
    }
  }, [data]);

  return (
    <Box
      sx={{
        gap: 2,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minWidth: "100%",
      }}
    >
      <div>
        <Typography variant="h3">Upcoming Events</Typography>
        {isLoading && <Loading />}
        {isError && <Typography>Error loading events</Typography>}
        {globalContext?.upcomingEvents && (
          <AppointmentCardList appointments={globalContext?.upcomingEvents} />
        )}
      </div>
      <LatestAppointments />
    </Box>
  );
};
