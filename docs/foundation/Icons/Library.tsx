import { ComponentType, useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  HvInput,
  HvOption,
  HvSelect,
  HvSimpleGrid,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  IconBaseProps,
  icons as iconComponentList,
  IconSize,
  IconType,
  pictograms as pictogramComponentList,
} from "@hitachivantara/uikit-react-icons";

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

const Icon = ({
  name,
  Component,
  iconSize,
}: {
  name: string;
  Component: ComponentType<IconBaseProps>;
  iconSize: IconSize;
}) => (
  <div className={classes.iconContainer} title={name}>
    <Component iconSize={iconSize} />
    <HvTypography variant="caption1" className={classes.text}>
      {name}
    </HvTypography>
  </div>
);

const Group = ({
  iconSize,
  iconsLibrary,
}: {
  iconsLibrary: Record<string, IconType>;
  iconSize: IconSize;
}) => {
  const keys = Array.from(new Set(Object.keys(iconsLibrary))).sort();
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
  const [iconSize, setIconSize] = useState<IconSize>("S");

  const filteredIcons = useMemo(() => {
    if (!search) return iconList;

    return Object.keys(iconList)
      .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
      .reduce<Record<string, IconType>>((obj, key) => {
        obj[key] = iconList[key as keyof typeof iconList];
        return obj;
      }, {});
  }, [search]);

  return (
    <>
      <HvSimpleGrid spacing="sm" cols={2} className={classes.grid}>
        <HvSelect
          label="Select icon size"
          value={iconSize}
          onChange={(evt, newValue) => setIconSize(newValue!)}
        >
          <HvOption value="XS">XS</HvOption>
          <HvOption value="S">S</HvOption>
          <HvOption value="M">M</HvOption>
          <HvOption value="L">L</HvOption>
        </HvSelect>
        <HvInput
          label="Search All Categories"
          aria-label="Search Icons"
          value={search}
          onChange={(e, value) => setSearch(value)}
          placeholder="Search"
          type="search"
        />
      </HvSimpleGrid>
      <div style={{ height: 600, overflowY: "auto" }}>
        <Group iconSize={iconSize} iconsLibrary={filteredIcons} />
      </div>
    </>
  );
};

export default Library;
