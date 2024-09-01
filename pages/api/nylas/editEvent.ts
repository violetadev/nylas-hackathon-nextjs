import { NextApiRequest, NextApiResponse } from "next";
import { NylasConfig, NylasGrantURI } from "../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;

   const apiUri = `${NylasGrantURI}/events/${eventId}?calendar_id=${process.env.GOOGLE_CALENDAR_ID}`;

  if (req.method === "PUT") {
    const { title, participants, startTime, endTime, location } = req.body;

    try {
      const response = await fetch(apiUri, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${NylasConfig.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          participants,
          when: {
            start_time: startTime,
            end_time: endTime,
          },
          location,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update event: ${response.statusText}`);
      }

      const event = await response.json();
      res.status(200).json(event);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ error: "Failed to update event" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
