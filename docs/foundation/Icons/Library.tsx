import {
  HvAccordion,
  HvBox,
  HvButton,
  HvDropdown,
  HvInput,
  HvSimpleGrid,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  icons as iconComponentList,
  pictograms as pictogramComponentList,
} from "@hitachivantara/uikit-react-icons";
import { useEffect, useState } from "react";
import iconCategories from "./IconCategories";

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

const Library = ({ isIcons }: { isIcons?: boolean }) => {
  const iconList = isIcons ? iconComponentList : pictogramComponentList;

  const [iconListResults, setIconListResults] = useState<
    typeof iconComponentList | typeof pictogramComponentList
  >(iconList);
  const [iconSize, setIconSize] = useState<(typeof dropdownSizes)[0]>();
  const [expandedState, setExpandedState] = useState(
    iconCategories.map((category) => {
      return {
        category: Object.keys(category)[0],
        open: false,
      };
    })
  );
  const [isAnyExpanded, setIsAnyExpanded] = useState(
    expandedState.some((category) => {
      return category.open === true;
    })
  );

  useEffect(() => {
    setIsAnyExpanded(
      expandedState.some((state) => {
        return state.open === true;
      })
    );
  }, [expandedState, setExpandedState]);

  const handleToggle = (category) => {
    const newExpandedState = expandedState.map((element) => {
      if (element.category === category) {
        return { ...element, open: !element.open };
      }
      return element;
    });
    setExpandedState(newExpandedState);
  };

  const handleAll = (option: boolean) => {
    setExpandedState(
      expandedState.map((category) => {
        return { ...category, open: option };
      })
    );
  };

  const handleIconSearch = (searchTerm: string) => {
    const filteredIcons = Object.keys(iconList)
      .filter((key) => key.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: iconList[key],
        });
      }, {});
    setIconListResults(filteredIcons as typeof iconComponentList);
  };

  const filterByCategory = (category: string) => {
    const categoryObject = iconCategories.find(
      (categoryE) => Object.keys(categoryE)[0] === category
    );

    if (categoryObject) {
      const categoryKeys = categoryObject[category];
      return Object.keys(iconListResults)
        .filter((key) => categoryKeys.includes(key))
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: iconListResults[key],
          });
        }, {});
    }
    return [];
  };

  return (
    <>
      <HvSimpleGrid
        spacing="sm"
        cols={2}
        style={{ maxWidth: 400, paddingBottom: "20px" }}
      >
        <HvDropdown
          label="Select icon size"
          values={dropdownSizes}
          multiSelect={false}
          onChange={(item) => setIconSize(item)}
          notifyChangesOnFirstRender
        />
        <HvInput
          label="Search All Categories"
          aria-label="Search Icons"
          onChange={(e, value) => handleIconSearch(value)}
          placeholder="Search"
          type="search"
        />
        <HvButton
          variant="secondarySubtle"
          onClick={() => handleAll(!isAnyExpanded)}
        >
          {isAnyExpanded ? "Collapse All" : "Expand All"}
        </HvButton>
      </HvSimpleGrid>
      <HvBox>
        {isIcons ? (
          expandedState.map((element) => (
            <HvAccordion
              key={`${element.category}Accordion`}
              label={element.category}
              expanded={element.open}
              onChange={() => handleToggle(element.category)}
            >
              <Group
                iconSize={iconSize?.label}
                widerSpacing={!isIcons}
                iconsLibrary={filterByCategory(element.category)}
              />
            </HvAccordion>
          ))
        ) : (
          <Group
            iconSize={iconSize?.label}
            widerSpacing={!isIcons}
            iconsLibrary={iconListResults}
          />
        )}
      </HvBox>
    </>
  );
};

export default Library;
