export const queueText = {
  notInQueue: {
    title: "The Ship Will Take Off Shortly",
    subtitle: "Join the Queue to be matched with another Technonaut.",
    status: "Not in queue",
    button: {
      text: "board now",
      disabled: false,
    },
  },
  inQueue: {
    title: "The Ship Will Take Off Shortly",
    subtitle: "Waiting to be matched with another Technonaut...",
    status: "Waiting in queue",
    button: {
      text: "in queue",
      disabled: true,
    },
  },
  joiningQueue: {
    title: "The Ship Will Take Off Shortly",
    subtitle: "Waiting to be matched with another Technonaut...",
    status: "Joining the queue",
    button: {
      text: "joining queue...",
      disabled: true,
    },
  },
  matched: {
    title: "You are on a Mission!",
    subtitle: "You have been matched with a fellow Technonaut",
    status: "Matched",
    button: {
      text: "matched",
      disabled: true,
    },
  },
  offline: {
    title: "The Ship Is Not Here Yet",
    subtitle: "Come Back Later",
    status: "No ship available",
    button: {
      text: "nothing here",
      disabled: true,
    },
  },
};

export enum QueueStatus {
  ERROR = "error", // ws gives error
  MATCHED = "matched", // matched
  READY = "ready", // ws is ready and events are happening
  OFFLINE = "offline", // ws is offline or there are no events available
  OPEN = "open", // the WS is connected
  WAITING = "waiting", // waiting for a 2nd person to join or be matched to
}

export const propsByStatus = {
  [QueueStatus.ERROR]: queueText.offline,
  [QueueStatus.MATCHED]: queueText.matched,
  [QueueStatus.OFFLINE]: queueText.offline,
  [QueueStatus.OPEN]: queueText.notInQueue,
  [QueueStatus.WAITING]: queueText.inQueue,
  [QueueStatus.READY]: queueText.notInQueue,
};
