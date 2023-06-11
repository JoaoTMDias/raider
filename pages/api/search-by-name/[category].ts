import type { NextApiRequest, NextApiResponse } from 'next'
import { searchSpotifyByName } from '@/services';
import { getSession } from 'next-auth/react';
import { SpotifyArtistItem, SpotifyResponse, SpotifySearchResponse, SpotifySearchResults } from '@/typings/spotify';
import { Category } from '@/components/SearchField/types';
import { SPOTIFY_GENRES } from '@/data';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const sessionData = await getSession({ req });
  const sessionAccessToken = (sessionData as unknown as SpotifyResponse).token.accessToken;
  const category = req.query["type"] as Category;

  let result: SpotifySearchResults = {
    items: []
  }

  switch (category) {
    case "artist":
      const response = await searchSpotifyByName(req.query["category"] as string, sessionAccessToken);

      const { artists }: SpotifySearchResponse = await response.json();

      result = {
        items: artists?.items as SpotifyArtistItem[]
      };
      break;

    case "genre":
      result = {
        items: SPOTIFY_GENRES
      }
      break;

    default:
      break;
  }

  return res.status(200).json(result);
};

export default handler;
