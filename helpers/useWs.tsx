import { useEffect, useRef, useState } from "react";

export enum WebsocketStatus {
  CONNECTING = "CONNECTING",
  OPEN = "OPEN",
  CLOSING = "CLOSING",
  CLOSED = "CLOSED",
  INITIAL = "INITIAL",
}

export const useWs = ({ url }: { url: string }) => {
  const [status, setStatus] = useState<WebsocketStatus>(
    WebsocketStatus.INITIAL
  );
  const [val, setVal] = useState<any>(null);
  const [error, setError] = useState<null | boolean>(null);

  const ws = useRef<null | WebSocket>(null);

  const connect = () => {
    setError(null);

    setStatus(WebsocketStatus.CONNECTING);
    const socket = new WebSocket(url);

    socket.onopen = () => setStatus(WebsocketStatus.OPEN);
    socket.onclose = () => setStatus(WebsocketStatus.CLOSED);
    socket.onerror = () => setError(true);
    socket.onmessage = (event) => setVal(event.data);

    ws.current = socket;
  };

  const disconnect = () => {
    if (ws.current) {
      setStatus(WebsocketStatus.CLOSING);
      setError(null);
      ws.current.close();
    }
  };

  const sendMessage = (message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      throw new Error("Error connecting");
    }
  };

  return { status, val, error, connect, disconnect, sendMessage };
};
