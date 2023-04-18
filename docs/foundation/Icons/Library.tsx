import {
  HvDropdown,
  HvInput,
  HvStack,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  icons as iconComponentList,
  pictograms as pictogramComponentList,
} from "@hitachivantara/uikit-react-icons";
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
    <Component iconSize={iconSize} />
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

const Library = ({
  isIcons,
  search,
  sizeDropdown,
  size,
  iconList,
}: {
  isIcons?: boolean;
  search?: boolean;
  sizeDropdown?: boolean;
  size?: string;
  iconList?;
}) => {
  const [iconSize, setIconSize] = useState<(typeof dropdownSizes)[0]>({
    id: "1",
    label: "S",
    selected: true,
  });
  const library = isIcons ? iconComponentList : pictogramComponentList;

  const [libraryResults, setLibraryResults] = useState<any>(library);

  const handleIconSearch = (searchTerm: string) => {
    const filteredLibrary = Object.keys(library)
      .filter((key) => key.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: library[key],
        });
      }, {});
    setLibraryResults(filteredLibrary);
  };

  return (
    <>
      <HvStack style={{ padding: "20px 0", width: 220 }}>
        {sizeDropdown && (
          <HvDropdown
            label="Select icon size"
            values={dropdownSizes}
            multiSelect={false}
            onChange={(item) => setIconSize(item)}
            notifyChangesOnFirstRender
          />
        )}
        {search && (
          <HvInput
            aria-label="Search Icons"
            onChange={(e, value) => handleIconSearch(value)}
            placeholder="Search"
            type="search"
          />
        )}
      </HvStack>
      <Group
        iconSize={size ? size : iconSize.label}
        widerSpacing={!isIcons}
        iconsLibrary={iconList ? iconList : libraryResults}
      />
    </>
  );
};

export default Library;
