import { HvTypography, HvDropdown } from "@hitachivantara/uikit-react-core";
import {
  icons as iconComponentList,
  pictograms as pictogramComponentList,
} from "@hitachivantara/uikit-react-icons";
import React, { useState } from "react";

const iconContainer = {
  margin: "5px",
  padding: "5px",
  width: "140px",
  display: "inherit",
  flexDirection: "column" as "column",
  alignItems: "center",
};

const widerIconContainer = {
  margin: "15px",
  padding: "15px",
  width: "200px",
  display: "inherit",
  flexDirection: "column" as "column",
  alignItems: "center",
};

const dropdownSizes = [
  { id: "0", label: "XS" },
  { id: "1", label: "S", selected: true },
  { id: "2", label: "M" },
  { id: "3", label: "L" },
];

const Icon = ({ widerSpacing, name, Component, iconSize }) => (
  <div style={widerSpacing ? widerIconContainer : iconContainer}>
    <Component iconSize={iconSize && iconSize.label} />
    <HvTypography style={{ margin: "6px 0" }} variant="caption1">
      {name}
    </HvTypography>
  </div>
);

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

const Library = ({ isIcons }) => {
  const [iconSize, setIconSize] = useState<(typeof dropdownSizes)[0]>();

  const library = isIcons ? iconComponentList : pictogramComponentList;
  return (
    <>
      <div style={{ padding: "20px 0", width: 220 }}>
        <HvDropdown
          label="Select icon size"
          values={dropdownSizes}
          multiSelect={false}
          onChange={(item) => setIconSize(item)}
          notifyChangesOnFirstRender
        />
      </div>
      <Group
        iconSize={iconSize}
        widerSpacing={!isIcons}
        iconsLibrary={library}
      />
    </>
  );
};

export default Library;
