import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";
import clsx from "clsx";
import { HvBox } from "components";
import { HvBaseProps } from "../../types";
import { HvAtmosphereColorKeys, HvSemanticColorKeys } from "../../types/tokens";
import { styles } from "./Card.styles";
import cardClasses, { HvCardClasses } from "./cardClasses";

export type HvCardProps = HvBaseProps & {
  /** The renderable content inside the icon slot of the header. */
  icon?: React.ReactNode;
  /** Whether the card is selectable. */
  selectable?: boolean;
  /** Whether the card is currently selected. */
  selected?: boolean;
  /** The background color of the card. */
  bgcolor?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
  /**
   *  The border color at the top of the card. Must be one of palette semantic or atmosphere colors.
   *  To set another color, the borderTop should be override.
   */
  statusColor?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvCardClasses;
};

/**
 * A card is a container for a few short and related pieces of content.
 * It roughly resembles a playing card in size and shape and is intended as a
 * linked short representation of a conceptual unit. For that reason,
 * this pattern must be used as an entry-point for further information.
 */
export const HvCard = ({
  classes,
  className,
  children,
  icon,
  selectable = false,
  selected = false,
  statusColor = "sema0",
  bgcolor,
  ...others
}: HvCardProps) => {
  return (
    <HvBox
      aria-selected={selectable ? selected : undefined}
      className={clsx(
        styles.root,
        bgcolor &&
          css({
            backgroundColor: theme.colors[bgcolor],
          }),
        "HvIsCardGridElement",
        cardClasses.root,
        classes?.root,
        className,
        selectable &&
          clsx(styles.selectable, cardClasses.selectable, classes?.selectable),
        selected &&
          clsx(styles.selected, cardClasses.selected, classes?.selected)
      )}
      {...others}
    >
      <div
        className={clsx(
          styles.semanticContainer,
          cardClasses.semanticContainer,
          classes?.semanticContainer
        )}
      >
        <div
          className={clsx(
            styles.semanticBar,
            css({
              height: selected ? 4 : 2,
              backgroundColor:
                statusColor === "sema0"
                  ? selected
                    ? theme.colors.acce1
                    : theme.colors.atmo4
                  : theme.colors[statusColor],
            }),
            cardClasses.semanticBar,
            classes?.semanticBar
          )}
        />
        <div className={clsx(styles.icon, cardClasses.icon, classes?.icon)}>
          {icon}
        </div>
      </div>
      {children}
    </HvBox>
  );
};
