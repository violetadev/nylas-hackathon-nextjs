import  Nylas from "nylas";

export const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY || "",
  apiUri: process.env.NYLAS_API_URI
}

export const nylas = new Nylas(NylasConfig);

export const NylasGrantURI = `${NylasConfig.apiUri}/grants/${process.env.NYLAS_GRANT_ID}`;
