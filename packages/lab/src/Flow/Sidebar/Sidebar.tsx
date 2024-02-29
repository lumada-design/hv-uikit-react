import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import {
  DndContextProps,
  DragOverlay,
  DragOverlayProps,
  useDndMonitor,
  useDroppable,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
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
import { useFlowContext } from "../hooks";
import {
  HvFlowSidebarGroupItem,
  HvFlowDraggableSidebarGroupItem,
} from "./SidebarGroup/SidebarGroupItem";
import { HvFlowNodeGroup } from "../types";

export { staticClasses as flowSidebarClasses };

export type HvFlowSidebarClasses = ExtractNames<typeof useClasses>;

export interface HvFlowSidebarProps
  extends Omit<HvDrawerProps, "classes" | "title"> {
  /** Sidebar title. */
  title?: string;
  /** Sidebar description. */
  description?: string;
  /** Flatten sidebar items */
  flatten?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowSidebarClasses;
  /** Labels used on the sidebar. */
  labels?: Partial<typeof DEFAULT_LABELS>;
  /**
   * Dnd Kit drag overlay props for customization.
   *
   * More information can be found in the [Dnd Kit documentation](https://docs.dndkit.com/api-documentation/draggable/drag-overlay).
   */
  dragOverlayProps?: DragOverlayProps;
  /** Props to be applied to the default nodes group. */
  defaultGroupProps?: HvFlowNodeGroup;
}

const DEFAULT_LABELS = {
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
  flatten = false,
  classes: classesProp,
  labels: labelsProps,
  dragOverlayProps,
  defaultGroupProps,
  ...others
}: HvFlowSidebarProps) => {
  const { classes } = useClasses(classesProp);

  const { nodeGroups, setExpandedNodeGroups } = useFlowContext();

  const [groups, setGroups] = useState(nodeGroups || {});
  const [draggingLabel, setDraggingLabel] = useState(undefined);

  const labels = useLabels(DEFAULT_LABELS, labelsProps);

  const drawerElementId = useUniqueId(id);
  const groupsElementId = useUniqueId(id);

  // The sidebar is droppable to distinguish between the canvas and the sidebar
  // Otherwise items dropped inside the sidebar will be added to the canvas
  const { setNodeRef } = useDroppable({
    id: drawerElementId,
  });

  const handleDragStart: DndContextProps["onDragStart"] = (event) => {
    if (event.active.data.current?.hvFlow) {
      setDraggingLabel(event.active.data.current.hvFlow?.label);
    }
  };

  const handleDragEnd: DndContextProps["onDragEnd"] = () => {
    setDraggingLabel(undefined);
  };

  useDndMonitor({
    onDragEnd: handleDragEnd,
    onDragStart: handleDragStart,
  });

  const handleSearch: HvInputProps["onChange"] = (event, value) => {
    if (nodeGroups) {
      const gps = value
        ? Object.entries(nodeGroups).reduce((acc, curr) => {
            // Filter items by search
            const filteredItems =
              curr[1].items?.filter((obj) =>
                obj.label
                  .toLocaleLowerCase()
                  .includes(value.toLocaleLowerCase())
              ) || [];
            const itemsCount = filteredItems.length;

            // Only show groups with nodes
            if (itemsCount > 0) {
              acc[curr[0]] = {
                ...curr[1],
                items: filteredItems,
              };
            }

            return acc;
          }, {})
        : nodeGroups;

      setGroups(gps);
      setExpandedNodeGroups?.(value ? Object.keys(gps) : []);
    }
  };

  const handleDebouncedSearch = useDebounceCallback(handleSearch, 500);

  return (
    <HvDrawer
      BackdropComponent={undefined}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      showBackdrop={false}
      anchor={anchor}
      buttonTitle={buttonTitle}
      {...others}
    >
      <div id={drawerElementId} ref={setNodeRef}>
        <div className={classes.titleContainer}>
          <Add role="presentation" />
          <HvTypography component="p" variant="title3">
            {title}
          </HvTypography>
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
            {Object.entries(groups).map((obj) => {
              if (flatten) {
                return obj[1].items?.map((item) => (
                  <HvFlowDraggableSidebarGroupItem
                    key={item.label}
                    id={item.label}
                    label={item.label}
                    data={item.data}
                    type={item.type}
                  />
                ));
              }

              return (
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
              );
            })}
          </ul>
        </div>
      </div>
      <DragOverlay modifiers={[restrictToWindowEdges]} {...dragOverlayProps}>
        {draggingLabel ? (
          <HvFlowSidebarGroupItem label={draggingLabel} isDragging />
        ) : null}
      </DragOverlay>
    </HvDrawer>
  );
};
