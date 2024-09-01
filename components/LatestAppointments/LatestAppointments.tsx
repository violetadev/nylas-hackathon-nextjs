import { Typography } from "@mui/material";
import { AppointmentCardList } from "../AppointmentCardList";
import { useGlobalContext } from "../../context/globalContext";
import { useEffect } from "react";
import { formatEventsData } from "../DashboardSummary/utils";
import { fetchNewestCreatedEventsData } from "../../fetch/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const LatestAppointments = () => {
  const { globalContext, setGlobalContext } = useGlobalContext();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latestEvents", globalContext?.calendar?.id],
    queryFn: () => fetchNewestCreatedEventsData(),
    enabled: !!globalContext?.calendar?.id,
  });

  useEffect(() => {
    if (data) {
      setGlobalContext((prev) => ({
        ...prev,
        latestEvents: formatEventsData(data, queryClient) || [],
      }));
    }
  }, [data, globalContext?.calendar?.id, setGlobalContext]);

  return (
    <div>
      <Typography variant="h3">Newly Created Events</Typography>
      {globalContext?.latestEvents && (
        <AppointmentCardList appointments={globalContext?.latestEvents} />
      )}
    </div>
  );
};
