import { GenericComponentProps, tuple } from '@jtmdias/js-utilities';
import { ReactNode } from 'react';

export const Variant = {
  Circle: 'circle',
  Round: 'round',
  Rectangle: 'rectangle',
} as const;

const VariantEnum = tuple(Variant.Circle, Variant.Round, Variant.Rectangle);

/**
 * Creates a union type from a tuple
 *
 * @example
 *
 * const IconPositionEnum = ["left" | "right"];
 *
 * type IconPosition = TupleToUnion<typeof IconPositionEnum> // "left" | "right"
 */
export type TupleToUnion<T extends [...unknown[]]> = T[number];

export type USkeletonVariant = TupleToUnion<typeof VariantEnum>;

interface BaseSkeletonProps extends Pick<GenericComponentProps, 'className' | 'data-testid'> {
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width?: string;
  /**
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element.
   */
  height?: string;
  /**
   * Optional children to infer width and height from.
   */
  children?: ReactNode;
  /**
   * The type of content that will be rendered.
   * @default Variant.Round
   */
  variant?: USkeletonVariant;

  /**
   * Adds a "pulsate" animation to the `Skeleton` component
   *
   * @default false
   */
  isAnimated?: boolean;
}

export type SkeletonProps = BaseSkeletonProps & {
  isAnimated?: boolean;
  hideBackground?: boolean;
  duration?: number;
  delay?: number;
  iterationCount?: 'infinite' | 'revert' | 'revert-layer' | 'inherit' | 'initial' | number;
};;
