import { HvBaseProps } from "@core/types";
import horizontalScrollListItemClasses, {
  HvHorizontalScrollListItemClasses,
} from "./horizontalScrollListItemClasses";
import { ClassNames } from "@emotion/react";
import { clsx } from "clsx";
import { setId } from "@core/utils";
import { HvTypographyProps } from "@core/components";
import { styles } from "./HorizontalScrollListItem.styles";

export interface HvVerticalScrollListItemProps extends HvBaseProps {
  /** The text to render.  */
  children: React.ReactNode;
  /** A function component that renders a typography wrapped with a tooltip. */
  tooltipWrapper: React.FunctionComponent<{
    id?: string;
    className?: string;
    variant?: HvTypographyProps["variant"];
    children?: React.ReactNode;
  }>;
  /** Whether the element is selected. */
  selected?: boolean;
  /** The function to be executed when the element is clicked. */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** The function to be executed when the element is clicked. */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvHorizontalScrollListItemClasses;
}

/**
 * HvHorizontalScrollListItem a focusable item to be used as part of the horizontal scroll
 */
export const HvHorizontalScrollListItem = ({
  id,
  className,
  classes,
  selected,
  children,
  onClick,
  onKeyDown,
  tooltipWrapper,
  ...others
}: HvVerticalScrollListItemProps) => {
  const variant = selected ? "label" : "body";
  const labelId = setId(id, "label");
  const buttonId = setId(id, "button");
  const Tooltip = tooltipWrapper;

  return (
    <ClassNames>
      {({ css }) => (
        <li
          id={id}
          className={clsx(
            className,
            classes?.root,
            horizontalScrollListItemClasses.root,
            css(styles.root)
          )}
          aria-current={selected}
        >
          <div
            id={buttonId}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={onKeyDown}
            className={clsx(
              classes?.button,
              horizontalScrollListItemClasses.button,
              css(styles.button)
            )}
            aria-labelledby={labelId}
            {...others}
          >
            <Tooltip
              id={labelId}
              className={clsx(
                classes?.text,
                horizontalScrollListItemClasses.text,
                css(styles.text),
                selected &&
                  clsx(
                    classes?.selected,
                    horizontalScrollListItemClasses.selected,
                    css(styles.selected)
                  )
              )}
              variant={variant}
            >
              {children}
            </Tooltip>
          </div>
        </li>
      )}
    </ClassNames>
  );
};
