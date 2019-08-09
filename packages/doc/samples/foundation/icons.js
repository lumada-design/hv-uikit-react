import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import * as dawnIconComponentList from "@hv/uikit-react-icons/dist/DawnTheme/index";
import * as wickedIconComponentList from "@hv/uikit-react-icons/dist/WickedTheme/index";

const styles = theme => ({
  groupContainer: {
    paddingBottom: "30px"
  },
  groupName: {
    marginBotton: "15px"
  },
  iconContainers: {
    display: "flex",
    flexWrap: "wrap"
  },

  iconContainer: {
    margin: "5px",
    padding: "5px",
    minWidth: "200px",
    display: "inherit",
    flexDirection: "column",
    alignItems: "center"
  }
});

const keys = Array.from(new Set([...Object.keys(dawnIconComponentList), ...Object.keys(wickedIconComponentList)])).sort();

const keysBySize = keys.reduce((map, value) => {
  var size = value.charAt(value.length-1);
  if(value.endsWith('XS')) {
    size = 'XS';
  }

  if(map[size]) {
    map[size].push(value);
  }

  return map;
}, {
  "XS": [],
  "S": [],
  "M": [],
  "L": []
});

const Group = ({ groupLabel, classes, theme }) => {
  const groupLabelLength = groupLabel.length * -1;

  const iconComponentList = theme.hv.type === 'dark' ? wickedIconComponentList : dawnIconComponentList;

  return (
    <div className={classes.groupContainer}>
      <div>
        <HvTypography variant="mTitle" className={classes.groupName}>
          {`Size ${groupLabel}`}
        </HvTypography>
      </div>
      <div className={classes.iconContainers}>
        {keysBySize[groupLabel]
          .map(icon => (
            <Icon
              key={icon}
              name={icon}
              classes={classes}
              Component={iconComponentList[icon]}
            />
          ))}
      </div>
    </div>
  );
};

const Icon = ({ name, Component, classes }) => (
  <div className={classes.iconContainer}>
    { Component != null ?
      (
        <Component />
      ) : (
        <span style={{height: "100%", display: "block", fontWeight: "bold", color: "orangered"}}>Missing!</span>
      )
    }
    <div>
      <HvTypography variant={"disabledText"}>{name}</HvTypography>
    </div>
  </div>
);

const Icons = ({ classes, theme }) => {
  return (
    <div>
      <Group groupLabel="XS" classes={classes} theme={theme} />
      <Group groupLabel="S" classes={classes} theme={theme} />
      <Group groupLabel="M" classes={classes} theme={theme} />
      <Group groupLabel="L" classes={classes} theme={theme} />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Icons);
