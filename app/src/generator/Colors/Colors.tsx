import {
  HvTooltip,
  HvTypography,
  HvColorPicker,
  useTheme,
  baseDropdownClasses,
} from "@hitachivantara/uikit-react-core";

import { HvThemeTokens } from "@hitachivantara/uikit-styles";
import { css } from "@emotion/css";

import { useGeneratorContext } from "generator/GeneratorContext";

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
            <div>
              <HvColorPicker
                iconOnly
                defaultValue={
                  customTheme &&
                  customTheme.colors &&
                  customTheme.colors.modes[selectedMode] &&
                  customTheme.colors.modes?.[selectedMode].backgroundColor
                }
                onChangeComplete={(color) =>
                  colorChangedHandler("backgroundColor", color)
                }
                classes={{
                  root: css({ width: 24, height: 24 }),
                  headerColorIconOnly: css({ width: 24, height: 24 }),
                  dropdownRootIconOnly: css({
                    width: 24,
                    height: 24,
                    [`& .${baseDropdownClasses.selection}`]: {
                      height: 24,
                    },
                    [`& .${baseDropdownClasses.header}`]: {
                      height: 24,
                    },
                  }),
                }}
              />
            </div>
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
                    <div>
                      <HvColorPicker
                        iconOnly
                        defaultValue={
                          (customTheme &&
                            customTheme.colors &&
                            customTheme.colors.modes[selectedMode] &&
                            customTheme.colors.modes?.[selectedMode][
                              c as keyof HvThemeTokens["colors"]
                            ]) ||
                          groupColors[c]
                        }
                        onChangeComplete={(color) =>
                          colorChangedHandler(c, color)
                        }
                        classes={{
                          root: css({ width: 24, height: 24 }),
                          headerColorIconOnly: css({ width: 24, height: 24 }),
                          dropdownRootIconOnly: css({
                            width: 24,
                            height: 24,
                            [`& .${baseDropdownClasses.selection}`]: {
                              height: 24,
                            },
                            [`& .${baseDropdownClasses.header}`]: {
                              height: 24,
                            },
                          }),
                        }}
                      />
                    </div>
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
