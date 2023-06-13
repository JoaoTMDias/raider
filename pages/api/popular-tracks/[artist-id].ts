import type { NextApiRequest, NextApiResponse } from 'next'
import { getPopularTracksByArtistId } from '@/services';
import { getSession } from 'next-auth/react';
import { SpotifyArtistTopTracks, SpotifyResponse, SpotifySearchResults } from '@/typings/spotify';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const sessionData = await getSession({ req });
  const sessionAccessToken = (sessionData as unknown as SpotifyResponse).token.accessToken;
  const artistId = req.query["artist-id"] as string;
  const response = await getPopularTracksByArtistId(artistId, sessionAccessToken);
  const tracksResponse: SpotifyArtistTopTracks = await response.json();

  return res.status(200).json(tracksResponse);
};

export default handler;
