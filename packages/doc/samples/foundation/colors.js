import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@hv/uikit-react-core/dist/Typography";

const styles = theme => ({
  colorGroup: {
    paddingBottom: "50px"
  },
  title: {
    paddingBottom: "20px"
  },
  groupName: {
    ...theme.hv.typography.mTitle,
    marginBottom: "15px"
  },
  colors: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flexStart",
    flexDirection: "row"
  },
  colorContainer: {},
  colorSquare: {
    width: 150,
    height: 150,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    margin: "0 20px 20px 0"
  },
  colorName: {
    ...theme.hv.typography.highlightText
  },
  colorCode: {
    ...theme.hv.typography.infoText
  }
});

const Group = ({ classes, name, deprecated, colors }) => {
  const keys = Object.keys(colors);
  debugger;
  return (
    <div>
      <div className={classes.groupName}>{name}</div>
      <div className={classes.colors}>
        {keys.map((color, idx) => (
          <div key={idx} className={classes.colorContainer}>
            <div className={classes.colorName}>{`${color} ${
              deprecated[color] ? "(deprecated)" : ""
            }`}</div>
            <div className={classes.colorCode}>{colors[color]}</div>
            <div
              className={classes.colorSquare}
              style={{ backgroundColor: colors[color] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ColorsGroup = ({ classes, title, keys, deprecated, colors }) => (
  <div className={classes.colorGroup}>
    {keys.map((group, idx) => (
      <Group
        key={idx}
        classes={classes}
        name={group}
        deprecated={deprecated[group]}
        colors={colors[group]}
      />
    ))}
  </div>
);

const Colors = ({ classes, theme, palettePath, deprecatedPath }) => {
  debugger;
  const palette = palettePath
    ? theme.hv[palettePath].palette
    : theme.hv.palette;
  const deprecate = deprecatedPath
    ? theme.hv.deprecated[deprecatedPath].palette
    : theme.hv.deprecated.palette;
  const keys = Object.keys(palette);
  return (
    <div>
      <ColorsGroup
        keys={keys}
        deprecated={deprecate}
        colors={palette}
        classes={classes}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Colors);
