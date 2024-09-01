import { NextApiRequest, NextApiResponse } from 'next';
import { NylasConfig } from '../constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUri = `${NylasConfig.apiUri}/applications`

  try {
    const response = await fetch(apiUri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${NylasConfig.apiKey}`,  // Using the API key for authorization
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const account = await response.json(); 

    res.status(200).json(account.data?.branding?.name || "friend");
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
