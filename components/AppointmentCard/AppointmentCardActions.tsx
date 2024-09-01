import { Box } from "@mui/system";
import * as React from "react";
import { Action } from "./types";

type AppointmentCardActionsProps = { actions: Action[] };

export const AppointmentCardActions = ({
  actions,
}: AppointmentCardActionsProps) => {
  return (
    <Box sx={{ display: "flex", marginLeft: "4px", alignItems: "center" }}>
      {actions.map((item) => (
        <div onClick={item.fn} key={item.label}>
          {item.icon}
        </div>
      ))}
    </Box>
  );
};
