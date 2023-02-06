import { useState, useEffect } from "react";
import startCase from "lodash/startCase";
import capitalize from "lodash/capitalize";
import { HvTypography, theme } from "@hitachivantara/uikit-core";
import {
  StyledGroup,
  StyledGroupName,
  StyledColors,
  StyledColorContainer,
  StyledColorSquare,
  StyledColorName,
} from "./Colors.styles";

// Basic structure for the groups of colors
const baseGroups = {
  Base: {},
  Accent: {},
  Atmosphere: {},
  Semantic: {},
  Support: {},
  Categorical: {},
};

// Get the actual value of a color from its CSS variable
const getColor = (color: string) => {
  const value = getComputedStyle(document.body).getPropertyValue(
    `--colors-${color}`
  );
  return value;
};

// Populate the groups of colors
const groupColors = (colors: string[]) => {
  colors.map((c: string) => {
    if (c.includes("base")) {
      baseGroups.Base[c] = getColor(c);
    } else if (c.includes("acce")) {
      baseGroups.Accent[c] = getColor(c);
    } else if (c.includes("atmo")) {
      baseGroups.Atmosphere[c] = getColor(c);
    } else if (c.includes("sema")) {
      baseGroups.Semantic[c] = getColor(c);
    } else if (c.includes("supp")) {
      baseGroups.Support[c] = getColor(c);
    } else if (c.includes("cviz")) {
      baseGroups.Categorical[c] = getColor(c);
    }
  });
  return baseGroups;
};

const Group = ({ name, colors }) => {
  const keys = Object.keys(colors);
  return (
    <div>
      <StyledGroupName variant="title2">
        {capitalize(startCase(name))}
      </StyledGroupName>
      <StyledColors>
        {keys.map((color: string) => (
          <StyledColorContainer key={color}>
            <StyledColorSquare style={{ backgroundColor: colors[color] }} />
            <StyledColorName>
              <HvTypography variant="label">{color}</HvTypography>
              &nbsp;
              <HvTypography variant="caption1"> {colors[color]}</HvTypography>
            </StyledColorName>
          </StyledColorContainer>
        ))}
      </StyledColors>
    </div>
  );
};

const ColorsGroup = ({ keys, colors }) => {
  return (
    <StyledGroup>
      {keys.map((group: string) => (
        <Group key={group} name={group} colors={colors[group]} />
      ))}
    </StyledGroup>
  );
};

const Colors = () => {
  const [allColors, setAllColors] = useState<typeof baseGroups>();

  useEffect(() => {
    const groups = groupColors(Object.keys(theme.colors));
    setAllColors(groups);
  }, [theme]);

  return (
    allColors && (
      <div>
        <HvTypography variant="title2">Main Palette</HvTypography>
        <ColorsGroup keys={Object.keys(allColors)} colors={allColors} />
      </div>
    )
  );
};

export default Colors;
