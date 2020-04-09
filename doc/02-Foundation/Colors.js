/* eslint-disable import/no-extraneous-dependencies,import/no-unresolved,react/prop-types */
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useTheme } from "@material-ui/core";
import Typography from "@hv/uikit-react-core/dist/Typography";

const styles = theme => ({
  colorGroup: {
    paddingBottom: "50px"
  },
  title: {
    paddingBottom: "20px"
  },
  groupName: {
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
  }
});

const Group = ({ classes, name, colors }) => {
  const keys = Object.keys(colors);
  return (
    <div>
      <Typography variant="mTitle" className={classes.groupName}>
        {name}
      </Typography>
      <div className={classes.colors}>
        {keys.map((color, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx} className={classes.colorContainer}>
            <Typography variant="highlightText">{color}</Typography>
            <Typography variant="infoText">{colors[color]}</Typography>
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
