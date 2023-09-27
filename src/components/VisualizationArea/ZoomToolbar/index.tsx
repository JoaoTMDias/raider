import { useToolbarState, Toolbar, ToolbarItem, ToolbarSeparator } from "ariakit/toolbar";
import { useTooltipState, TooltipAnchor, Tooltip } from "ariakit/tooltip";
import styles from "./index.module.scss";
import { IconCenter } from "./icon-center";
import { IconReset } from "./icon-reset";
import { IconClear } from "./icon-clear";
import { IconPlus } from "./icon-plus";
import { IconMinus } from "./icon-minus";
import { HTMLProps } from "react";
import { useKey } from "react-use";

interface ToolbarButtonProps extends HTMLProps<HTMLElement> {
  children: React.ReactNode;
  description: string;
}

function ToolbarButton({ children, description, onClick }: ToolbarButtonProps) {
  const tooltip = useTooltipState({
    placement: "right",
    timeout: 250,
  });
  return (
    <>
      <TooltipAnchor
        as={ToolbarItem}
        className={styles.toolbar__button}
        state={tooltip}
        onClick={onClick}
      >
        {children}
      </TooltipAnchor>

      <Tooltip state={tooltip} className={styles.toolbar__description}>
        {description}
      </Tooltip>
    </>
  );
}

function ZoomToolbar({ onZoom, onCenter, onReset, onClear }: ZoomToolbarProps) {
  const toolbar = useToolbarState({
    orientation: "vertical",
    focusLoop: true,
  });

  useKey("+", () => onZoom("in"));
  useKey("-", () => onZoom("in"));
  useKey("m", () => onCenter());
  useKey("r", () => onReset());
  useKey("c", () => onClear());

  return (
    <Toolbar state={toolbar} className={styles.toolbar}>
      <ToolbarButton onClick={() => onZoom("in")} description="Zoom In (+)">
        <IconPlus />
      </ToolbarButton>
      <ToolbarButton onClick={() => onZoom("out")} description="Zoom Out (-)">
        <IconMinus />
      </ToolbarButton>
      <ToolbarSeparator className="separator" />
      <ToolbarButton onClick={onCenter} description="Center layout (m)">
        <IconCenter />
      </ToolbarButton>
      <ToolbarButton onClick={onReset} description="Reset layout (r)">
        <IconReset />
      </ToolbarButton>
      <ToolbarButton onClick={onClear} description="Clear layout (c)">
        <IconClear />
      </ToolbarButton>
    </Toolbar>
  );
}

export default ZoomToolbar;
