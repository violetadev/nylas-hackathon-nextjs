import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const TechnonautMatch = ({ val }: any) => {
  const { matchedWith, link } = val;

  const handleJoinMeeting = () => {
    window.open(link, "_blank");
  };

  return (
    <Box
      sx={{
        minHeight: "40vh",
        display: "flex",
        alignItems: "center",
        flexFlow: "column",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ color: "white" }}>
          You will be meeting with {matchedWith?.name}
        </Typography>
        <Typography variant="body1">
          Something you should know about your fellow Technonaut:
        </Typography>
        <Typography variant="body2">{matchedWith?.notes}</Typography>
      </Box>
      <Button
        onClick={handleJoinMeeting}
        variant="outlined"
        sx={{ backgroundColor: "black", color: "white", margin: "24px" }}
        aria-label="Enter meeting"
      >
        Join your fellow Technonaut
      </Button>
    </Box>
  );
};
