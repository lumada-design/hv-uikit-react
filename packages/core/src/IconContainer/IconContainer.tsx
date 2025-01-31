import { forwardRef } from "react";
import {
  createClasses,
  ExtractNames,
  mergeStyles,
  useDefaultProps,
} from "@hitachivantara/uikit-react-utils";
import { getColor, HvColorAny, HvSize } from "@hitachivantara/uikit-styles";

type HvIconSize = "XS" | "S" | "M" | "L";

// keep this aligned with `icon`'s package
// TODO: dedupe
export const { staticClasses, useClasses } = createClasses("HvIconContainer", {
  root: {
    display: "inline-flex",
    flex: "0 0 auto", // ensure icon doesn't flex grow/shrink
    fontSize: `var(--ifsize, 16px)`, // default size of 16px
    transition: "rotate 0.2s ease",
    justifyContent: "center",
    alignItems: "center",
    padding: 8, // default padding
  },
  xs: {
    fontSize: 12, //16,
    padding: 10,
  },
  sm: {
    fontSize: 16, //20,
  },
  md: {
    fontSize: 32, //26,
  },
  lg: {
    fontSize: 96, //36,
  },
  xl: {
    fontSize: 112, //48,
  },
  customSize: {
    padding: 0, // 🤔
  },
});

export { staticClasses as iconContainerClasses };

export type HvIconContainerClasses = ExtractNames<typeof useClasses>;

export interface HvIconContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  classes?: HvIconContainerClasses;
  /**
   * A color to override the default icon colors.
   * Accepts any valid CSS color or color from the UI Kit palette.
   * @example "brand"
   */
  color?: HvColorAny;
  /**
   * The size of the icon container. Takes in a `number` in pixels or any `HvSize` or `IconSize`.
   *
   * This will also affect the size of the icon by changing the `font-size`.
   *
   * @example
   * size={16} // 32px container 16px svg
   * size="S" // 32px container 16px svg
   * size="sm" // 32px container 16px svg
   * size="md" // 48px container 32px svg
   *
   * @default "S"
   */
  size?: HvSize | HvIconSize | number;
  /** Whether to rotate the icon @private WIP */
  rotate?: boolean;
}
/**
 * The `HvIconContainer` component wraps a `HvTooltip` with a label around a `HvButton` with only an icon as its content.
 * As defined by Design System, a tooltip with the button’s label should always be displayed when hovering an icon only button.
 * This component provides this behavior out of the box.
 */
export const HvIconContainer = forwardRef<
  // no-indent
  HTMLDivElement,
  HvIconContainerProps
>(function HvIconContainer(props, ref) {
  const {
    className,
    classes: classesProp,
    style,
    color,
    size: sizeProp = "S",
    rotate,
    children,
    ...others
  } = useDefaultProps("HvIconContainer", props);
  const { cx, classes } = useClasses(classesProp);

  const size = mapSizes(sizeProp);

  return (
    <div
      ref={ref}
      className={cx(classes.root, className, {
        [classes[size!]]: size,
        [classes.customSize]: typeof size === "number",
      })}
      style={mergeStyles(style, {
        color: getColor(color),
        rotate: rotate ? "180deg" : undefined,
        ...style,
      })}
      {...others}
    >
      {children}
    </div>
  );
});

function mapSizes(size: HvSize | HvIconSize | number) {
  if (typeof size === "number") return undefined;
  const iconSizeMap: Record<HvIconSize, HvSize> = {
    XS: "xs",
    S: "sm",
    M: "md",
    L: "lg",
  };
  return iconSizeMap[size as HvIconSize] || size;
}
