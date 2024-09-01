import * as React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { MiniCardInfo } from "../MiniCardInfo";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import PeopleIcon from "@mui/icons-material/People";
import { Action } from "./types";
import { Box } from "@mui/system";

type AppointmentCardInfoProps = {
  date: string;
  title?: string;
  participantsCount?: string;
};

export const AppointmentCardInfo = ({
  date,
  participantsCount,
  title,
}: AppointmentCardInfoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textTransform: "capitalize",
      }}
    >
      {title && (
        <MiniCardInfo
          icon={<EmojiFlagsIcon />}
          label={"Title"}
          text={title}
          handleClick={() => console.log("title")}
        />
      )}
      <MiniCardInfo
        icon={<AccessTimeIcon />}
        label={"Timeslot"}
        handleClick={() => console.log("time")}
        text={date}
      />
      {participantsCount && Number(participantsCount) > 0 && (
        <MiniCardInfo
          icon={<PeopleIcon />}
          label={"Participants"}
          text={participantsCount}
          handleClick={() => console.log("participantsCount")}
        />
      )}
    </Box>
  );
};
