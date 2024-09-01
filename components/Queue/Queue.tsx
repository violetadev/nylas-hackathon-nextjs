import { useEffect, useState } from "react";
import { useWs, WebsocketStatus } from "../../helpers/useWs";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { propsByStatus, QueueStatus, queueText } from "./constants";
import { useLocalStorage } from "react-use";
import { Loading } from "../Loading";
import { TechnonautMatch } from "../Technonaut";

export const Queue = () => {
  const [storedUser, setStoredUser] = useLocalStorage<any>("user", null);
  const [content, setContent] = useState<any>(null);
  const [queueStatus, setQueueStatus] = useState<QueueStatus>(
    QueueStatus.READY
  );
  const { status, val, connect, disconnect, sendMessage } = useWs({
    url: "ws://localhost:3000",
  });

  const handleJoinWaitlist = () => {
    if (
      status === WebsocketStatus.INITIAL &&
      queueStatus === QueueStatus.READY
    ) {
      console.log("in");
      connect();
      setQueueStatus(QueueStatus.OPEN);
    }
  };

  useEffect(() => {
    setContent(propsByStatus[queueStatus]);
  }, [queueStatus]);

  useEffect(() => {
    val && console.log(val, "val");
  }, [val]);

  useEffect(() => {
    if (status === WebsocketStatus.OPEN && queueStatus === QueueStatus.OPEN) {
      console.log("going in the queue", val);
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
        <>
          <Typography variant="h1" sx={{ fontSize: "60pt", color: "white" }}>
            {content.title}
          </Typography>
          <Typography variant="body1">{content.subtitle}</Typography>
          {!val?.includes("link") && (
            <Button
              id="joinQueueButton"
              onClick={handleJoinWaitlist}
              variant="contained"
              sx={{ backgroundColor: "white", color: "black", margin: "24px" }}
              aria-label={content.button.text}
              disabled={content.button.disabled}
            >
              {content.button.text}
              {val?.includes("Matched")}
            </Button>
          )}
          {val && <TechnonautMatch val={JSON.parse(val)} />}
          <p id="status">Status: {content.status}</p>
        </>
      )}
    </Box>
  );
};
