import { forwardRef } from "react";
import { AnimatedSkeletonProps, SkeletonProps, Variant } from "./Skeleton.types";
import styles from "./index.module.scss";
import { toggleDataAttribute } from "@jtmdias/js-utilities";

/**
 * Skeleton Loaders are created to give the user an idea of what type of content is being loaded in each block, such as images and texts.
 *
 * There are three ways to use it:<br>
 * 1 - Based on other component dimensions;<br>
 * 2 - Based on text font sizes (Default);<br>
 * 3 - With custom dimensions;<br>
 *
 * @example 1
 *
 * import Skeleton from "@storm/uikit-skeleton";
 * import Avatar from "@storm/uikit-avatar";
 * ...
 * return (
 *  <Skeleton>
 *    <Avatar />
 *  </Skeleton>
 * );
 *
 * @example 2
 *
 * import Skeleton from "@storm/uikit-skeleton";
 * ...
 * return (
 *  <h1>
 *    <Skeleton />
 *  </h1>
 * );
 *
 * @example 3
 *
 * import Skeleton from "@storm/uikit-skeleton";
 * ...
 * return (
 *   <Skeleton width="200px" height="150px" />
 * );
 */
const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    {
      children,
      variant = Variant.Round,
      height,
      width,
      isAnimated = true,
      hideBackground = false,
      "data-testid": dataTest = "skeleton",
      ...props
    },
    ref
  ) => {
    let STYLES_OVERRIDE = {
      "--skeleton-width": width,
      "--skeleton-height": height,
    } as React.CSSProperties;

    if (isAnimated) {
      const { duration, delay, iterationCount } = props as AnimatedSkeletonProps;

      STYLES_OVERRIDE = {
        ...STYLES_OVERRIDE,
        "--skeleton-animation-duration": duration,
        "--skeleton-animation-delay": delay,
        "--skeleton-animation-iteration-count": iterationCount,
      } as React.CSSProperties;
    }
    return (
      <span
        ref={ref}
        className={styles.skeleton}
        data-variant={variant}
        data-has-width={toggleDataAttribute(!!width)}
        data-is-animated={toggleDataAttribute(isAnimated)}
        data-hide-background={toggleDataAttribute(hideBackground)}
        data-test={dataTest}
        style={STYLES_OVERRIDE}
      >
        {children}
      </span>
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
