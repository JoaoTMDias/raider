import type { NextApiRequest, NextApiResponse } from 'next'
import { getArtistDetails } from '@/services';
import { getServerSession } from 'next-auth/next';
import { HTTP_STATUS_CODE } from '@jtmdias/js-utilities';
import { LastFMResponse } from '@/typings/last-fm';
import { AUTH_OPTIONS } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse<LastFMResponse>): Promise<void | NextApiResponse<LastFMResponse>> {
  const session = await getServerSession(req, res, AUTH_OPTIONS);

  if (!session || !(session as any).accessToken) {
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({ error: 'Unauthorized' } as any);
  }

  const sessionAccessToken = (session as any).accessToken;

  try {
    const artistName = req.query["artist-name"] as string;
    const response = await getArtistDetails(artistName);

    return res.status(HTTP_STATUS_CODE.OK).json(response);
  } catch (error) {
    console.error('Error fetching artist details:', error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch artist details' } as any);
  }
};

export default handler;
