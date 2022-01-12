/* eslint-disable import/no-extraneous-dependencies,import/no-unresolved,react/prop-types */
import React from "react";
import startCase from "lodash/startCase";
import capitalize from "lodash/capitalize";
import { withStyles } from "@material-ui/core";
import { HvTypography } from "@hitachivantara/uikit-react-core";

const styles = (theme) => ({
  colorGroup: {
    paddingBottom: theme.hv.spacing.xl,
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
  },
  title: {
    paddingBottom: theme.hv.spacing.md,
  },
  groupName: {
    marginTop: theme.hv.spacing.md,
    marginBottom: theme.hv.spacing.sm,
  },
  colors: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  colorContainer: {
    marginRight: theme.hv.spacing.sm,
    marginBottom: theme.hv.spacing.md,
  },
  colorSquare: {
    width: 130,
    height: 130,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    marginBottom: theme.hv.spacing.xs,
  },
  colorName: {
    display: "flex",
    alignItems: "baseline",
  },
});

const Group = ({ classes, name, colors }) => {
  const keys = Object.keys(colors);
  return (
    <div>
      <HvTypography variant="xsTitle" className={classes.groupName}>
        {capitalize(startCase(name))}
      </HvTypography>
      <div className={classes.colors}>
        {keys.map((color, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx} className={classes.colorContainer}>
            <div className={classes.colorSquare} style={{ backgroundColor: colors[color] }} />
            <span className={classes.colorName}>
              <HvTypography variant="highlightText">{color}</HvTypography>
              &nbsp;
              <HvTypography variant="normalText"> {colors[color]}</HvTypography>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ColorsGroup = ({ classes, keys, colors }) => (
  <div className={classes.colorGroup}>
    {keys.map((group, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <Group key={idx} classes={classes} name={group} colors={colors[group]} />
    ))}
  </div>
);

const Colors = ({ classes, theme }) => {
  return (
    <div>
      <HvTypography variant="mTitle">Main Palette</HvTypography>
      <ColorsGroup
        keys={Object.keys(theme.hv.palette)}
        colors={theme.hv.palette}
        classes={classes}
      />
      <HvTypography variant="mTitle">Visualizations Palette</HvTypography>
      <ColorsGroup
        keys={Object.keys(theme.hv.viz.palette)}
        colors={theme.hv.viz.palette}
        classes={classes}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Colors);
