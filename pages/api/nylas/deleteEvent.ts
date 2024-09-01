import { NextApiRequest, NextApiResponse } from "next";
import { NylasGrantURI } from "../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NYLAS_API_KEY || "";
  const apiUri = `${NylasGrantURI}/events/${req.query.eventId}?calendar_id=${process.env.GOOGLE_CALENDAR_ID}`;
   
  try {
    const response = await fetch(apiUri, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete event: ${response.statusText}`);
    }

    const event = await response.json();
    res.status(200).json(event);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
}
