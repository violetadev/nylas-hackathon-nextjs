import { NextApiRequest, NextApiResponse } from "next";
import { NylasConfig, NylasGrantURI } from "../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const apiUri = `${NylasGrantURI}/events?calendar_id=${process.env.GOOGLE_CALENDAR_ID}`;

  if (req.method === "GET") {
    try {
      const response = await fetch(apiUri, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${NylasConfig.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get event: ${response.statusText}`);
      }

      const event = await response.json();
      res.status(200).json(event);
    } catch (error) {
      console.error("Error getting event:", error);
      res.status(500).json({ error: "Failed to get event" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
