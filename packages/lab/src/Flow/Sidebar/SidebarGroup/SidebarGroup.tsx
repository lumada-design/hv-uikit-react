import { useCallback, useMemo } from "react";

import { Down, Up } from "@hitachivantara/uikit-react-icons";
import {
  ExtractNames,
  HvButton,
  HvButtonProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { getColor } from "@hitachivantara/uikit-styles";

import { HvFlowNodeGroup } from "../../types";
import { staticClasses, useClasses } from "./SidebarGroup.styles";
import {
  HvFlowDraggableSidebarGroupItem,
  HvFlowDraggableSidebarGroupItemProps,
} from "./SidebarGroupItem";
import { useFlowContext } from "../../hooks";

export { staticClasses as flowSidebarGroupClasses };

export type HvFlowSidebarGroupClasses = ExtractNames<typeof useClasses>;

export interface HvFlowSidebarGroupProps extends HvFlowNodeGroup {
  /** Group id. */
  id: string;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowSidebarGroupClasses;
  /** Expand button props. */
  expandButtonProps?: HvButtonProps;
  /** Item group props. */
  itemProps?: Partial<HvFlowDraggableSidebarGroupItemProps>;
}

export const HvFlowSidebarGroup = ({
  id,
  label,
  items = [],
  color,
  description,
  icon,
  expandButtonProps,
  classes: classesProp,
  itemProps,
}: HvFlowSidebarGroupProps) => {
  const { classes, cx, css } = useClasses(classesProp);

  const { expandedNodeGroups, setExpandedNodeGroups } = useFlowContext();

  const opened = useMemo(
    () => !!expandedNodeGroups?.find((group) => group === id),
    [expandedNodeGroups, id]
  );

  const handleClick = useCallback(() => {
    setExpandedNodeGroups?.((prev) =>
      opened ? prev.filter((group) => id !== group) : [...prev, id]
    );
  }, [id, opened, setExpandedNodeGroups]);

  return (
    <li className={cx(css({ borderColor: getColor(color) }), classes.root)}>
      <div className={classes.titleContainer}>
        <div className={classes.labelContainer}>
          <div className={classes.icon} role="presentation">
            {icon}
          </div>
          <HvTypography component="p" variant="title4">
            {items.length > 1 ? `${label} (${items.length})` : label}
          </HvTypography>
        </div>
        <HvButton
          icon
          onClick={handleClick}
          aria-expanded={opened}
          {...expandButtonProps}
        >
          {opened ? <Up role="presentation" /> : <Down role="presentation" />}
        </HvButton>
      </div>
      {description && (
        <div className={classes.descriptionContainer}>
          <HvTypography>{description}</HvTypography>
        </div>
      )}
      {opened && (
        <div className={classes.itemsContainer}>
          {items.map((obj) => (
            <HvFlowDraggableSidebarGroupItem
              key={obj.label}
              {...itemProps}
              {...obj}
            />
          ))}
        </div>
      )}
    </li>
  );
};
