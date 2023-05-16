import { ClassNames } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBox } from "@core/components";
import {
  HvBaseProps,
  HvAtmosphereColorKeys,
  HvSemanticColorKeys,
} from "@core/types";
import { styles } from "./Card.styles";
import cardClasses, { HvCardClasses } from "./cardClasses";

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
    <ClassNames>
      {({ css, cx }) => (
        <HvBox
          aria-selected={selectable ? selected : undefined}
          className={cx(
            "HvIsCardGridElement",
            cardClasses.root,
            selectable && cardClasses.selectable,
            selected && cardClasses.selected,
            css(styles.root),
            css({
              backgroundColor:
                (bgcolor && theme.colors[bgcolor]) ||
                theme.card.backgroundColor,
            }),
            selectable && css(styles.selectable),
            selected && css(styles.selected),
            className,
            classes?.root,
            selectable && css(styles.selectable),
            selected && css(styles.selected)
          )}
          {...others}
        >
          <div
            className={cx(
              cardClasses.semanticContainer,
              css(styles.semanticContainer),
              classes?.semanticContainer
            )}
          >
            <div
              className={cx(
                cardClasses.semanticBar,
                css(styles.semanticBar),
                css({
                  height: selected ? 4 : 2,
                  backgroundColor:
                    statusColor === "sema0"
                      ? selected
                        ? theme.colors.secondary
                        : theme.colors.atmo4
                      : theme.colors[statusColor],
                }),
                classes?.semanticBar
              )}
            />
            <div
              className={cx(cardClasses.icon, css(styles.icon), classes?.icon)}
            >
              {icon}
            </div>
          </div>
          {children}
        </HvBox>
      )}
    </ClassNames>
  );
};
