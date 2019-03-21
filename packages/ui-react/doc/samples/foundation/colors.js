import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import theme from "@hv-ui/themes/dist/theme.json";

const styles = () => ({
  group: {
    marginBottom: 20
  },
  groupName: {
    ...theme.typography.mediumTitle,
    marginBottom: 15
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
    border: `1px solid ${theme.palette.atmosphere.atmo5}`,
    margin: "0 20px 20px 0"
  },
  colorName: {
    ...theme.typography.highlightText
  },
  colorCode: {
    ...theme.typography.infoText
  }
});

const Group = ({ classes, name, colors }) => {
  const keys = Object.keys(colors);

  return (
    <div className={classes.group}>
      <div className={classes.groupName}>{name}</div>
      <div className={classes.colors}>
        {keys.map((color, idx) => (
          <div key={idx} className={classes.colorContainer}>
            <div className={classes.colorName}>{color}</div>
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

const Colors = ({ classes }) => {
  const { palette } = theme;
  const keys = Object.keys(palette);

  return (
    <div>
      {keys.map((group, idx) => (
        <Group
          key={idx}
          classes={classes}
          name={group}
          colors={palette[group]}
        />
      ))}
    </div>
  );
};

export default withStyles(styles)(Colors);
