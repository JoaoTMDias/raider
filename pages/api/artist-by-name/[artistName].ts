import type { NextApiRequest, NextApiResponse } from 'next'
import { searchForArtistByName } from '@/services/spotify';
import { getSession } from 'next-auth/react';
import { SpotifyResponse, SpotifySearchResponse } from '@/typings/spotify';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionData = await getSession({ req });
  const sessionAccessToken = (sessionData as unknown as SpotifyResponse).token.accessToken;

  const response = await searchForArtistByName(req.query["artistName"] as string, sessionAccessToken);
  const { artists }: SpotifySearchResponse = await response.json();

  return res.status(200).json({ items: artists?.items });
};

export default handler;
