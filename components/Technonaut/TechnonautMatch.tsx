import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { getIcebreakerQuestions } from "../../fetch/helpers";
import { useEffect, useState } from "react";

type TechnonautMatchProps = {
  matchData: {
    link: string;
    matchedWith: {
      notes: string;
      name: string;
    };
  };
  userNotes: string;
  eventDescription: string;
};

export const TechnonautMatch = ({
  matchData,
  userNotes,
  eventDescription,
}: TechnonautMatchProps) => {
  const { matchedWith, link } = matchData;
  const [icebreakers, setIcebreakers] = useState<any>([""]);

  const {
    mutate,
    data: questions,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async () =>
      await getIcebreakerQuestions(
        eventDescription,
        matchedWith.notes,
        userNotes
      ),
    onSuccess: (data) => {
      console.log("Icebreaker questions:", data);
      setIcebreakers(data);
    },
    onError: (error) => {
      console.error("Error fetching icebreaker questions:", error);
    },
  });

  const handleJoinMeeting = () => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    mutate();
  }, [mutate]);

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
          Here are some questions you can ask your fellow Technonaut:
        </Typography>
        {/* <Typography variant="body2">{icebreakers[0]}</Typography> */}
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
