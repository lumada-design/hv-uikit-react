import { forwardRef, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { css, cx } from "@emotion/css";
import {
  HvOverflowTooltip,
  HvTreeItem,
  HvTreeItemProps,
  HvTreeView,
  theme,
  useForkRef,
} from "@hitachivantara/uikit-react-core";
import { DataSource, Drag, Table } from "@hitachivantara/uikit-react-icons";

import { NodeData } from "./Node";

const classes = {
  dragging: css({
    border: `2px solid ${theme.colors.primary_80}`,
  }),
  contentDragging: css({
    "&&:hover": {
      backgroundColor: theme.colors.atmo1,
    },
  }),
  labelRoot: css({
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: theme.space.xs,
  }),
  dragIcon: css({ flex: 1, display: "flex", justifyContent: "flex-end" }),
};

interface Data {
  id: string;
  label: string;
  subtitle?: string;
  children?: Data[];
}

interface TreeItemProps extends HvTreeItemProps {
  isDragging?: boolean;
}

interface DraggableTreeItemProps extends HvTreeItemProps {
  subtitle?: string;
}

const data = [
  {
    id: "db1",
    label: "Database 1",
    children: [
      { id: "table1", label: "Table 1", subtitle: "Table from Database 1" },
      { id: "table2", label: "Table 2", subtitle: "Table from Database 1" },
      { id: "table3", label: "Table 3", subtitle: "Table from Database 1" },
    ],
  },
  {
    id: "db2",
    label: "Database 2",
    children: [
      { id: "table4", label: "Table 4", subtitle: "Table from Database 2" },
      { id: "table5", label: "Table 5", subtitle: "Table from Database 2" },
      { id: "table6", label: "Table 6", subtitle: "Table from Database 2" },
    ],
  },
] satisfies Data[];

export const TreeItem = forwardRef<HTMLLIElement, TreeItemProps>(
  (props, ref) => {
    const { className, isDragging, children, nodeId, label, ...others } = props;
    const Icon = children ? DataSource : Table;

    return (
      <HvTreeItem
        ref={ref}
        nodeId={nodeId}
        className={cx(className, { [classes.dragging]: isDragging })}
        classes={{
          content: cx({ [classes.contentDragging]: isDragging }),
        }}
        label={
          <div className={classes.labelRoot}>
            <Icon />
            <HvOverflowTooltip data={label} />
            {!children && (
              <span className={classes.dragIcon}>
                <Drag />
              </span>
            )}
          </div>
        }
        {...others}
      >
        {children}
      </HvTreeItem>
    );
  },
);

const DraggableTreeItem = (props: DraggableTreeItemProps) => {
  const { subtitle, label, children, nodeId, ...others } = props;

  const itemRef = useRef<HTMLLIElement>(null);

  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: nodeId,
      data: {
        // Data needed to be dropped in HvFlow
        hvFlow: {
          // HvFlow will use this value to populate the node's data.nodeLabel
          label,
          // Node type from nodeTypes property provided to HvFlow
          type: "node",
          // Item position: used by HvFlow to position the node when dropped
          x: itemRef.current?.getBoundingClientRect().x,
          y: itemRef.current?.getBoundingClientRect().y,
          // Values to be added to the node's data
          data: {
            tableId: nodeId,
            subtitle,
            color: "cat3_40",
            icon: "table",
            output: {
              id: "data",
              label: "Data",
            },
          } satisfies NodeData,
        },
        // Data needed for the DragOverlay component
        dragOverlay: {
          component: <TreeItem nodeId={nodeId} label={label} isDragging />,
        },
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const forkedRef = useForkRef(itemRef, setNodeRef);

  return (
    <TreeItem
      nodeId={nodeId}
      ref={forkedRef}
      style={style}
      isDragging={isDragging}
      label={label}
      {...attributes}
      {...listeners}
      {...others}
    >
      {children}
    </TreeItem>
  );
};

const renderTreeItem = ({ id, label, children, subtitle }: Data) =>
  children ? (
    <TreeItem key={id} nodeId={id} label={label}>
      {children?.map(renderTreeItem)}
    </TreeItem>
  ) : (
    <DraggableTreeItem key={id} nodeId={id} label={label} subtitle={subtitle}>
      {children}
    </DraggableTreeItem>
  );

export const TreeView = () => (
  <HvTreeView aria-label="Database navigator" disableSelection>
    {data.map((db) => renderTreeItem(db))}
  </HvTreeView>
);
