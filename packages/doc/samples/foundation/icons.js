import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import * as genericIconComponentList from "@hv/uikit-react-icons/dist/Generic/index";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

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
    width: "140px",
    display: "inherit",
    flexDirection: "column",
    alignItems: "center"
  }
});

const dropdownSizes = [
  { id: "0", label: "XS" },
  { id: "1", label: "S", selected: true },
  { id: "2", label: "M" },
  { id: "3", label: "L" }
];

const dropdownLabels = {
  title: "Size selector",
  select: "Size..",
  selectAll: "select all",
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  multiSelectionAction: "",
  multiSelectionConjunction: ""
};

const keys = Array.from(
  new Set([...Object.keys(genericIconComponentList)])
).sort();

const Group = ({ groupLabel, classes, iconSize, colorArray = [] }) => {
  return (
    <div className={classes.groupContainer}>
      <div>
        <HvTypography variant="mTitle" className={classes.groupName}>
          {`${groupLabel} Size`}
        </HvTypography>
      </div>
      <div className={classes.iconContainers}>
        {keys.map(icon => (
          <Icon
            key={icon}
            name={icon}
            classes={classes}
            Component={genericIconComponentList[icon]}
            colorArray={colorArray}
            iconSize={iconSize}
          />
        ))}
      </div>
    </div>
  );
};

const Icon = ({ name, Component, classes, iconSize, colorArray = [] }) => (
  <div className={classes.iconContainer}>
    {Component != null ? (
      <Component iconSize={iconSize && iconSize.label} color={colorArray} />
    ) : (
      <span
        style={{
          height: "100%",
          display: "block",
          fontWeight: "bold",
          color: "orangered"
        }}
      >
        Missing!
      </span>
    )}
    <div>
      <HvTypography style={{ margin: "6px 0" }} variant={"infoText"}>
        {name}
      </HvTypography>
    </div>
  </div>
);

const Icons = ({ classes, theme }) => {
  const [iconSize, setIconSize] = useState({
    id: 2,
    label: "M",
    selected: true
  });

  return (
    <div>
      <div style={{ padding: "20px 0" }}>
        <HvDropdown
          values={dropdownSizes}
          multiSelect={false}
          labels={dropdownLabels}
          onChange={item => setIconSize(item)}
          notifyChangesOnFirstRender
        />
      </div>
      <Group
        groupLabel={"Generic"}
        classes={classes}
        theme={theme}
        iconSize={iconSize}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Icons);
