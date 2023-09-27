function CircleTemplate() {
  return (
    <defs data-test="chart-circle-template">
      <circle id="artist-circle" r="16" vectorEffect="non-scaling-stroke" />
      <clipPath id="artist-circle-clip">
        <use xlinkHref="#artist-circle" />
      </clipPath>
    </defs>
  );
}

export default CircleTemplate;
