import { parseISO, startOfMonth, endOfMonth } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { NylasConfig, NylasGrantURI } from "../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {  date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "date is required" });
  }

  try {
    const startDate = startOfMonth(parseISO(`${date}-01`));
    const endDate = endOfMonth(parseISO(`${date}-01`));

    const startEpoch = Math.floor(startDate.getTime() / 1000);
    const endEpoch = Math.floor(endDate.getTime() / 1000);

    const apiUri = `${NylasGrantURI}/events?calendar_id=${process.env.GOOGLE_CALENDAR_ID}&start=${startEpoch}&end=${endEpoch}`;

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
