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
import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import { iconCategories } from "./IconCategories";

type IconCategory = keyof typeof iconCategories;

const iconKeys = Object.keys(iconCategories) as IconCategory[];

const iconList = { ...iconComponentList, ...pictogramComponentList };

const classes = {
  iconContainer: css({
    width: 112, // L width
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }),
  text: css({
    textAlign: "center",
    width: "100%",
    height: 36,
  }),
  group: css({
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  }),
  grid: css({
    maxWidth: 400,
    paddingBottom: "20px",
  }),
};

const dropdownSizes = [
  { id: "0", label: "XS" },
  { id: "1", label: "S", selected: true },
  { id: "2", label: "M" },
  { id: "3", label: "L" },
];

const Icon = ({ name, Component, iconSize }) => (
  <div className={classes.iconContainer} title={name}>
    <Component iconSize={iconSize} />
    <HvTypography variant="caption1" className={classes.text}>
      {name}
    </HvTypography>
  </div>
);

const Group = ({ iconSize, iconsLibrary }) => {
  const keys = Array.from(new Set([...Object.keys(iconsLibrary)])).sort();
  return (
    <div className={classes.group}>
      {keys.map((icon) => (
        <Icon
          key={icon}
          name={icon}
          Component={iconsLibrary[icon]}
          iconSize={iconSize}
        />
      ))}
    </div>
  );
};

const Library = () => {
  const [search, setSearch] = useState("");
  const [iconSize, setIconSize] = useState<(typeof dropdownSizes)[0]>();
  const [expandedCategories, setExpandedCategories] = useState(iconKeys);

  const isAnyExpanded = expandedCategories.length > 0;

  const filteredIcons = useMemo(() => {
    if (!search) return iconList;

    return Object.keys(iconList)
      .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
      .reduce((obj, key) => {
        obj[key] = iconList[key];
        return obj;
      }, {} as typeof iconList);
  }, [search]);

  const handleToggle = (category: IconCategory, open: boolean) => {
    setExpandedCategories((prev) => {
      const newValue = new Set(prev).add(category);
      if (open) {
        newValue.delete(category);
      }

      return [...newValue];
    });
  };

  const handleAll = (option: boolean) => {
    setExpandedCategories(option ? iconKeys : []);
  };

  const filterByCategory = (category: IconCategory) => {
    const categoryKeys = iconCategories[category];

    return Object.keys(filteredIcons)
      .filter((key) => categoryKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = filteredIcons[key];
        return obj;
      }, {});
  };

  return (
    <>
      <HvSimpleGrid spacing="sm" cols={2} className={classes.grid}>
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
          value={search}
          onChange={(e, value) => setSearch(value)}
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
        {!search ? (
          iconKeys.map((category) => (
            <HvAccordion
              key={`${category}Accordion`}
              label={category}
              expanded={expandedCategories.includes(category)}
              onChange={(evt, open) => handleToggle(category, open)}
            >
              <Group
                iconSize={iconSize?.label}
                iconsLibrary={filterByCategory(category)}
              />
            </HvAccordion>
          ))
        ) : (
          <div style={{ height: 600, overflowY: "auto" }}>
            <Group iconSize={iconSize?.label} iconsLibrary={filteredIcons} />
          </div>
        )}
      </HvBox>
    </>
  );
};

export default Library;
