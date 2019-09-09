import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import isNil from "lodash/isNil";
import * as dawnIconComponentList from "@hv/uikit-react-icons/dist/DawnTheme/index";
import * as wickedIconComponentList from "@hv/uikit-react-icons/dist/WickedTheme/index";
import * as genericIconComponentList from "@hv/uikit-react-icons/dist/Generic/index";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";
import ColorPicker from "./colorPicker";

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

const dropdownSizes = [
  {
    id: "0",
    label: "XS"
  },
  {
    id: "1",
    label: "S"
  },
  {
    id: "2",
    label: "M"
  },
  {
    id: "3",
    label: "L",
    selected: true
  },
  {
    id: "4",
    label: "XL"
  }
];

const labels = {
  title: "Size selector",
  select: "Size..",
  selectAll: "select all",
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  multiSelectionAction: "",
  multiSelectionConjunction: ""
};


const GenericLabel = "Generic";

const keys = Array.from(
  new Set([...Object.keys(genericIconComponentList)])
).sort();

const deprecatedKeys = Array.from(
  new Set([
    ...Object.keys(dawnIconComponentList),
    ...Object.keys(wickedIconComponentList)
  ])
).sort();

const keysBySize = deprecatedKeys.reduce(
  (map, value) => {
    var size = value.charAt(value.length - 1);
    if (value.endsWith("XS")) {
      size = "XS";
    }

    if (map[size]) {
      map[size].push(value);
    }

    return map;
  },
  {
    XS: [],
    S: [],
    M: [],
    L: []
  }
);

const Group = ({ groupLabel, classes, iconSize, colorArray = [], theme }) => {
  const iconComponentList =
    theme.hv.type === "dark" ? wickedIconComponentList : dawnIconComponentList;
  return (
    <div className={classes.groupContainer}>
      <div>
        <HvTypography variant="mTitle" className={classes.groupName}>
          {`${groupLabel} Size`}
        </HvTypography>
      </div>
      <div className={classes.iconContainers}>
        {groupLabel !== GenericLabel
          ? keysBySize[groupLabel].map(icon => (
              <Icon
                key={icon}
                name={icon}
                classes={classes}
                Component={iconComponentList[icon]}
                iconSize={iconSize}
              />
            ))
          : keys.map(icon => (
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
      <Component iconSize={iconSize.label} color={colorArray}/>
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
      <HvTypography 
        style={{
          margin: "5px 0"
        }} 
      variant={"disabledText"}>{name}</HvTypography>
    </div>
  </div>
);

const Icons = ({ classes, theme }) => {

  const [iconSize, setIconSize] = useState(
    {
      id: 2,
      label: "XL",
      selected: true
    }
  );

  const [colorArray, setColorArray] = useState([])

  const applyCallback = colorList => {
    let colorArray = [];
    if(isNil(colorList) || !Array.isArray(colorList) || colorList.length < 1) {
      return;
    }
    colorList.forEach(item => {
      colorArray.push(item.label)
    })
    setColorArray(colorArray);
  }

  const clearCallback = () => {
    setColorArray([]);
  }

  return (
    <div>
      <div style={{ padding: "20px 0" }}>
        <HvDropdown
          values={dropdownSizes}
          multiSelect={false}
          labels={labels}
          onChange={item => {
            setIconSize(item);
          }}
          notifyChangesOnFirstRender
        />
        <ColorPicker 
          applyCallback={applyCallback}
          clearCallback={clearCallback}
        />
      </div>
      <Group groupLabel={GenericLabel} classes={classes} theme={theme} iconSize={iconSize} colorArray={colorArray}/>
      <HvTypography variant="lTitle" style={{ padding: "20px 0" }}>
        Deprecated Icons
      </HvTypography>
      <Group groupLabel="XS" classes={classes} theme={theme} iconSize={iconSize}/>
      <Group groupLabel="S" classes={classes} theme={theme} iconSize={iconSize}/>
      <Group groupLabel="M" classes={classes} theme={theme} iconSize={iconSize}/>
      <Group groupLabel="L" classes={classes} theme={theme} iconSize={iconSize}/>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Icons);
