import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";
import { setId } from "@core/utils/setId";
import { HvTypographyProps } from "@core/components/Typography";

import { staticClasses, useClasses } from "./HorizontalScrollListItem.styles";

export { staticClasses as horizontalScrollListItemClasses };

export type HvHorizontalScrollListItemClasses = ExtractNames<typeof useClasses>;

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
  classes: classesProp,
  selected,
  children,
  onClick,
  onKeyDown,
  tooltipWrapper,
  ...others
}: HvVerticalScrollListItemProps) => {
  const { classes, cx } = useClasses(classesProp);
  const variant = selected ? "label" : "body";
  const labelId = setId(id, "label");
  const buttonId = setId(id, "button");
  const Tooltip = tooltipWrapper;

  return (
    <li id={id} className={cx(className, classes.root)} aria-current={selected}>
      <div
        id={buttonId}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={classes.button}
        aria-labelledby={labelId}
        {...others}
      >
        <Tooltip
          id={labelId}
          className={cx(classes.text, { [classes.selected]: selected })}
          variant={variant}
        >
          {children}
        </Tooltip>
      </div>
    </li>
  );
};
