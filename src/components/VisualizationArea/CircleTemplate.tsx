function CircleTemplate() {
  return (
    <defs>
      <circle id="artist-circle" r="24" vectorEffect="non-scaling-stroke" />
      <clipPath id="artist-circle-clip">
        <use xlinkHref="#artist-circle" />
      </clipPath>
    </defs>
  );
}

export default CircleTemplate;
