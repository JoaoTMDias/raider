import * as Ariakit from "@ariakit/react";
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
  "data-testid": string;
}

function ToolbarButton({
  children,
  description,
  onClick,
  "data-testid": dataTestId,
}: ToolbarButtonProps) {
  return (
    <>
      <Ariakit.TooltipProvider placement="right" timeout={250}>
        <Ariakit.TooltipAnchor
          as={Ariakit.ToolbarItem}
          className={styles.toolbar__button}
          onClick={onClick}
          data-testid={dataTestId}
        >
          {children}
        </Ariakit.TooltipAnchor>

        <Ariakit.Tooltip  className={styles.toolbar__description}>
          {description}
        </Ariakit.Tooltip>
      </Ariakit.TooltipProvider>
    </>
  );
}

function ZoomToolbar({ onZoom, onCenter, onReset, onClear }: ZoomToolbarProps) {
  useKey("+", () => onZoom("in"));
  useKey("-", () => onZoom("in"));
  useKey("m", () => onCenter());
  useKey("r", () => onReset());
  useKey("c", () => onClear());

  return (
    <Ariakit.Toolbar orientation="vertical" focusLoop data-testid="chart-toolbar" className={styles.toolbar}>
      <ToolbarButton
        onClick={() => onZoom("in")}
        description="Zoom In (+)"
        data-testid="chart-toolbar-button-zoom-in"
      >
        <IconPlus />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => onZoom("out")}
        description="Zoom Out (-)"
        data-testid="chart-toolbar-button-zoom-out"
      >
        <IconMinus />
      </ToolbarButton>
      <Ariakit.ToolbarSeparator className="separator" />
      <ToolbarButton
        onClick={onCenter}
        description="Center layout (m)"
        data-testid="chart-toolbar-button-center"
      >
        <IconCenter />
      </ToolbarButton>
      <ToolbarButton
        onClick={onReset}
        description="Reset layout (r)"
        data-testid="chart-toolbar-button-reset"
      >
        <IconReset />
      </ToolbarButton>
      <ToolbarButton
        onClick={onClear}
        description="Clear layout (c)"
        data-testid="chart-toolbar-button-clear"
      >
        <IconClear />
      </ToolbarButton>
    </Ariakit.Toolbar>
  );
}

export default ZoomToolbar;
