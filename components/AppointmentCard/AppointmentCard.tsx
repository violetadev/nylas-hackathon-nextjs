import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { AppointmentCardActions } from "./AppointmentCardActions";
import { Action } from "./types";
import { AppointmentCardInfo } from "./AppointmentCardInfo";
import { Box } from "@mui/system";
import { CustomTypography } from "../CustomTypography";
import {
  TypographySubtitleCustomCss,
  TypographyTitleCustomCss,
} from "../CustomTypography/Customizations";
import { TruncatedText } from "../TruncatedText";
import theme from "../../styles";
import { useRouter } from "next/router";

type BasicCardType = {
  description?: string;
  date: string;
  title?: string;
  actions?: Action[];
};

export const AppointmentCard = ({
  description,
  date,
  title,
  actions,
}: BasicCardType) => {
  const router = useRouter();

  const descriptionText = description || "New Event";
  return (
    <Card
      sx={{ minWidth: "100%" }}
      role="region"
      aria-labelledby="appointment-card-title"
      aria-describedby="appointment-card-description"
    >
      <CardContent
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <CustomTypography
            text="About"
            variant="body1"
            additionalCSS={TypographySubtitleCustomCss}
          />
          <TruncatedText
            text={descriptionText}
            maxWidth="120px"
            component={
              <CustomTypography
                text={descriptionText}
                variant="body2"
                additionalCSS={{
                  ...TypographyTitleCustomCss,
                  fontSize: "14px",
                  color: !description
                    ? theme.palette.primary.main
                    : TypographyTitleCustomCss.color,
                }}
              />
            }
          />
        </div>
        <Box
          sx={{
            display: "flex",
            flexFlow: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <AppointmentCardInfo title={title} date={date} />
          {router.pathname === "/admin/events" &&
            actions &&
            actions.length > 0 && <AppointmentCardActions actions={actions} />}
        </Box>
      </CardContent>
    </Card>
  );
};
