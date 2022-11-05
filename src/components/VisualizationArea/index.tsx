import { useSharedChosenResults } from "@/containers";

function VisualizationArea() {
  const { items } = useSharedChosenResults();

  console.log(items);

  return items ? (
    <pre>
      <strong>props</strong> = {JSON.stringify(items, null, 2)}
    </pre>
  ) : null;
}

export default VisualizationArea;
