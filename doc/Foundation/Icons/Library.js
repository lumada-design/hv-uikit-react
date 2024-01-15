import React, { useState } from "react";
import { HvDropdown, HvTypography } from "@hitachivantara/uikit-react-core";
import * as iconComponentList from "@hitachivantara/uikit-react-icons";

const iconContainer = {
  margin: "5px",
  padding: "5px",
  width: "140px",
  display: "inherit",
  flexDirection: "column",
  alignItems: "center"
};

const dropdownSizes = [
  { id: "0", label: "XS" },
  { id: "1", label: "S", selected: true },
  { id: "2", label: "M" },
  { id: "3", label: "L" }
];

const keys = Array.from(new Set([...Object.keys(iconComponentList)])).sort();

const Group = ({ iconSize }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {keys.map(icon => (
        <Icon key={icon} name={icon} Component={iconComponentList[icon]} iconSize={iconSize} />
      ))}
    </div>
  );
};

const Icon = ({ name, Component, iconSize }) => (
  <div style={iconContainer}>
    <Component iconSize={iconSize && iconSize.label} />
    <HvTypography style={{ margin: "6px 0" }} variant="placeholderText">
      {name}
    </HvTypography>
  </div>
);

const Icons = () => {
  const [iconSize, setIconSize] = useState(null);

  return (
    <div>
      <div style={{ padding: "20px 0" }}>
        <HvDropdown
          values={dropdownSizes}
          multiSelect={false}
          labels={{ title: "Size selector" }}
          onChange={item => setIconSize(item)}
          notifyChangesOnFirstRender
        />
      </div>
      <Group iconSize={iconSize} />
    </div>
  );
};

export default Icons;
