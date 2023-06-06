interface ZoomToolbarProps {
  onZoom: (type: "in" | "out") => void;
  onCenter: VoidFunction;
  onClear: VoidFunction;
  onReset: VoidFunction;
}
