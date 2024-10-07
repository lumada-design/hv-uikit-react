import { ReactElement, ReactNode, useState } from "react";
import { css } from "@emotion/css";
import { clsx } from "clsx";
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";
import {
  getVarValue,
  HvAccordion,
  HvDropdown,
  HvLabel,
  HvSwitch,
  HvTypography,
  theme,
  themes,
  useTheme,
} from "@hitachivantara/uikit-react-core";

const tokens: string[] = [
  "breakpoints",
  "colors",
  "radii",
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

type ThemeName = keyof typeof themes;

const defaultThemes: {
  id: ThemeName;
  label: string;
  selected: boolean;
}[] = [...Object.keys(themes)].map((name) => ({
  id: name as ThemeName,
  label: extractName(name),
  selected: name === "ds5" || false,
}));

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
    border: `1px solid ${theme.colors.secondary}`,
  }),
  positive: css({
    color: theme.colors.positive,
  }),
  neutral: css({
    color: theme.colors.neutral,
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

export const ThemeStructure = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName | undefined>(
    defaultThemes.find((t) => t.selected)?.id,
  );
  const [showComponents, setShowComponents] = useState<boolean>(false);

  const { rootId } = useTheme();

  const renderClasses = (
    value: object | string | number,
    label: string,
    level: number,
  ): ReactElement => {
    return (
      <HvAccordion
        key={`${label}-${level}`}
        classes={{
          root: clsx(
            css({ paddingLeft: levelSpacing(level) }),
            styles.accordionRoot,
          ),
          container: styles.accordionContainer,
          label: styles.accordionLabel,
        }}
        headingLevel={1}
        label={label}
      >
        <HvCodeEditor
          height={420}
          language="json"
          value={JSON.stringify(value, null, "\t")}
          options={{ readOnly: true }}
        />
      </HvAccordion>
    );
  };

  const renderLevel = (
    value: object | string | number | undefined,
    label: string,
    level: number,
  ): ReactElement => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      // Level
      return (
        <HvAccordion
          key={`${label}-${level}`}
          classes={{
            root: clsx(
              css({ paddingLeft: levelSpacing(level) }),
              styles.accordionRoot,
            ),
            container: styles.accordionContainer,
            label: styles.accordionLabel,
          }}
          headingLevel={1}
          label={label}
        >
          {Object.keys(value).map((key) => {
            if (key === "classes") {
              return renderClasses(
                value[key as keyof typeof value],
                key,
                level,
              );
            }
            return renderLevel(
              value[key as keyof typeof value],
              key,
              level + 1,
            );
          })}
        </HvAccordion>
      );
    }
    if (typeof value === "string" && value.trim().startsWith("#")) {
      // Color value
      return (
        <ThemeValue key={`${label}-${level}`} level={level} label={label}>
          <div className={styles.colorBox} style={{ backgroundColor: value }} />
          <HvTypography variant="label" classes={{ root: styles.positive }}>
            {value}
          </HvTypography>
        </ThemeValue>
      );
    }
    if (typeof value === "string") {
      const processedValue: string = value.includes("var(--")
        ? getVarValue(value, rootId) || ""
        : value;

      if (processedValue.trim().startsWith("#")) {
        // Color value
        return renderLevel(processedValue, label, level);
      }
      // String value
      return (
        <ThemeValue key={`${label}-${level}`} level={level} label={label}>
          <HvTypography variant="label" classes={{ root: styles.positive }}>
            {processedValue}
          </HvTypography>
        </ThemeValue>
      );
    }
    // Other value: number, etc
    return (
      <ThemeValue key={`${label}-${level}`} level={level} label={label}>
        <HvTypography variant="label" classes={{ root: styles.neutral }}>
          {value}
        </HvTypography>
      </ThemeValue>
    );
  };

  return (
    <div>
      <div className={styles.controls}>
        <HvDropdown
          classes={{ root: styles.dropdown }}
          onChange={(selected) => {
            setSelectedTheme(selected?.id);
          }}
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
              (p) => (showComponents || tokens.includes(p)) && p !== "name",
            )
            .map((key) =>
              renderLevel(
                themes[selectedTheme][key as keyof typeof themes.ds3],
                key,
                1,
              ),
            )}
        </div>
      )}
    </div>
  );
};
