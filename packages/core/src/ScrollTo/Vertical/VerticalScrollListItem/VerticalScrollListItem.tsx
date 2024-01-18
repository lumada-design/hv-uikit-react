import { CurrentStep } from "@hitachivantara/uikit-react-icons";

import { HvBaseProps } from "../../../types/generic";
import { HvTooltip, HvTooltipProps } from "../../../Tooltip";
import { ExtractNames } from "../../../utils/classes";
import { useTheme } from "../../../hooks/useTheme";
import { useDefaultProps } from "../../../hooks/useDefaultProps";

import { staticClasses, useClasses } from "./VerticalScrollListItem.styles";

export { staticClasses as verticalScrollListItemClasses };

export type HvVerticalScrollListItemClasses = ExtractNames<typeof useClasses>;

export interface HvVerticalScrollListItemProps
  extends HvBaseProps<HTMLDivElement> {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvVerticalScrollListItemClasses;
  /** Whether the element is selected. */
  selected?: boolean;
  label?: React.ReactNode;
  tooltipPlacement?: HvTooltipProps["placement"];
}

/**
 * HvVerticalScrollListItem a focusable item to be used as part of the vertical scroll
 */
export const HvVerticalScrollListItem = (
  props: HvVerticalScrollListItemProps
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

  return (
    <li id={id} className={cx(classes.root, className)} aria-current={selected}>
      <HvTooltip title={label} placement={tooltipPlacement}>
        <div
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={onKeyDown}
          className={cx(classes.button, classes.text)}
          {...others}
        >
          {icon}
        </div>
      </HvTooltip>
    </li>
  );
};
