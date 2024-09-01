"use client";

import { IconButton } from "@mui/material";

type ActionButtonType = {
  label: string;
  icon: JSX.Element;
  handleClick: () => void;
};

export const ActionButton = ({
  label,
  icon,
  handleClick,
}: ActionButtonType) => {
  return (
    <IconButton
      onClick={handleClick}
      aria-label={label}
      sx={{ cursor: "pointer", margin: "0", padding: "0" }}
    >
      {icon}
    </IconButton>
  );
};
