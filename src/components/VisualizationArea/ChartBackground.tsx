interface Props {
  width: number;
  height: number;
}

function ChartBackground({ width, height }: Props): JSX.Element {
  return (
    <rect
      width={width}
      height={height}
      rx={12}
      fill="var(--raider-main-background-color, #121212)"
    />
  );
}

export default ChartBackground;
