import {
  createTheme,
  HvTooltip,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { GeneratorContext } from "generator/GeneratorContext";
import { useContext } from "react";
import { styles } from "./Colors.styles";
import { getColorGroupName, getColors } from "./utils";
import debounce from "lodash/debounce";

const groupsToShow = ["acce", "atmo", "base", "sema"]; // "sup", "cviz"

const Colors = (): JSX.Element => {
  const { activeTheme, selectedMode } = useTheme();
  const { customTheme, updateCustomTheme, updateChangedValues } =
    useContext(GeneratorContext);

  const colors = activeTheme?.colors.modes[selectedMode];

  const colorChangedHandler = (colorName, colorValue) => {
    const newTheme = createTheme({
      ...customTheme,
      colors: {
        ...customTheme.colors,
        modes: {
          ...customTheme.colors.modes,
          [selectedMode]: {
            ...customTheme.colors.modes[selectedMode],
            [colorName]: colorValue,
          },
        },
      },
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.(
      ["colors", "modes", selectedMode, colorName],
      colorValue
    );
  };

  const debouncedHandler = debounce(colorChangedHandler, 250);

  return (
    <div className={styles.root}>
      {groupsToShow.map((group) => {
        const groupColors = getColors(colors, group);
        return (
          <div className={styles.group} key={group}>
            <div className={styles.groupName}>
              <HvTypography variant="label">
                {getColorGroupName(group)}
              </HvTypography>
            </div>
            <div className={styles.groupColors}>
              {Object.keys(groupColors).map((c) => {
                return (
                  <HvTooltip
                    key={c}
                    title={
                      <div className={styles.tooltip}>
                        <HvTypography variant="label">{c}</HvTypography>
                        <HvTypography>
                          {customTheme?.colors?.modes?.[selectedMode]?.[c] ||
                            groupColors[c]}
                        </HvTypography>
                      </div>
                    }
                  >
                    <input
                      key={c}
                      type="color"
                      className={styles.color}
                      value={
                        (customTheme &&
                          customTheme.colors &&
                          customTheme.colors.modes[selectedMode] &&
                          customTheme.colors.modes?.[selectedMode][c]) ||
                        groupColors[c]
                      }
                      onChange={(e) => {
                        debouncedHandler(c, e.target.value);
                      }}
                    />
                  </HvTooltip>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Colors;
