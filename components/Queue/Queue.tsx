import { useEffect, useState } from "react";
import { useWs, WebsocketStatus } from "../../helpers/useWs";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { propsByStatus, QueueStatus, queueText } from "./constants";
import { useLocalStorage } from "react-use";
import { Loading } from "../Loading";
import { TechnonautMatch } from "../Technonaut";
import { fetchEventsByMonth } from "../../fetch/helpers";
import dayjs from "dayjs";

export const Queue = () => {
  const [storedUser, setStoredUser] = useLocalStorage<any>("user", null);
  const [content, setContent] = useState<any>(null);
  const [eventsAvailable, setEventsAvailable] = useState(false);
  const [queueStatus, setQueueStatus] = useState<QueueStatus>(
    QueueStatus.READY
  );
  const { status, val, connect, error, disconnect, sendMessage } = useWs({
    url: process.env.NEXT_PUBLIC_WEBSOCKETS_SERVER || "",
  });

  const checkForCurrentEvents = async () => {
    try {
      const events = await fetchEventsByMonth(
        dayjs(new Date()).format("YYYY-MM")
      );

      if (!events) {
        return false;
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const ongoingEvents = events.filter((event: any) => {
        const start = event.when.start_time;
        const end = event.when.end_time;
        return currentTimestamp >= start && currentTimestamp <= end;
      });

      return ongoingEvents.length > 0;
    } catch (e) {
      setQueueStatus(QueueStatus.ERROR);
      return false;
    }
  };

  const handleJoinWaitlist = async () => {
    const hasEvents = await checkForCurrentEvents();
    setEventsAvailable(hasEvents);

    if (!hasEvents) {
      setQueueStatus(QueueStatus.OFFLINE);
      return;
    }

    if (
      status === WebsocketStatus.INITIAL &&
      queueStatus === QueueStatus.READY
    ) {
      connect();
      setQueueStatus(QueueStatus.OPEN);
    }
  };

  useEffect(() => {
    setContent(propsByStatus[queueStatus]);
  }, [queueStatus]);

  useEffect(() => {
    if (status === WebsocketStatus.OPEN && queueStatus === QueueStatus.OPEN) {
      setQueueStatus(QueueStatus.WAITING);
      const message = {
        email: storedUser?.email,
        name: `${storedUser?.givenName} ${storedUser?.surname}`,
        notes: storedUser?.notes,
      };
      sendMessage(JSON.stringify(message));
    }
  }, [status, sendMessage, queueStatus, storedUser]);

  useEffect(() => {
    if (queueStatus === QueueStatus.WAITING && val?.includes("link")) {
      setQueueStatus(QueueStatus.MATCHED);
      disconnect();
    }

    if (
      queueStatus === QueueStatus.WAITING &&
      val &&
      JSON.parse(val).error === true
    ) {
      setQueueStatus(QueueStatus.ERROR);
      disconnect();
    }
  }, [queueStatus, val]);

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
      {!content ? (
        <Loading />
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", flexFlow: "column" }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "60pt", color: "white", marginBottom: "24px" }}
          >
            {error ? queueText.offline.title : content.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "48px", color: "#ffffff79" }}
          >
            {content.subtitle}
          </Typography>
          {!val?.includes("link") && (
            <Button
              id="joinQueueButton"
              onClick={handleJoinWaitlist}
              variant="contained"
              sx={{
                margin: "24px",
                fontWeight: "800",
                maxWidth: "200px",
                alignSelf: "center",
              }}
              aria-label={content.button.text}
              disabled={content.button.disabled}
            >
              {content.button.text}
              {val?.includes("Matched")}
            </Button>
          )}
          {val && <TechnonautMatch val={JSON.parse(val)} />}
          <Typography variant="body2" sx={{ color: "#ffffff5f" }}>
            {!eventsAvailable || error
              ? "The ship is not ready, come back later"
              : `Status: ${content.status} `}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
