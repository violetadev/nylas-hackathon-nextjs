import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";

type BasicCardType = {
  title: string;
  subtitle: string;
  handleClick: () => void;
  icon: JSX.Element;
};

export const BasicCard = ({
  title,
  subtitle,
  icon,
  handleClick,
}: BasicCardType) => {
  return (
    <Card
      sx={{
        minWidth: "20vw",
        maxWidth: "20vw",
        paddingBottom: "12px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <CardContent
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexFlow: "row" }}>
          <IconButton
            size="large"
            sx={{ width: "45px", height: "45px", marginRight: "12px" }}
          >
            {icon}
          </IconButton>
          <div>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1">{subtitle}</Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};
