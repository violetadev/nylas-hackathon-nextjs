import { useEffect } from "react";
import { Container } from "@mui/system";
import { DashboardSummary } from "../../components/DashboardSummary";
import { DashboardShortCuts } from "../../components/DashboardShortCuts";
import { useGlobalContext } from "../../context/globalContext";
import { useQuery } from "@tanstack/react-query";
import { fetchCalendarData, fetchUserData } from "../../fetch/helpers";
import { Typography } from "@mui/material";
import { AdminWrapper } from "../../components/AdminWrapper";
import { Loading } from "../../components/Loading";

export default function Index() {
  const { globalContext, setGlobalContext } = useGlobalContext();

  const { data: brandName, isLoading: isUserLoading } = useQuery({
    queryKey: ["brandName"],
    queryFn: fetchUserData,
    enabled: !globalContext?.brandName,
  });

  const { data: calendar, isLoading: isCalendarLoading } = useQuery({
    queryKey: ["calendar"],
    queryFn: fetchCalendarData,
    enabled: !globalContext?.calendar,
    staleTime: 600000,
  });

  useEffect(() => {
    if (brandName) {
      setGlobalContext((prev) => ({ ...prev, brandName }));
    }
  }, [brandName, setGlobalContext]);

  useEffect(() => {
    if (calendar) {
      setGlobalContext((prev) => ({ ...prev, calendar }));
    }
  }, [calendar, setGlobalContext]);

  if (isUserLoading || isCalendarLoading) return <Loading />;

  return (
    <AdminWrapper>
      <>
        <Typography variant="h1">
          Welcome to {globalContext?.brandName}'s Events Manager
        </Typography>
        <DashboardShortCuts />
        <DashboardSummary />
      </>
    </AdminWrapper>
  );
}
