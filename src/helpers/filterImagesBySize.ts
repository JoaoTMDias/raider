import { ArtistImage } from "@/typings/artist";

export const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZwogICAgICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICAgIHdpZHRoPSIyNCIKICAgICAgaGVpZ2h0PSIyNCIKICAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICAgPgogICAgICA8Y2lyY2xlIGZpbGw9IiMyYTJhMmEiIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgLz4KICAgIDwvc3ZnPg==";

const LASTFM_PLACEHOLDER_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

export function isPlaceholderImageUrl(url?: string): boolean {
  return typeof url === "string" && url.includes(LASTFM_PLACEHOLDER_HASH);
}

export function filterImagesBySize(images?: ArtistImage[]) {
  let result = FALLBACK_IMAGE;

  if (Array.isArray(images) && images.length >= 1) {
    const validImages = images.filter(
      (image) => image?.url && !isPlaceholderImageUrl(image.url)
    );

    if (!validImages.length) {
      return result;
    }

    const smallestSize = Math.min.apply(
      Math,
      validImages.map((image) => image.height || Number.MAX_SAFE_INTEGER)
    );

    result =
      validImages.find((image) => (image.height || Number.MAX_SAFE_INTEGER) === smallestSize)
        ?.url ?? FALLBACK_IMAGE;
  }

  return result;
}
