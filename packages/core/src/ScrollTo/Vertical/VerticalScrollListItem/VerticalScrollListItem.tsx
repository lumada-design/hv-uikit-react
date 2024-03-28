import { CurrentStep } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "../../../hooks/useDefaultProps";
import { useTheme } from "../../../hooks/useTheme";
import { HvTooltip, HvTooltipProps } from "../../../Tooltip";
import { HvBaseProps } from "../../../types/generic";
import { ExtractNames } from "../../../utils/classes";
import { staticClasses, useClasses } from "./VerticalScrollListItem.styles";

export { staticClasses as verticalScrollListItemClasses };

export type HvVerticalScrollListItemClasses = ExtractNames<typeof useClasses>;

export interface HvVerticalScrollListItemProps
  extends HvBaseProps<HTMLDivElement | HTMLAnchorElement> {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvVerticalScrollListItemClasses;
  /** Whether the element is selected. */
  selected?: boolean;
  /** The function to be executed when the element is clicked. */
  onClick?: (
    event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>,
  ) => void;
  /** The function to be executed when the element is clicked. */
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>,
  ) => void;
  label?: React.ReactNode;
  tooltipPlacement?: HvTooltipProps["placement"];

  /**
   * The link to be set in the href attribute of the anchor element.
   *
   * If this is not set, the element will be rendered as a div with a button role.
   */
  href?: string;
}

/**
 * HvVerticalScrollListItem a focusable item to be used as part of the vertical scroll
 */
export const HvVerticalScrollListItem = (
  props: HvVerticalScrollListItemProps,
) => {
  const {
    id,
    className,
    classes: classesProp,
    selected,
    label,
    onClick,
    onKeyDown,
    tooltipPlacement = "left",
    href,
    ...others
  } = useDefaultProps("HvVerticalScrollListItem", props);
  const { classes, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();

  const icon = selected ? (
    <CurrentStep
      height={activeTheme?.scrollTo.dotSelectedSize}
      width={activeTheme?.scrollTo.dotSelectedSize}
    />
  ) : (
    <div className={classes.notSelected} />
  );

  const Component = href != null ? "a" : "div";

  return (
    <li id={id} className={cx(classes.root, className)} aria-current={selected}>
      <HvTooltip title={label} placement={tooltipPlacement}>
        <Component
          role={href == null ? "button" : undefined}
          tabIndex={0}
          onClick={onClick}
          onKeyDown={onKeyDown}
          className={cx(classes.button, classes.text)}
          href={href}
          {...others}
        >
          {icon}
        </Component>
      </HvTooltip>
    </li>
  );
};
