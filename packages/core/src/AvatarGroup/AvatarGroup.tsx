import { Children, forwardRef } from "react";
import {
  mergeStyles,
  useCss,
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { HvSize, theme } from "@hitachivantara/uikit-styles";

import { HvAvatar } from "../Avatar/Avatar";
import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./AvatarGroup.styles";
import { HvAvatarGroupProvider } from "./AvatarGroupContext";

export { staticClasses as avatarGroupClasses };

export type HvAvatarGroupClasses = ExtractNames<typeof useClasses>;

export interface HvAvatarGroupProps extends HvBaseProps {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvAvatarGroupClasses;
  /** The avatar size. */
  size?: HvSize;
  /** The spacing between avatars. */
  spacing?: "compact" | "loose";
  /** The direction of the group. */
  direction?: "row" | "column";
  /** Whether the avatars display behind the previous avatar or on top. */
  toBack?: boolean;
  /**
   * The maximum number of visible avatars. If there are more avatars then the value of this property, an added avatar will
   * be added to the end of the list, indicating the number of hidden avatars.
   */
  maxVisible?: number;
  /**
   * What to show as an overflow representation.
   * If `undefined` a default `HvAvatar` will be displayed along with a HvTooltip with the count of overflowing items.
   * */
  overflowComponent?: (overflowCount: number) => React.ReactNode;
  /**
   * If `true` the avatars will be brought to the front when hovered.
   */
  highlight?: boolean;
}

const getSpacingValue = (
  spacing: HvAvatarGroupProps["spacing"],
  size: HvAvatarGroupProps["size"],
) => {
  switch (size) {
    case "xs":
      return spacing === "compact" ? 24 : 16;
    case "sm":
      return spacing === "compact" ? 30 : 18;
    case "md":
      return spacing === "compact" ? 36 : 20;
    case "lg":
      return spacing === "compact" ? 44 : 24;
    case "xl":
      return spacing === "compact" ? 72 : 34;
    default:
      return spacing === "compact" ? 30 : 18;
  }
};

const getFontSize = (size: HvAvatarGroupProps["size"]) => {
  switch (size) {
    case "xs":
      return "1em";
    case "sm":
      return "1.25em";
    case "md":
      return "1.5em";
    case "lg":
      return "1.75em";
    case "xl":
      return "3em";
    default:
      return "1em";
  }
};

interface OverflowProps {
  direction: HvAvatarGroupProps["direction"];
  childrenToShow: React.ReactNode[];
  spacingValue: number;
  overflowComponent?: (n: number) => React.ReactNode;
  totalChildren: number;
  maxVisible: number;
  size: HvAvatarGroupProps["size"];
}

const Overflow = ({
  direction,
  childrenToShow,
  spacingValue,
  overflowComponent,
  totalChildren,
  maxVisible,
  size,
}: OverflowProps) => {
  const { css } = useCss();

  return (
    <div
      style={{
        marginLeft:
          direction === "row" && childrenToShow.length > 0 ? -spacingValue : 0,
        marginTop:
          direction === "column" && childrenToShow.length > 0
            ? -spacingValue
            : 0,
        zIndex: 0,
      }}
    >
      {overflowComponent ? (
        overflowComponent(totalChildren - maxVisible)
      ) : (
        <HvAvatar
          size={size}
          backgroundColor={theme.colors.border}
          classes={{
            avatar: css({
              [`&.HvAvatar-${size}`]: {
                fontSize: getFontSize(size),
              },
            }),
          }}
        >
          +{totalChildren - maxVisible}
        </HvAvatar>
      )}
    </div>
  );
};

/**
 * The AvatarGroup component is used to group multiple avatars.
 */
export const HvAvatarGroup = forwardRef<HTMLDivElement, HvAvatarGroupProps>(
  function HvAvatarGroup(props, ref) {
    const {
      className,
      style,
      classes: classesProp,
      children,
      size = "sm",
      spacing = "loose",
      direction = "row",
      maxVisible = 3,
      overflowComponent,
      highlight = false,
      toBack = false,
      ...others
    } = useDefaultProps("HvAvatarGroup", props);
    const { classes, cx } = useClasses(classesProp);

    const spacingValue = getSpacingValue(spacing, size);

    const totalChildren = Children.count(children);
    const willOverflow = totalChildren > maxVisible;

    const childrenToShow = Children.toArray(children).slice(0, maxVisible);

    // Since the `HvAvatar` components are displayed in reverse order using `row-reverse`, we need to reverse the array.
    if (toBack) childrenToShow.reverse();

    return (
      <div
        className={cx(
          classes.root,
          classes[direction],
          {
            [classes.highlight]: highlight,
            [classes.toBack]: toBack,
          },
          className,
        )}
        style={mergeStyles(style, {
          "--spacing": `-${spacingValue}px`,
        })}
        ref={ref}
        {...others}
      >
        <HvAvatarGroupProvider size={size}>
          {toBack && willOverflow && (
            <Overflow
              childrenToShow={childrenToShow}
              direction={direction}
              maxVisible={maxVisible}
              overflowComponent={overflowComponent}
              size={size}
              spacingValue={spacingValue}
              totalChildren={totalChildren}
            />
          )}
          {childrenToShow}
          {!toBack && willOverflow && (
            <Overflow
              childrenToShow={childrenToShow}
              direction={direction}
              maxVisible={maxVisible}
              overflowComponent={overflowComponent}
              size={size}
              spacingValue={spacingValue}
              totalChildren={totalChildren}
            />
          )}
        </HvAvatarGroupProvider>
      </div>
    );
  },
);
