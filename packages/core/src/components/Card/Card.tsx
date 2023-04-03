import { ClassNames } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-styles";
import clsx from "clsx";
import { HvBox } from "components";
import { HvBaseProps } from "../../types/generic";
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
    <ClassNames>
      {({ css }) => (
        <HvBox
          aria-selected={selectable ? selected : undefined}
          className={clsx(
            css(styles.root),
            css({
              backgroundColor:
                (bgcolor && theme.colors[bgcolor]) ||
                theme.card.backgroundColor,
            }),
            "HvIsCardGridElement",
            cardClasses.root,
            classes?.root,
            className,
            selectable &&
              clsx(
                css(styles.selectable),
                cardClasses.selectable,
                classes?.selectable
              ),
            selected &&
              clsx(
                css(styles.selected),
                cardClasses.selected,
                classes?.selected
              )
          )}
          {...others}
        >
          <div
            className={clsx(
              css(styles.semanticContainer),
              cardClasses.semanticContainer,
              classes?.semanticContainer
            )}
          >
            <div
              className={clsx(
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
                cardClasses.semanticBar,
                classes?.semanticBar
              )}
            />
            <div
              className={clsx(
                css(styles.icon),
                cardClasses.icon,
                classes?.icon
              )}
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
