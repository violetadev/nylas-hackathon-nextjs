import { NextApiRequest, NextApiResponse } from "next";
import { NylasGrantURI } from "../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NYLAS_API_KEY || "";
  const apiUri = `${NylasGrantURI}/calendars`;
 
  try {
    const response = await fetch(apiUri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const calendars = await response.json();

    res
      .status(200)
      .json(
        calendars.data.find((calendar) => calendar.id === process.env.GOOGLE_CALENDAR_ID)
      );
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}
