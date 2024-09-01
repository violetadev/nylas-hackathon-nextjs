import { CalendarDashboard } from "../../components/CalendarDashboard";
import { Typography } from "@mui/material";
import { AdminWrapper } from "../../components/AdminWrapper";

export default function Calendar() {
  return (
    <AdminWrapper>
      <>
        <Typography variant="h1">Your Events Dashboard</Typography>
        <Typography variant="body1">
          Create and manage your events. The events that have sessions are
          marked by a green dot.
        </Typography>
        <CalendarDashboard />
      </>
    </AdminWrapper>
  );
}
