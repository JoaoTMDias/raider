import { SpotifyArtistImage } from "@/typings/spotify";

export const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZwogICAgICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICAgIHdpZHRoPSIyNCIKICAgICAgaGVpZ2h0PSIyNCIKICAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICAgPgogICAgICA8Y2lyY2xlIGZpbGw9IiMyYTJhMmEiIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgLz4KICAgIDwvc3ZnPg==";

export function filterImagesBySize(images?: SpotifyArtistImage[]) {
  let result = FALLBACK_IMAGE;

  if (Array.isArray(images) && images.length >= 1) {
    const smallestSize = Math.min.apply(
      Math,
      images.map((image) => image.height!)
    );

    result = images.filter((image) => image.height! === smallestSize)[0].url ?? FALLBACK_IMAGE;
  }

  return result;
}
