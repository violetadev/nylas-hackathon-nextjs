import { NextApiRequest, NextApiResponse } from "next";
import { NylasConfig, NylasGrantURI } from "../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiUri = `${NylasGrantURI}/contacts`;

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
      throw new Error(`Failed to get contacts: ${response.statusText}`);
    }

    const contact = await response.json();
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({ error: "Failed to get contacts" });
  }
}
