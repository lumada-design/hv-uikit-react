import { HvBaseProps } from "@core/types";
import horizontalScrollListItemClasses, {
  HvHorizontalScrollListItemClasses,
} from "./horizontalScrollListItemClasses";
import { ClassNames } from "@emotion/react";
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
      {({ css, cx }) => (
        <li
          id={id}
          className={cx(
            horizontalScrollListItemClasses.root,
            css(styles.root),
            className,
            classes?.root
          )}
          aria-current={selected}
        >
          <div
            id={buttonId}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={onKeyDown}
            className={cx(
              horizontalScrollListItemClasses.button,
              css(styles.button),
              classes?.button
            )}
            aria-labelledby={labelId}
            {...others}
          >
            <Tooltip
              id={labelId}
              className={cx(
                horizontalScrollListItemClasses.text,
                selected && horizontalScrollListItemClasses.selected,
                css(styles.text),
                selected && css(styles.selected),
                classes?.text,
                selected && classes?.selected
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
