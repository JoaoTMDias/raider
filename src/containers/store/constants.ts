import { SpotifyArtistItem } from "@/typings/spotify";
import { ChartNodes } from "./types";

export const INITIAL_ARTIST: SpotifyArtistItem = {
  external_urls: {
    spotify: "https://open.spotify.com/artist/5M52tdBnJaKSvOpJGz8mfZ",
  },
  followers: {
    href: null,
    total: 6991951,
  },
  genres: [
    "album rock",
    "alternative metal",
    "birmingham metal",
    "classic rock",
    "hard rock",
    "metal",
    "rock",
    "stoner rock",
    "uk doom metal",
  ],
  href: "https://api.spotify.com/v1/artists/5M52tdBnJaKSvOpJGz8mfZ",
  id: "5M52tdBnJaKSvOpJGz8mfZ",
  images: [
    {
      height: 1333,
      url: "https://i.scdn.co/image/5931700f9515dd6587230130beb615e0549e47dc",
      width: 1000,
    },
    {
      height: 853,
      url: "https://i.scdn.co/image/2af99dc3c8acbbe00d913526229def80e7f42e5f",
      width: 640,
    },
    {
      height: 267,
      url: "https://i.scdn.co/image/6f37a1025ba3f8e2dbb3b15cf30016ff728ba51d",
      width: 200,
    },
    {
      height: 85,
      url: "https://i.scdn.co/image/86bc6e056f0b843648071b1456dc8e31af1e019e",
      width: 64,
    },
  ],
  name: "Black Sabbath",
  popularity: 73,
  type: "artist",
  uri: "spotify:artist:5M52tdBnJaKSvOpJGz8mfZ",
};

export const INITIAL_NODES_STATE: ChartNodes = {
  node: INITIAL_ARTIST,
  relatedNodes: []
}
