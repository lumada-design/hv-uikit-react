import { useMemo, useState } from "react";

import debounce from "lodash/debounce";

import { useDroppable } from "@dnd-kit/core";

import {
  ExtractNames,
  HvDrawer,
  HvDrawerProps,
  HvInput,
  HvInputProps,
  HvTypography,
  useLabels,
  useUniqueId,
} from "@hitachivantara/uikit-react-core";
import { Add } from "@hitachivantara/uikit-react-icons";

import { staticClasses, useClasses } from "./Sidebar.styles";
import { HvFlowSidebarGroup } from "./SidebarGroup";
import { useFlowContext } from "../FlowContext";
import { buildGroups } from "./utils";

export { staticClasses as flowSidebarClasses };

export type HvFlowSidebarClasses = ExtractNames<typeof useClasses>;

export interface HvFlowSidebarProps
  extends Omit<HvDrawerProps, "classes" | "title"> {
  /** Sidebar title. */
  title?: string;
  /** Sidebar description. */
  description?: string;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowSidebarClasses;
  /** Labels used on the sidebar. */
  labels?: {
    itemAriaRoleDescription?: string;
    expandGroupButtonAriaLabel?: string;
    searchPlaceholder?: string;
    searchAriaLabel?: string;
  };
}

const DEFAULT_LABELS: HvFlowSidebarProps["labels"] = {
  itemAriaRoleDescription: "Draggable",
  expandGroupButtonAriaLabel: "Expand group",
  searchPlaceholder: "Search node...",
  searchAriaLabel: "Search node...",
};

export const HvFlowSidebar = ({
  id,
  title,
  description,
  anchor = "right",
  buttonTitle = "Close",
  classes: classesProp,
  labels: labelsProps,
  ...others
}: HvFlowSidebarProps) => {
  const { classes } = useClasses(classesProp);

  const { nodeGroups, nodeTypes, setExpandedNodeGroups } = useFlowContext();

  const unfilteredGroups = useMemo(
    () => buildGroups(nodeGroups, nodeTypes),
    [nodeGroups, nodeTypes]
  );

  const [groups, setGroups] = useState(unfilteredGroups);

  const labels = useLabels(DEFAULT_LABELS, labelsProps);

  const drawerElementId = useUniqueId(id, "hvFlowSidebarDrawer");
  const groupsElementId = useUniqueId(id, "hvFlowSidebarGroups");

  // The sidebar is droppable to distinguish between the canvas and the sidebar
  // Otherwise items dropped inside the sidebar will be added to the canvas
  const { setNodeRef } = useDroppable({
    id: drawerElementId,
  });

  const handleSearch: HvInputProps["onChange"] = (event, value) => {
    const gps = value
      ? Object.entries(unfilteredGroups).reduce((acc, curr) => {
          // Filter nodes by search
          const filteredNodes = curr[1].nodes.filter((obj) =>
            obj.label.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          );
          const nodesCount = filteredNodes.length;

          // Only show groups with nodes
          if (nodesCount > 0) {
            acc[curr[0]] = {
              ...curr[1],
              nodes: filteredNodes,
            };
          }

          return acc;
        }, {})
      : unfilteredGroups;

    setGroups(gps);
    setExpandedNodeGroups?.(value ? Object.keys(gps) : []);
  };

  const handleDebouncedSearch = debounce(handleSearch, 500);

  return (
    <HvDrawer
      BackdropComponent={undefined}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor={anchor}
      buttonTitle={buttonTitle}
      {...others}
    >
      <div id={drawerElementId} ref={setNodeRef}>
        <div className={classes.titleContainer}>
          <Add role="none" />
          <HvTypography variant="title3">{title}</HvTypography>
        </div>
        <div className={classes.contentContainer}>
          <HvTypography className={classes.description}>
            {description}
          </HvTypography>
          <HvInput
            className={classes.searchRoot}
            type="search"
            placeholder={labels?.searchPlaceholder}
            aria-label={labels?.searchAriaLabel}
            aria-controls={groupsElementId}
            aria-owns={groupsElementId}
            onChange={handleDebouncedSearch}
            inputProps={{ autoComplete: "off" }}
          />
          <ul id={groupsElementId} className={classes.groupsContainer}>
            {Object.entries(groups).map((obj) => (
              <HvFlowSidebarGroup
                key={obj[0]}
                id={obj[0]}
                expandButtonProps={{
                  "aria-label": labels?.expandGroupButtonAriaLabel,
                }}
                itemProps={{
                  "aria-roledescription": labels?.itemAriaRoleDescription,
                }}
                {...obj[1]}
              />
            ))}
          </ul>
        </div>
      </div>
    </HvDrawer>
  );
};
