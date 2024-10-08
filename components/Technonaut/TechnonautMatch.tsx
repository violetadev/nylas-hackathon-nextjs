import { Button, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { getIcebreakerQuestions } from "../../fetch/helpers";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

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
      console.log(data[0].split(", "), data[0]);
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
        <Typography variant="body2">
          <List disablePadding sx={{ marginTop: "24px" }}>
            {icebreakers?.map((icebreaker: string, index: number) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "center",
                }}
              >
                <Chip label={icebreaker} variant="filled" />
              </ListItem>
            ))}
          </List>
        </Typography>
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
