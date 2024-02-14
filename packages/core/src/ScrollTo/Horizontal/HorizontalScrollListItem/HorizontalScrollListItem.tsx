import { HvBaseProps } from "../../../types/generic";
import { ExtractNames } from "../../../utils/classes";
import { setId } from "../../../utils/setId";
import { HvTypographyProps } from "../../../Typography";

import { useDefaultProps } from "../../../hooks/useDefaultProps";

import { staticClasses, useClasses } from "./HorizontalScrollListItem.styles";

export { staticClasses as horizontalScrollListItemClasses };

export type HvHorizontalScrollListItemClasses = ExtractNames<typeof useClasses>;

export interface HvHorizontalScrollListItemProps
  extends HvBaseProps<HTMLDivElement | HTMLAnchorElement> {
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
  onClick?: (
    event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>
  ) => void;
  /** The function to be executed when the element is clicked. */
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>
  ) => void;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvHorizontalScrollListItemClasses;

  /**
   * The link to be set in the href attribute of the anchor element.
   *
   * If this is not set, the element will be rendered as a div with a button role.
   */
  link?: string;
}

/**
 * HvHorizontalScrollListItem a focusable item to be used as part of the horizontal scroll
 */
export const HvHorizontalScrollListItem = (
  props: HvHorizontalScrollListItemProps
) => {
  const {
    id,
    className,
    classes: classesProp,
    selected,
    children,
    onClick,
    onKeyDown,
    tooltipWrapper,
    link,
    ...others
  } = useDefaultProps("HvHorizontalScrollListItem", props);
  const { classes, cx } = useClasses(classesProp);
  const variant = selected ? "label" : "body";
  const labelId = setId(id, "label");
  const buttonId = setId(id, "button");
  const Tooltip = tooltipWrapper;

  const Component = link != null ? "a" : "div";

  return (
    <li id={id} className={cx(classes.root, className)} aria-current={selected}>
      <Component
        id={buttonId}
        role={link == null ? "button" : undefined}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={classes.button}
        aria-labelledby={labelId}
        href={link}
        {...others}
      >
        <Tooltip
          id={labelId}
          className={cx(classes.text, { [classes.selected]: selected })}
          variant={variant}
        >
          {children}
        </Tooltip>
      </Component>
    </li>
  );
};
