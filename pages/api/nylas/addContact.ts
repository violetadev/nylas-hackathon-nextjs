import { NextApiRequest, NextApiResponse } from "next";
import { NylasGrantURI } from "../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NYLAS_API_KEY || "";
  const apiUri = `${NylasGrantURI}/contacts`;

  const { given_name, emails, surname, notes } = req.body;

  try {
    const response = await fetch(apiUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        given_name,
        emails,
        surname,
        notes,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create contact: ${response.statusText}`);
    }

    const contact = await response.json();
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
}
