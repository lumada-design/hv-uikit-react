import { forwardRef } from "react";
import {
  mergeStyles,
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { getColor, HvColorAny } from "@hitachivantara/uikit-styles";

import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./Card.styles";

export { staticClasses as cardClasses };

export type HvCardClasses = ExtractNames<typeof useClasses>;

export interface HvCardProps extends HvBaseProps {
  /** The renderable content inside the icon slot of the header. */
  icon?: React.ReactNode;
  /** Whether the card is selectable. */
  selectable?: boolean;
  /** Whether the card is currently selected. */
  selected?: boolean;
  /** The background color of the card. */
  bgcolor?: "sema0" | HvColorAny;
  /** The border color at the top of the card. */
  statusColor?: "sema0" | HvColorAny;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvCardClasses;
}

/**
 * A card is a container for a few short and related pieces of content.
 * It roughly resembles a playing card in size and shape and is intended as a
 * linked short representation of a conceptual unit. For that reason,
 * this pattern must be used as an entry-point for further information.
 */
export const HvCard = forwardRef<
  // no-indent
  React.ComponentRef<"div">,
  HvCardProps
>(function HvCard(props, ref) {
  const {
    classes: classesProp,
    style,
    className,
    children,
    icon,
    selectable,
    selected,
    statusColor = "sema0",
    bgcolor,
    ...others
  } = useDefaultProps("HvCard", props);
  const { classes, cx } = useClasses(classesProp);

  const barColor =
    (statusColor !== "sema0" && statusColor) ||
    (selected && "text") ||
    undefined;

  return (
    <div
      ref={ref}
      style={mergeStyles(style, {
        "--bg-color": getColor(bgcolor),
        "--bar-height": selected && "4px",
        "--bar-color": getColor(barColor),
      })}
      data-color={statusColor}
      className={cx(
        "HvIsCardGridElement",
        classes.root,
        {
          [classes.selectable]: selectable,
          [classes.selected]: selected,
        },
        className,
      )}
      {...others}
    >
      <div className={classes.semanticContainer}>
        <div className={classes.semanticBar} />
        <div className={classes.icon}>{icon}</div>
      </div>
      {children}
    </div>
  );
});
