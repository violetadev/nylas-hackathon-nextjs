import type { NextApiRequest, NextApiResponse } from "next";
import { nylas } from "./constants";

export default async function createConnector(req: NextApiRequest, res: NextApiResponse) {
  try { 
     const connector = await nylas.connectors.create({
      requestBody: {
        name: "Your App Connector",
        provider: "google",
        settings: {
          clientId: process.env.GOOGLE_CLIENT_ID || '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        scope: [
          "openid",
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/gmail.modify",
          "https://www.googleapis.com/auth/calendar",
          "https://www.googleapis.com/auth/contacts",
        ],
      },
    });

    res.status(200).json(connector);
  } catch (error) {
    console.error("Error creating connector:", error);
    res.status(500).json({ error: "Failed to create connector" });
  }
}