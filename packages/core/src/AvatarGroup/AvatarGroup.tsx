import { Children, cloneElement, forwardRef } from "react";
import { css } from "@emotion/css";
import { HvSize, theme } from "@hitachivantara/uikit-styles";

import { HvAvatar } from "../Avatar/Avatar";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";
import { staticClasses, useClasses } from "./AvatarGroup.styles";

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

/**
 * The AvatarGroup component is used to group multiple avatars.
 */
export const HvAvatarGroup = forwardRef<HTMLDivElement, HvAvatarGroupProps>(
  (props, ref) => {
    const {
      className,
      classes: classesProp,
      children,
      size = "sm",
      spacing = "loose",
      direction = "row",
      toBack = true,
      maxVisible = 3,
      overflowComponent,
      highlight = false,
      ...others
    } = useDefaultProps("HvAvatarGroup", props);
    const { classes, cx } = useClasses(classesProp);

    const spacingValue = getSpacingValue(spacing, size);

    const totalChildren = Children.count(children);
    const zIndexMultiplier = toBack ? -1 : 1;
    const willOverflow = totalChildren > maxVisible;

    return (
      <div
        className={cx(classes.root, classes[direction], className)}
        ref={ref}
        {...others}
      >
        {Children.map(children, (child: any, index: number) => {
          if (index < maxVisible) {
            return cloneElement(child, {
              classes: {
                container: css({
                  marginLeft:
                    direction === "row" ? (index !== 0 ? -spacingValue : 0) : 0,
                  marginTop:
                    direction === "column"
                      ? index !== 0
                        ? -spacingValue
                        : 0
                      : 0,
                }),
                root: css({
                  zIndex: 100 + index * zIndexMultiplier,
                  ...(highlight && {
                    "&:hover": {
                      zIndex: 100 + totalChildren + 1,
                    },
                  }),
                }),
              },
              size,
            });
          }
        })}
        {willOverflow && (
          <div
            style={{
              marginLeft: direction === "row" ? -spacingValue : 0,
              marginTop: direction === "column" ? -spacingValue : 0,
              zIndex: 100 + maxVisible * zIndexMultiplier,
            }}
          >
            {overflowComponent ? (
              overflowComponent(totalChildren - maxVisible)
            ) : (
              <HvAvatar
                size={size}
                backgroundColor={theme.colors.atmo4}
                classes={{
                  avatar: css({
                    [`&.HvAvatar-${size}`]: {
                      fontSize: "unset",
                    },
                  }),
                }}
              >
                +{totalChildren - maxVisible}
              </HvAvatar>
            )}
          </div>
        )}
      </div>
    );
  },
);
