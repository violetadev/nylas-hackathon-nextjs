import { nylas } from "../constants";

const connector = nylas.connectors.create({
  requestBody: {
    name: "hackathon",
    provider: "google",
    settings: {
      clientId: process.env.GCP_CLIENT_ID || "",
      clientSecret: process.env.GCP_CLIENT_SECRET || "",
    },
    scope: [
      'openid',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/contacts',
    ],
  }
})   

export default connector;