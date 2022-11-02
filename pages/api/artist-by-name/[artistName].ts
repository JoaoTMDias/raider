import type { NextApiRequest, NextApiResponse } from 'next'
import { searchForArtistByName } from '@/services/spotify';
import { getSession } from 'next-auth/react';
import { SpotifyResponse, SpotifySearchResponse, SpotifySearchResults } from '@/typings/spotify';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const sessionData = await getSession({ req });
  const sessionAccessToken = (sessionData as unknown as SpotifyResponse).token.accessToken;

  const response = await searchForArtistByName(req.query["artistName"] as string, sessionAccessToken);
  const { artists }: SpotifySearchResponse = await response.json();
  const result: SpotifySearchResults = {
    items: artists?.items ?? []
  };

  return res.status(200).json(result);
};

export default handler;
