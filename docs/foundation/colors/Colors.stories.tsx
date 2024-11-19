import { Fragment, useMemo } from "react";
import { css } from "@emotion/css";
import { Meta } from "@storybook/react";
import {
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { HvThemeColorModeStructure } from "@hitachivantara/uikit-styles";

import { themeColors } from "./themeColors";

function groupColors(colorsJson?: HvThemeColorModeStructure) {
  const colorsMap = new Map<string, string>();
  for (const [key, value] of Object.entries(colorsJson || {})) {
    colorsMap.set(key, value);
  }
  return colorsMap;
}

const classes = {
  group: css({ paddingBottom: theme.space.sm }),
  groupName: css({ marginTop: theme.space.md, marginBottom: theme.space.sm }),
  colors: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
  }),
  colorContainer: css({
    marginRight: theme.space.md,
    marginBottom: theme.space.md,
  }),
  colorName: css({
    display: "flex",
    alignItems: "baseline",
    flexDirection: "column",
  }),
  colorSquare: css({
    width: 130,
    height: 130,
    border: `1px solid ${theme.colors.atmo4}`,
    marginBottom: theme.space.xs,
  }),
};

const ColorsGroup = ({
  selectedTheme = "ds5",
  colors,
}: {
  selectedTheme: string;
  colors: Map<string, string>;
}) => {
  return (
    <div
      style={{
        backgroundColor: theme.colors.backgroundColor,
        padding: theme.space.xs,
      }}
    >
      {Object.keys(themeColors[selectedTheme]).map((group) => (
        <div key={group}>
          <div className={classes.group}>
            <div>
              <HvTypography className={classes.groupName} variant="title2">
                {group}
              </HvTypography>
              <div className={classes.colors}>
                {Object.values(themeColors[selectedTheme][group]).map(
                  (color, idx) => (
                    <Fragment key={color}>
                      <div
                        style={{
                          width: 0,
                          flexBasis:
                            color.includes("cat") &&
                            selectedTheme === "ds5" &&
                            idx !== 0 &&
                            idx % 9 === 0
                              ? "100%"
                              : "",
                        }}
                      />
                      <div className={classes.colorContainer}>
                        <div
                          className={classes.colorSquare}
                          style={{
                            backgroundColor: colors.get(color),
                          }}
                        />
                        <span className={classes.colorName}>
                          <HvTypography variant="label">{color}</HvTypography>
                          <HvTypography variant="caption1">
                            {colors.get(color)}
                          </HvTypography>
                        </span>
                      </div>
                    </Fragment>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={classes.group}>
        <HvTypography className={classes.groupName} variant="title2">
          Shadow
        </HvTypography>
        <div className={classes.colorContainer}>
          <div
            className={classes.colorSquare}
            style={{
              backgroundColor: theme.colors.atmo1,
              boxShadow: theme.colors.shadow,
            }}
          />
          <span className={classes.colorName}>
            <HvTypography variant="label">Shadow</HvTypography>
            <HvTypography variant="caption1">
              {colors.get("shadow")}
            </HvTypography>
          </span>
        </div>
      </div>
    </div>
  );
};

export default {
  title: "Foundation/Colors",
} satisfies Meta;

export const Colors = () => {
  const { selectedTheme, colors } = useTheme();
  const allColors = useMemo(() => groupColors(colors), [colors]);

  return (
    allColors && (
      <ColorsGroup selectedTheme={selectedTheme} colors={allColors} />
    )
  );
};
