import { HvTypography } from "@hitachivantara/uikit-core";
import { useState } from "react";

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

const Icons = ({ icons, widerSpacing }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [iconSize, setIconSize] = useState<typeof dropdownSizes[0]>();

  return (
    <div>
      <div style={{ padding: "20px 0", width: 220 }}>
        {/* <HvDropdown
          label="Select icon size"
          values={dropdownSizes}
          multiSelect={false}
          onChange={(item) => setIconSize(item)}
          notifyChangesOnFirstRender
        /> */}
        <label>Select icon size:</label>
        <select
          style={{
            backgroundColor: "white",
            padding: 5,
            border: "1px solid #CCCED0",
            borderRadius: 2,
          }}
          onChange={(item) => {
            console.log(
              dropdownSizes.filter(
                (d) => d.id === item.target.selectedIndex.toString()
              )
            );
            setIconSize(
              dropdownSizes.filter(
                (d) => d.id === item.target.selectedIndex.toString()
              )[0]
            );
          }}
        >
          <option label="XS" id="0" />
          <option label="S" id="1" selected />
          <option label="M" id="2" />
          <option label="L" id="3" />
        </select>
      </div>
      <Group
        iconSize={iconSize}
        widerSpacing={widerSpacing}
        iconsLibrary={icons}
      />
    </div>
  );
};

export default Icons;
