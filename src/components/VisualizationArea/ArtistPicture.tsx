import styles from "./index.module.scss";

interface ArtistPictureProps {
  imageUrl?: string;
  width?: number;
  height?: number;
  onClick?: (event: React.MouseEvent<SVGImageElement, MouseEvent>) => void;
}

function ArtistPicture({
  imageUrl,
  width = 32,
  height = 32,
  onClick,
}: ArtistPictureProps): JSX.Element {
  return (
    <image
      className={styles.artist__image}
      xlinkHref={imageUrl}
      width={width}
      height={height}
      y={-height / 2}
      x={-width / 2}
      preserveAspectRatio="xMidYMid slice"
      onClick={onClick}
      clipPath="url(#artist-circle-clip)"
      data-test="chart-node-artist-picture"
    />
  );
}

ArtistPicture.defaultProps = {
  imageUrl: "https://i.scdn.co/image/ab67616d000048510795ffeb9f6951767b1e71f5",
};

export default ArtistPicture;
