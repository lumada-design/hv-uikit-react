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
import { HvFlowNodeGroup, HvFlowNodeGroups } from "../types";

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
        ? Object.entries(nodeGroups).reduce<HvFlowNodeGroups>((acc, cur) => {
            // Filter items by search
            const filteredItems = cur[1].items
              ? Object.entries(cur[1].items)
                  ?.filter(([, obj]) =>
                    obj.label.toLowerCase().includes(value.toLowerCase())
                  )
                  .reduce<NonNullable<HvFlowNodeGroup["items"]>>(
                    (items, [key, entry]) => {
                      items[key] = entry;
                      return items;
                    },
                    {}
                  )
              : {};
            const itemsCount = Object.keys(filteredItems).length;

            // Only show groups with nodes
            if (itemsCount > 0) {
              acc[cur[0]] = {
                ...cur[1],
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
            {Object.entries(groups).map(([groupId, group]) => {
              if (flatten) {
                return Object.entries(group.items || {}).map(
                  ([itemId, item]) => (
                    <HvFlowDraggableSidebarGroupItem
                      key={itemId}
                      id={itemId}
                      label={item.label}
                      data={item.data}
                      type={item.type}
                      aria-roledescription={labels?.itemAriaRoleDescription}
                    />
                  )
                );
              }

              return (
                <HvFlowSidebarGroup
                  key={groupId}
                  id={groupId}
                  expandButtonProps={{
                    "aria-label": labels?.expandGroupButtonAriaLabel,
                  }}
                  itemProps={{
                    "aria-roledescription": labels?.itemAriaRoleDescription,
                  }}
                  {...group}
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
