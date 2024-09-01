"use client";

import React from "react";
import { BasicCard } from "../BasicCard";
import { Box } from "@mui/system";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import { useRouter } from "next/navigation";

export const DashboardShortCuts: React.FC = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "row nowrap",
        gap: 2,
        margin: "28px 0",
      }}
    >
      <BasicCard
        title={"Calendar"}
        subtitle={"Manage your Events"}
        icon={<CalendarMonthIcon />}
        handleClick={() => router.push("/events")}
      />
      <BasicCard
        title={"Participants"}
        subtitle={"See All Participants"}
        icon={<PeopleIcon />}
        handleClick={() => router.push("/participants")}
      />
    </Box>
  );
};
