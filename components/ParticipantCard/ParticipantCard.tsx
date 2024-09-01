import { Box, Card, Typography } from "@mui/material";
import { ActionButton } from "../ActionButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomTypography } from "../CustomTypography";
import {
  TypographySubtitleCustomCss,
  TypographyTitleCustomCss,
} from "../CustomTypography/Customizations";

type ParticipantCardProps = {
  displayName: string;
  email: string;
  notes: string;
};

export const ParticipantCard = ({
  displayName,
  email,
  notes,
}: ParticipantCardProps) => {
  return (
    <Card sx={{ maxWidth: "300px", margin: "4px", padding: "12px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "8px 0",
        }}
      >
        <div>
          <Typography variant="h4">{displayName}</Typography>
          <Typography variant="body2">{email}</Typography>
        </div>
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ActionButton
            label={"Delete"}
            icon={<DeleteIcon />}
            handleClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <ActionButton
            label={"Edit"}
            icon={<EditIcon />}
            handleClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Box> */}
      </Box>
      <div>
        <Box sx={{ margin: "8px 0" }}>
          <CustomTypography
            text="Notes"
            variant="body1"
            additionalCSS={TypographySubtitleCustomCss}
          />
          <CustomTypography
            text={notes || "No notes available."}
            variant="body2"
            additionalCSS={TypographyTitleCustomCss}
          />
        </Box>
      </div>
    </Card>
  );
};
