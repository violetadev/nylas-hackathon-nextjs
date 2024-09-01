import { Participant } from "../interfaces";

export const fetchCalendarData = async () => {
  const response = await fetch("/api/nylas/getCalendar");
  if (!response.ok) {
    throw new Error("Failed to fetch calendar data");
  }
  return response.json();
};

export const fetchUserData = async () => {
  const response = await fetch("/api/nylas/user");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

export const fetchEventsData = async () => {
  const response = await fetch(`/api/nylas/getEvents`, {});
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const fetchNewestCreatedEventsData = async () => {
  const response = await fetch(`/api/nylas/getLatestEvents`, {});
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const fetchEventsByMonth = async (date: string) => {
  const response = await fetch(`/api/nylas/getEventsByDate?date=${date}`);
  const data = await response.json();

  return data;
};

export const postEventsData = async (body: any): Promise<any> => {
  const { title, description, participants, when } = body;
  const response = await fetch(`/api/nylas/addEvent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      participants,
      when: {
        ...when,
        time: when.startTime,
      },
      description: description,
      location: "virtual",
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const deleteEvent = async (eventId: string) => {
  const response = await fetch(`/api/nylas/deleteEvent?eventId=${eventId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};

export const editEvent = async (eventId: string) => {
  const response = await fetch(`/api/nylas/editEvent?eventId=${eventId}`, {});
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};

export const fetchParticipants = async (): Promise<any[]> => {
  const response = await fetch("/api/nylas/getContacts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`
    );
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return data?.data || [];
  } else {
    const text = await response.text();
    throw new Error(`Unexpected response format: ${text}`);
  }
};

export const createContact = async ({ givenName, surname, email, notes }) => {
  const response = await fetch("/api/nylas/addContact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      given_name: givenName,
      surname,
      emails: [{ email, type: "work" }],
      notes,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create contact");
  }

  return response.json();
};
