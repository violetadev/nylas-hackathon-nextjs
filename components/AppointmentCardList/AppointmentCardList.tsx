import { Box } from "@mui/system";
import { AppointmentCard } from "../AppointmentCard/AppointmentCard";
import { Action } from "../AppointmentCard/types";

type AppointmentCardListProps = {
  appointments: Appointment[];
};

type Appointment = {
  date: string;
  title: string;
  description: string;
  actions: Action[];
};

export const AppointmentCardList = ({
  appointments,
}: AppointmentCardListProps) => {
  return (
    <div>
      <Box
        sx={{
          gap: 2,
          margin: "14px 0",
          display: "flex",
          flexFlow: "column wrap",
          minWidth: "100%",
        }}
      >
        {!appointments || (!appointments.length && <div>Select a date with sessions.</div>)}
        {appointments?.map((item, index) => (
          <AppointmentCard
            key={index}
            date={item.date}
            title={item.title}
            description={item.description}
            actions={item.actions}
          />
        ))}
      </Box>
    </div>
  );
};
