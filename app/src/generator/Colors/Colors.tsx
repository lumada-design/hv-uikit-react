import {
  HvTooltip,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { useGeneratorContext } from "generator/GeneratorContext";
import debounce from "lodash/debounce";
import { HvThemeTokens } from "@hitachivantara/uikit-styles";
import { styles } from "./Colors.styles";
import { getColorGroupName, getColors, groupsToShow } from "./utils";

const Colors = (): JSX.Element => {
  const { activeTheme, selectedMode } = useTheme();
  const { customTheme, updateCustomTheme } = useGeneratorContext();

  const colors = activeTheme?.colors.modes[selectedMode];

  const colorChangedHandler = (colorName: string, colorValue: string) => {
    updateCustomTheme({
      colors: {
        modes: {
          [selectedMode]: {
            [colorName]: colorValue,
          },
        },
      },
    });
  };

  const debouncedHandler = debounce(colorChangedHandler, 250);

  return (
    <div className={styles.root}>
      <div className={styles.group}>
        <div className={styles.groupName}>
          <HvTypography variant="label">Background</HvTypography>
        </div>
        <div className={styles.groupColors}>
          <HvTooltip
            title={
              <div className={styles.tooltip}>
                <HvTypography variant="label">Background color</HvTypography>
                <HvTypography>
                  {customTheme?.colors?.modes?.[selectedMode]?.backgroundColor}
                </HvTypography>
              </div>
            }
          >
            <input
              type="color"
              className={styles.color}
              value={
                customTheme &&
                customTheme.colors &&
                customTheme.colors.modes[selectedMode] &&
                customTheme.colors.modes?.[selectedMode].backgroundColor
              }
              onChange={(e) => {
                debouncedHandler("backgroundColor", e.target.value);
              }}
            />
          </HvTooltip>
        </div>
      </div>
      {groupsToShow.map((group) => {
        const groupColors = getColors(group, colors);
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
                    enterDelay={500}
                    title={
                      <div className={styles.tooltip}>
                        <HvTypography variant="label">{c}</HvTypography>
                        <HvTypography>
                          {customTheme?.colors?.modes?.[selectedMode]?.[
                            c as keyof HvThemeTokens["colors"]
                          ] || groupColors[c]}
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
                          customTheme.colors.modes?.[selectedMode][
                            c as keyof HvThemeTokens["colors"]
                          ]) ||
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
