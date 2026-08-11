import type { NextApiRequest, NextApiResponse } from 'next'
import { getArtistTopTracks } from '@/services';
import { enrichTrackWithDeezerCover } from '@/services/deezer';
import { LastFMTopTrack } from '@/typings/last-fm';
import { ArtistTopTracks, ArtistTrack } from '@/typings/artist';
import { isPlaceholderImageUrl } from '@/helpers';

function toTrackItem(track: LastFMTopTrack, index: number, artistName: string) {
  return {
    id: track.mbid || `${encodeURIComponent(artistName.toLowerCase())}-${index}`,
    name: track.name,
    href: track.url,
    preview_url: undefined,
    is_playable: false,
    album: {
      images: (track.image ?? [])
        .filter((image) => !!image["#text"] && !isPlaceholderImageUrl(image["#text"]))
        .map((image) => ({
          url: image["#text"],
          height: 64,
          width: 64,
        })),
    },
  };
}

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const artistId = req.query["artist-id"] as string;
  const artistName = decodeURIComponent(artistId);

  try {
    const response = await getArtistTopTracks(artistName, 10);
    const topTracks = response.toptracks?.track;
    const tracks = Array.isArray(topTracks) ? topTracks : topTracks ? [topTracks] : [];
    const mappedTracks = tracks
      .filter((track) => !!track.name)
      .map((track, index) => toTrackItem(track, index, artistName));
    const enrichedTracks: ArtistTrack[] = await Promise.all(
      mappedTracks.map((track) => enrichTrackWithDeezerCover(track, artistName))
    );

    const tracksResponse: ArtistTopTracks = {
      tracks: enrichedTracks,
    };

    return res.status(200).json(tracksResponse);
  } catch (error) {
    console.error('Error fetching popular tracks:', error);
    return res.status(500).json({ error: 'Failed to fetch popular tracks' });
  }
};

export default handler;
