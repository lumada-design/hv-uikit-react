import { useDefaultProps } from "../../../hooks/useDefaultProps";
import {
  HvOverflowTooltip,
  HvOverflowTooltipProps,
} from "../../../OverflowTooltip";
import { HvBaseProps } from "../../../types/generic";
import { ExtractNames } from "../../../utils/classes";
import { setId } from "../../../utils/setId";
import { staticClasses, useClasses } from "./HorizontalScrollListItem.styles";

export { staticClasses as horizontalScrollListItemClasses };

export type HvHorizontalScrollListItemClasses = ExtractNames<typeof useClasses>;

export interface HvHorizontalScrollListItemProps
  extends HvBaseProps<HTMLDivElement | HTMLAnchorElement> {
  /** The text to render.  */
  label?: React.ReactNode;
  /** Whether the element is selected. */
  selected?: boolean;
  tooltipPlacement: HvOverflowTooltipProps["placement"];
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvHorizontalScrollListItemClasses;

  /**
   * The link to be set in the href attribute of the anchor element.
   *
   * If this is not set, the element will be rendered as a div with a button role.
   */
  href?: string;
  /** @deprecated remove in v6 */
  iconClasses?: string;
}

/**
 * HvHorizontalScrollListItem a focusable item to be used as part of the horizontal scroll
 */
export const HvHorizontalScrollListItem = (
  props: HvHorizontalScrollListItemProps,
) => {
  const {
    id,
    className,
    classes: classesProp,
    selected,
    label,
    tooltipPlacement,
    href,
    iconClasses,
    ...others
  } = useDefaultProps("HvHorizontalScrollListItem", props);
  const { classes, cx } = useClasses(classesProp);
  const buttonId = setId(id, "button");

  const Component = href != null ? "a" : "div";

  return (
    <li id={id} className={cx(classes.root, className)} aria-current={selected}>
      <Component
        id={buttonId}
        role={href == null ? "button" : undefined}
        tabIndex={0}
        className={classes.button}
        href={href}
        {...others}
      >
        <HvOverflowTooltip
          className={cx(classes.text, { [classes.selected]: selected })}
          placement={tooltipPlacement}
          data={label}
        />
        <div
          aria-hidden
          className={cx(classes.bullet, iconClasses, {
            [classes.bulletSelected]: selected,
          })}
        >
          <span />
        </div>
      </Component>
    </li>
  );
};
