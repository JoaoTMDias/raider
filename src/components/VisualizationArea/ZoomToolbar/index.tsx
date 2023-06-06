import { useToolbarState, Toolbar, ToolbarItem, ToolbarSeparator } from "ariakit/toolbar";
import styles from "../index.module.scss";

function ZoomToolbar({ onZoom, onCenter, onReset, onClear }: ZoomToolbarProps) {
  const toolbar = useToolbarState({
    orientation: "vertical",
    focusLoop: true,
  });

  return (
    <Toolbar state={toolbar} className={styles.toolbar}>
      <ToolbarItem className={styles.toolbar__button} onClick={() => onZoom("in")}>
        Zoom +
      </ToolbarItem>
      <ToolbarItem className={styles.toolbar__button} onClick={() => onZoom("out")}>
        Zoom -
      </ToolbarItem>
      <ToolbarSeparator className="separator" />
      <ToolbarItem className={styles.toolbar__button} onClick={onCenter}>
        Center
      </ToolbarItem>
      <ToolbarItem className={styles.toolbar__button} onClick={onReset}>
        Reset
      </ToolbarItem>
      <ToolbarItem className={styles.toolbar__button} onClick={onClear}>
        Clear
      </ToolbarItem>
    </Toolbar>
  );
}

export default ZoomToolbar;
