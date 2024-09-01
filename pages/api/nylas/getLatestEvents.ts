import { getUnixTime, sub } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { NylasConfig, NylasGrantURI } from "../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
  const result = sub(new Date(), {
    weeks: 1,
  });

  const resultInUnix = getUnixTime(result);

  try {
    const apiUri = `${NylasGrantURI}/events?calendar_id=${process.env.GOOGLE_CALENDAR_ID}&limit=3&updated_after=${resultInUnix}`;

    if (req.method === "GET") {
      const response = await fetch(apiUri, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${NylasConfig.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();

      res.status(200).json(data.data);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
}
