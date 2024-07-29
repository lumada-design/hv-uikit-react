import React from "react";
import { css, cx } from "@emotion/css";
import {
  HvDropDownMenu,
  HvListValue,
  HvOverflowTooltip,
  HvTypography,
  theme,
  useUniqueId,
} from "@hitachivantara/uikit-react-core";

const classes = {
  root: css({
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.colors.atmo1,
    borderWidth: "1px",
    borderColor: theme.colors.atmo3,
    width: "100%",
    height: "100%",
  }),
  header: css({
    borderRadius: "16px 16px 0 0",
    borderBottom: `1px solid ${theme.colors.atmo3}`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.atmo1,
    alignItems: "center",
  }),
  titleContainer: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "80%",
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing("sm"),
    gap: theme.spacing("xs"),
  }),
  childless: css({
    borderRadius: "16px",
    border: "unset",
  }),
};

export type HierarchyData = LevelData | FactTableData;

export interface BaseLevelData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: HierarchyData[];
}

export interface LevelData extends BaseLevelData {
  actions?: HvListValue[];
  type: "level";
}

export interface FactTableData extends BaseLevelData {
  type: "table";
}

export interface LevelProps {
  id: string;
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  actions?: HvListValue[];
  classes?: Record<string, string>;
}

export const Level = ({
  id: idProp,
  icon,
  title,
  children,
  actions = [],
  classes: classesProp,
}: LevelProps) => {
  const id = useUniqueId(idProp);

  const hasChildren = !!children;

  return (
    <div className={cx(classes.root, classesProp?.root)} id={id}>
      <div
        className={cx(classes.header, classesProp?.header, {
          [classes.childless]: !hasChildren,
        })}
      >
        <div className={classes.titleContainer}>
          {icon}
          <HvOverflowTooltip
            data={
              <HvTypography
                variant={hasChildren ? "title4" : "body"}
                component="p"
              >
                {title}
              </HvTypography>
            }
          />
        </div>
        {actions && <HvDropDownMenu dataList={actions} />}
      </div>
      {hasChildren && <div className={classes.content}>{children}</div>}
    </div>
  );
};
