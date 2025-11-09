import type { NextApiRequest, NextApiResponse } from 'next'
import { getPopularTracksByArtistId } from '@/services';
import { getServerSession } from 'next-auth/next';
import { SpotifyArtistTopTracks } from '@/typings/spotify';
import { AUTH_OPTIONS } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = await getServerSession(req, res, AUTH_OPTIONS);

  if (!session || !(session as any).accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sessionAccessToken = (session as any).accessToken;
  const artistId = req.query["artist-id"] as string;

  try {
    const response = await getPopularTracksByArtistId(artistId, sessionAccessToken);
    const tracksResponse: SpotifyArtistTopTracks = await response.json();

    return res.status(200).json(tracksResponse);
  } catch (error) {
    console.error('Error fetching popular tracks:', error);
    return res.status(500).json({ error: 'Failed to fetch popular tracks' });
  }
};

export default handler;
