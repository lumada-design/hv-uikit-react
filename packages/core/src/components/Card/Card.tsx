import { theme } from "@hitachivantara/uikit-styles";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvBox } from "@core/components/Box";
import { ExtractNames } from "@core/utils/classes";
import { HvBaseProps } from "@core/types/generic";
import { HvAtmosphereColorKeys, HvSemanticColorKeys } from "@core/types/tokens";

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
  bgcolor?:
    | "sema0"
    | HvSemanticColorKeys
    | HvAtmosphereColorKeys
    | "transparent";
  /**
   *  The border color at the top of the card. Must be one of palette semantic or atmosphere colors.
   *  To set another color, the borderTop should be override.
   */
  statusColor?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
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
    className,
    children,
    icon,
    selectable = false,
    selected = false,
    statusColor = "sema0",
    bgcolor,
    ...others
  } = useDefaultProps("HvCard", props);

  const { classes, css, cx } = useClasses(classesProp);

  return (
    <HvBox
      className={cx(
        "HvIsCardGridElement",
        classes.root,
        css({
          backgroundColor: bgcolor && theme.colors[bgcolor],
        }),
        {
          [classes.selectable]: selectable,
          [classes.selected]: selected,
        },
        className
      )}
      {...others}
    >
      <div className={classes.semanticContainer}>
        <div
          className={cx(
            css({
              height: selected ? 4 : 2,
              backgroundColor:
                statusColor === "sema0"
                  ? selected
                    ? theme.colors.secondary
                    : theme.colors.atmo4
                  : theme.colors[statusColor],
            }),
            classes.semanticBar
          )}
        />
        <div className={classes.icon}>{icon}</div>
      </div>
      {children}
    </HvBox>
  );
};
