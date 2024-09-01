export const normalizeEventData = (eventData) => {
  const startDateTime = new Date(`${eventData.date}T${eventData.time}:00`);

  const startUnixTime = Math.floor(startDateTime.getTime() / 1000);

  const endDateTime = new Date(
    startDateTime.getTime() + eventData.duration * 60000
  );
  const endUnixTime = Math.floor(endDateTime.getTime() / 1000);

  const when = {
    start_time: startUnixTime,
    end_time: endUnixTime,
    time: startUnixTime,
  };

  return {
    title: eventData.eventTitle,
    participants: [],
    when,
    busy: true,
    description: eventData.eventDescription,
    location: "virtual"
  };
};