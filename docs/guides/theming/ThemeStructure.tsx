/* eslint-disable import/namespace */

import { ReactElement, ReactNode, useState } from "react";
import {
  HvDropdown,
  HvAccordion,
  HvTypography,
  HvSwitch,
  HvLabel,
  themes,
  theme,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";
import clsx from "clsx";

const tokens: string[] = [
  "breakpoints",
  "colors",
  "radii",
  "shadows",
  "sizes",
  "zIndices",
  "space",
  "fontSizes",
  "fontFamily",
  "fontWeights",
  "lineHeights",
];

const extractName = (name: string): string => {
  return name.replace("ds", "Design System ");
};

const defaultThemes = [...Object.keys(themes)].map((name) => ({
  id: name,
  label: extractName(name),
  selected: name === "ds5" || false,
}));

export const ThemeStructure = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(
    defaultThemes.find((t) => t.selected)?.id
  );
  const [showComponents, setShowComponents] = useState<boolean>(false);

  const getVarValue = (cssVar: string): string => {
    // Creating a temporary element to get CSS variables
    const tempEl = document.createElement("div");
    tempEl.style.setProperty("--temp", cssVar);
    document.body.appendChild(tempEl);
    const computedValue = getComputedStyle(tempEl)
      .getPropertyValue("--temp")
      .trim();
    document.body.removeChild(tempEl);

    return computedValue;
  };

  const styles = {
    controls: css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: theme.spacing("sm"),
      gap: theme.spacing("sm"),
      flexWrap: "wrap",
    }),
    dropdown: css({ width: "200px" }),
    switchContainer: css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    }),
    switch: css({ marginRight: theme.spacing("xs") }),
    tree: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    }),
    accordionRoot: css({ width: "100%", "& > h1": { height: "25px" } }),
    accordionContainer: css({ padding: 0 }),
    accordionLabel: css({ height: "25px" }),
    themeValue: css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    }),
    colorBox: css({
      height: "16px",
      width: "16px",
      marginRight: theme.space.xs,
      border: `1px solid ${theme.colors.acce1}`,
    }),
    sema1: css({
      color: theme.colors.sema1,
    }),
    sema2: css({
      color: theme.colors.sema2,
    }),
  };

  const levelSpacing = (level: number): string => {
    return theme.spacing(1 + level);
  };

  const ThemeValue = ({
    children,
    level,
    label,
  }: {
    children: ReactNode;
    level: number;
    label: string;
  }) => (
    <div
      className={styles.themeValue}
      style={{
        paddingLeft: levelSpacing(level),
      }}
    >
      <HvTypography variant="label">{label}: &nbsp;</HvTypography>
      {children}
    </div>
  );

  const renderLevel = (
    value: object | string | number,
    label: string,
    level: number
  ): ReactElement => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      // Level
      return (
        <HvAccordion
          key={`${label}-${level}`}
          classes={{
            root: clsx(
              css({ paddingLeft: levelSpacing(level) }),
              styles.accordionRoot
            ),
            container: styles.accordionContainer,
            label: styles.accordionLabel,
          }}
          headingLevel={1}
          label={label}
        >
          {Object.keys(value).map((key) =>
            renderLevel(value[key], key, level + 1)
          )}
        </HvAccordion>
      );
    } else if (typeof value === "string" && value.trim().startsWith("#")) {
      // Color value
      return (
        <ThemeValue key={`${label}-${level}`} level={level} label={label}>
          <div className={styles.colorBox} style={{ backgroundColor: value }} />
          <HvTypography variant="label" classes={{ root: styles.sema1 }}>
            {value}
          </HvTypography>
        </ThemeValue>
      );
    } else if (typeof value === "string") {
      const processedValue: string = value.includes("var(--")
        ? getVarValue(value)
        : value;

      if (processedValue.trim().startsWith("#")) {
        // Color value
        return renderLevel(processedValue, label, level);
      } else {
        // String value
        return (
          <ThemeValue key={`${label}-${level}`} level={level} label={label}>
            <HvTypography variant="label" classes={{ root: styles.sema1 }}>
              "{processedValue}"
            </HvTypography>
          </ThemeValue>
        );
      }
    } else {
      // Other value: number, etc
      return (
        <ThemeValue key={`${label}-${level}`} level={level} label={label}>
          <HvTypography variant="label" classes={{ root: styles.sema2 }}>
            {value}
          </HvTypography>
        </ThemeValue>
      );
    }
  };

  return (
    <div>
      <div className={styles.controls}>
        <HvDropdown
          classes={{ root: styles.dropdown }}
          onChange={(v) => setSelectedTheme(v.id)}
          values={defaultThemes}
        />
        <div className={styles.switchContainer}>
          <HvSwitch
            classes={{ root: styles.switch }}
            checked={showComponents}
            onChange={(_, checked) => setShowComponents(checked)}
            aria-labelledby="show-components-switch"
          />
          <HvLabel id="show-components-switch" label="Show components" />
        </div>
      </div>
      {selectedTheme && (
        <div className={styles.tree}>
          {themes[selectedTheme].name &&
            typeof themes[selectedTheme].name === "string" &&
            renderLevel(themes[selectedTheme].name, "name", 1)}
          {Object.keys(themes[selectedTheme])
            .filter(
              (p) => (showComponents || tokens.includes(p)) && p !== "name"
            )
            .map((key) => renderLevel(themes[selectedTheme][key], key, 1))}
        </div>
      )}
    </div>
  );
};
