import React from "react";
import { useTheme, withStyles } from "@material-ui/core";

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

const Group = ({ classes, name, colors }) => {
  const keys = Object.keys(colors);
  return (
    <div>
      <div className={classes.groupName}>{name}</div>
      <div className={classes.colors}>
        {keys.map((color, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx} className={classes.colorContainer}>
            <div className={classes.colorName}>{color}</div>
            <div className={classes.colorCode}>{colors[color]}</div>
            <div className={classes.colorSquare} style={{ backgroundColor: colors[color] }} />
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

const Colors = ({ classes, palettePath }) => {
  const theme = useTheme();
  const palette = palettePath ? theme.hv[palettePath].palette : theme.hv.palette;
  const keys = Object.keys(palette);
  return (
    <div>
      <ColorsGroup keys={keys} colors={palette} classes={classes} />
    </div>
  );
};

export default withStyles(styles)(Colors);
