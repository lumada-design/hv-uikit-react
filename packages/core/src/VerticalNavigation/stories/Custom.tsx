import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
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
import { mergeStyles } from "@hitachivantara/uikit-react-utils";

const classes = {
  header: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.md,
    alignItems: "var(--header-alignment)",
    "& span": { color: theme.colors.base_light },
    "& svg *.color0": { fill: theme.colors.base_light },
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
    "& svg *.color0": { fill: theme.colors.base_light },
  }),
};

const data = [
  { id: "00", label: "Jobs", icon: <Job /> },
  {
    id: "01",
    label: "Charts",
    icon: <BarChart />,
  },
  {
    id: "02",
    label: "Deployment",
    icon: <Deploy />,
  },
  {
    id: "03",
    label: "Cloud",
    icon: <Cloud />,
  },
];

export const Custom = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <HvVerticalNavigation open={!collapsed} useIcons>
      <div
        className={classes.header}
        style={mergeStyles(
          {},
          {
            "--header-alignment": collapsed ? "center" : "stretch",
          },
        )}
      >
        {collapsed ? (
          <>
            <Favorite />
            <HvButton icon variant="primary" aria-label="Create">
              <Add />
            </HvButton>
          </>
        ) : (
          <>
            <div className={classes.appName}>
              <Favorite />
              <HvTypography variant="label">Custom App</HvTypography>
            </div>
            <HvButton endIcon={<Add />}>Create</HvButton>
          </>
        )}
      </div>
      <HvVerticalNavigationTree data={data} />
      <HvVerticalNavigationActions>
        <div className={classes.collapseBtn}>
          {!collapsed && <Backwards className={classes.collapseIcon} />}
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
