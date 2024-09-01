"use client";

import React from "react";
import { Box } from "@mui/system";

import { Typography } from "@mui/material";
import { EventsSummary } from "../EventsSummary";

export const DashboardSummary: React.FC = () => {
  return (
    <Box sx={{ minWidth: "100%", margin: "32px 0" }}>
      <Typography variant="h2">Your Summary</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "row wrap",
          gap: 2,
          minWidth: "100%",
          margin: "32px 0",
        }}
      >
        <EventsSummary />
      </Box>
    </Box>
  );
};
