// moduleResolution:bundler requires a "types" condition in exports — this package lacks it
declare module "@jtmdias/react-a11y-tools" {
  import type { FunctionComponent, RefObject, ReactElement, ReactNode } from "react";

  export interface ISkipLink {
    target: string;
    text: string;
    as?: "link" | "button";
  }
  export interface ISkipLinksProps {
    items?: ISkipLink[];
  }
  export const SkipLinks: FunctionComponent<ISkipLinksProps>;

  export interface RoverProviderProps {
    children: ReactNode;
    direction?: "horizontal" | "vertical" | "both";
    options?: Record<string, unknown>;
  }
  export const RoverProvider: (props: RoverProviderProps) => ReactElement;

  export function useRover(
    domElementRef: RefObject<Element | null>,
    options?: boolean | Record<string, unknown>
  ): [number, boolean, (event: import("react").KeyboardEvent) => void, () => void, unknown];

  export function useFocus<T extends HTMLElement | SVGElement>(
    element: RefObject<T | null> | T,
    willFocus?: boolean,
    scrollWhenFocus?: boolean
  ): void;
}
