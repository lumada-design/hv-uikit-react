import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvButtonProps,
  HvTypography,
  HvVerticalNavigation,
  HvVerticalNavigationAction,
  HvVerticalNavigationActions,
  HvVerticalNavigationTree,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Backwards,
  BarChart,
  Cloud,
  Deploy,
  Favorite,
  Forwards,
  Job,
} from "@hitachivantara/uikit-react-icons";

const classes = {
  header: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.md,
    "& span": { color: "inherit" },
  }),
  appName: css({
    display: "flex",
    alignItems: "center",
  }),
  collapseBtn: css({
    position: "relative",
  }),
  collapseIcon: css({
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    right: 0,
  }),
};

const data = [
  { id: "00", label: "Jobs", icon: <Job /> },
  { id: "01", label: "Charts", icon: <BarChart /> },
  { id: "02", label: "Deployment", icon: <Deploy /> },
  { id: "03", label: "Cloud", icon: <Cloud /> },
];

interface CollapsibleButtonProps extends Omit<HvButtonProps, "icon"> {
  collapsed: boolean;
  label: React.ReactNode;
  icon: React.ReactNode;
}

const CollapsibleButton = ({
  collapsed,
  label,
  icon,
  ...others
}: CollapsibleButtonProps) => {
  const props = collapsed
    ? { "aria-label": String(label), children: icon, icon: true }
    : { startIcon: icon, children: label };

  return <HvButton {...props} {...others} />;
};

export const Custom = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <HvVerticalNavigation open={!collapsed} useIcons>
      <div
        className={classes.header}
        style={{ alignItems: collapsed ? "center" : "stretch" }}
      >
        {collapsed ? (
          <Favorite />
        ) : (
          <div className={classes.appName}>
            <Favorite />
            <HvTypography variant="label">Custom App</HvTypography>
          </div>
        )}
        <CollapsibleButton
          collapsed={collapsed}
          variant="primary"
          icon={<Add />}
          label="Create"
        />
      </div>
      <HvVerticalNavigationTree data={data} />
      <HvVerticalNavigationActions>
        <div className={classes.collapseBtn}>
          {!collapsed && (
            <Backwards color="currentcolor" className={classes.collapseIcon} />
          )}
          <HvVerticalNavigationAction
            label={collapsed ? "Expand menu" : "Collapse menu"}
            icon={collapsed ? <Forwards /> : undefined}
            onClick={() => setCollapsed((prev) => !prev)}
          />
        </div>
      </HvVerticalNavigationActions>
    </HvVerticalNavigation>
  );
};
