import { forwardRef, useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  HvPanel,
  HvTreeItem,
  HvTreeItemProps,
  HvTreeView,
  HvTypography,
  NavigationData,
  theme,
  useHvTreeItem,
} from "@hitachivantara/uikit-react-core";
import { DropDownXS } from "@hitachivantara/uikit-react-icons";
import { mergeStyles } from "@hitachivantara/uikit-react-utils";

interface CustomTreeItemProps extends HvTreeItemProps {
  /** Triggered when the tree item is expanded */
  onOpen?: HvTreeItemProps["onClick"];
}

const classes = {
  group: css({
    marginLeft: 0,
  }),
  content: css({
    borderLeft: "4px solid transparent",
    paddingLeft: `calc(${theme.space.sm} * var(--level))`,
  }),
  selected: css({
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.atmo3,
  }),
  label: css({
    display: "flex",
    alignItems: "center",
  }),
};

const NavigationItem = forwardRef<HTMLLIElement, CustomTreeItemProps>(
  (props, ref) => {
    const { children, nodeId, label, onOpen, onClick, ...others } = props;
    const { disabled, expanded, level } = useHvTreeItem(nodeId);

    return (
      <HvTreeItem
        ref={ref}
        nodeId={nodeId}
        style={mergeStyles(
          {},
          {
            "--level": level,
            pointerEvents: disabled ? "none" : undefined,
          },
        )}
        classes={{
          group: classes.group,
          content: classes.content,
          selected: classes.selected,
        }}
        icon="" // remove left nav icon
        label={
          <div className={classes.label}>
            <HvTypography
              variant={children ? "label" : "body"}
              style={{ flex: 1 }}
            >
              {label}
            </HvTypography>
            {children && (
              <DropDownXS
                style={{ transform: `rotate(${expanded ? 180 : 0}deg)` }}
              />
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

/** Render tree view items */
const renderItem = ({ id, label, data }: NavigationData) => (
  <NavigationItem key={id} nodeId={id} label={label}>
    {data?.map(renderItem)}
  </NavigationItem>
);

export const VerticalNavigation = () => {
  const [selected, setSelected] = useState("-1");

  const navData = useMemo<NavigationData[]>(
    () => [
      { id: "00", label: "Overview" },
      { id: "01", label: "Analytics" },
      {
        id: "02",
        label: "Storage",
        data: [
          {
            id: "02-01",
            label: "Cloud",
            data: [
              { id: "02-01-01", label: "Servers" },
              { id: "02-01-02", label: "HCP Anywhere" },
              { id: "02-01-03", label: "This Computer", disabled: true },
            ],
          },
        ],
      },
      {
        id: "03",
        label: "Administration",
        data: [
          {
            id: "03-01",
            label: "Rest API",
            data: [{ id: "03-01-01", label: "Log Bundle" }],
          },
        ],
      },
    ],
    [],
  );

  return (
    <HvPanel style={{ width: 300 }}>
      <HvTreeView
        multiSelect={false}
        aria-label="site navigation"
        selected={selected}
        onNodeSelect={(evt, nodeId) => setSelected(nodeId)}
      >
        {navData.map(renderItem)}
      </HvTreeView>
    </HvPanel>
  );
};
