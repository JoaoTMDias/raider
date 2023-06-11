import type { NextApiRequest, NextApiResponse } from 'next'
import { getRelatedArtistsById } from '@/services';
import { getSession } from 'next-auth/react';
import { SpotifyArtistItem, SpotifyResponse, SpotifySearchResponse, SpotifySearchResults } from '@/typings/spotify';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const sessionData = await getSession({ req });
  const sessionAccessToken = (sessionData as unknown as SpotifyResponse).token.accessToken;
  const artistId = req.query["artist-id"] as string;
  const response = await getRelatedArtistsById(artistId, sessionAccessToken);

  const { artists }: SpotifySearchResponse = await response.json();

  const result: SpotifySearchResults = {
    items: artists as SpotifyArtistItem[] ?? [],
  };

  return res.status(200).json(result);
};

export default handler;
