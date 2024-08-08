import { getColor, HvColorAny } from "@hitachivantara/uikit-styles";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvBaseProps } from "../types/generic";
import { ExtractNames, mergeStyles } from "../utils/classes";
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
  /**
   *  The border color at the top of the card. Must be one of palette semantic or atmosphere colors.
   *  To set another color, the borderTop should be override.
   */
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
export const HvCard = (props: HvCardProps) => {
  const {
    classes: classesProp,
    style,
    className,
    children,
    icon,
    selectable = false,
    selected = false,
    statusColor = "sema0",
    bgcolor,
    ...others
  } = useDefaultProps("HvCard", props);

  const { classes, cx } = useClasses(classesProp);

  const barColor =
    (statusColor !== "sema0" && statusColor) ||
    (selected && "secondary") ||
    "atmo4";

  return (
    <div
      style={mergeStyles(style, {
        "--bg-color": getColor(bgcolor),
        "--bar-height": `${selected ? 4 : 2}px`,
        "--bar-color": getColor(barColor),
      })}
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
};
