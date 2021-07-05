import React, { useState } from "react";
import { HvDropdown, HvTypography, HvLabel } from "@hv/uikit-react-core";

const iconContainer = {
  margin: "5px",
  padding: "5px",
  width: "140px",
  display: "inherit",
  flexDirection: "column",
  alignItems: "center",
};

const widerIconContainer = {
  margin: "15px",
  padding: "15px",
  width: "200px",
  display: "inherit",
  flexDirection: "column",
  alignItems: "center",
};

const dropdownSizes = [
  { id: "0", label: "XS" },
  { id: "1", label: "S", selected: true },
  { id: "2", label: "M" },
  { id: "3", label: "L" },
];

const Group = ({ iconSize, widerSpacing, iconsLibrary }) => {
  const keys = Array.from(new Set([...Object.keys(iconsLibrary)])).sort();
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {keys.map((icon) => (
        <Icon
          widerSpacing={widerSpacing}
          key={icon}
          name={icon}
          Component={iconsLibrary[icon]}
          iconSize={iconSize}
        />
      ))}
    </div>
  );
};

const Icon = ({ widerSpacing, name, Component, iconSize }) => (
  <div style={widerSpacing ? widerIconContainer : iconContainer}>
    <Component iconSize={iconSize && iconSize.label} />
    <HvTypography style={{ margin: "6px 0" }} variant="placeholderText">
      {name}
    </HvTypography>
  </div>
);

const Icons = ({ icons, widerSpacing }) => {
  const [iconSize, setIconSize] = useState(null);

  return (
    <div>
      <div style={{ padding: "20px 0", width: 220 }}>
        <HvLabel label="Select icon size">
          <HvDropdown
            values={dropdownSizes}
            multiSelect={false}
            labels={{ title: "Size selector" }}
            onChange={(item) => setIconSize(item)}
            notifyChangesOnFirstRender
          />
        </HvLabel>
      </div>
      <Group iconSize={iconSize} widerSpacing={widerSpacing} iconsLibrary={icons} />
    </div>
  );
};

export default Icons;
