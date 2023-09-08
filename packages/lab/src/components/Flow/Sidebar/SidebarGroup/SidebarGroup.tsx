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
import { useFlowContext } from "../../FlowContext";

export { staticClasses as flowSidebarGroupClasses };

export type HvFlowSidebarGroupClasses = ExtractNames<typeof useClasses>;

export type HvFlowSidebarGroupNodes = {
  id: string;
  label: string;
}[];

export interface HvFlowSidebarGroupProps extends HvFlowNodeGroup {
  /** Group id. */
  id: string;
  /** Group nodes. */
  nodes: HvFlowSidebarGroupNodes;
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
  nodes,
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
    () => !!expandedNodeGroups?.find((groupId) => groupId === id),
    [expandedNodeGroups, id]
  );

  const handleClick = useCallback(() => {
    setExpandedNodeGroups?.((prev) =>
      opened ? prev.filter((groupId) => id !== groupId) : [...prev, id]
    );
  }, [id, opened, setExpandedNodeGroups]);

  return (
    <li className={cx(css({ borderColor: getColor(color) }), classes.root)}>
      <div className={classes.titleContainer}>
        <div className={classes.labelContainer}>
          <div className={classes.icon} role="none">
            {icon}
          </div>
          <HvTypography variant="title4">
            {nodes.length > 1 ? `${label} (${nodes.length})` : label}
          </HvTypography>
        </div>
        <HvButton
          icon
          onClick={handleClick}
          aria-expanded={opened}
          {...expandButtonProps}
        >
          {opened ? <Up role="none" /> : <Down role="none" />}
        </HvButton>
      </div>
      {description && (
        <div className={classes.descriptionContainer}>
          <HvTypography>{description}</HvTypography>
        </div>
      )}
      {opened && (
        <div className={classes.itemsContainer}>
          {nodes.map((obj) => (
            <HvFlowDraggableSidebarGroupItem
              key={obj.id}
              {...itemProps}
              {...obj}
            />
          ))}
        </div>
      )}
    </li>
  );
};
