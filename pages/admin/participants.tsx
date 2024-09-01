import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { ParticipantCard } from "../../components/ParticipantCard";
import { useQuery } from "@tanstack/react-query";
import { fetchParticipants } from "../../fetch/helpers";
import { Loading } from "../../components/Loading";
import { AdminWrapper } from "../../components/AdminWrapper";

export default function Participants() {
  const {
    data: participants = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["participants"],
    queryFn: fetchParticipants,
    staleTime: 300000,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <AdminWrapper>
      <>
        <Typography variant="h1">Participants</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "14px",
          }}
        >
          <Typography variant="body1">
            Your all-time participants are listed here.
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "24px",
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat( auto-fill, minmax(250px, 1fr) )",
          }}
        >
          {participants?.map((participant) => (
            <ParticipantCard
              key={participant.id}
              displayName={`${participant.given_name} ${participant.surname}`}
              email={participant.emails?.length && participant.emails[0].email}
              notes={participant.notes}
            />
          ))}
        </Box>
      </>
    </AdminWrapper>
  );
}
