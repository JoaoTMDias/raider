import type { NextApiRequest, NextApiResponse } from 'next'
import { getArtistDetails } from '@/services';
import { getSession } from 'next-auth/react';
import { SpotifyResponse } from '@/typings/spotify';
import { HTTP_STATUS_CODE } from '@jtmdias/js-utilities';
import { LastFMResponse } from '@/typings/last-fm';

async function handler(req: NextApiRequest, res: NextApiResponse<LastFMResponse>): Promise<void | NextApiResponse<LastFMResponse>> {
  const sessionData = await getSession({ req });
  const sessionAccessToken = (sessionData as unknown as SpotifyResponse).token.accessToken;

  if (sessionAccessToken) {
    const artistName = req.query["artist-name"] as string;
    const response = await getArtistDetails(artistName);

    return res.status(HTTP_STATUS_CODE.OK).json(response);
  }

  return res.status(HTTP_STATUS_CODE.FORBIDDEN);
};

export default handler;
