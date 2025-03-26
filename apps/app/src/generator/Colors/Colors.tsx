import { css } from "@emotion/css";
import {
  baseDropdownClasses,
  HvColorPicker,
  HvTooltip,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { HvColor } from "@hitachivantara/uikit-styles";

import { useGeneratorContext } from "~/generator/GeneratorContext";

import { styles } from "./Colors.styles";
import { getColorGroupName, getColors, groupsToShow } from "./utils";

const Colors = () => {
  const { colors, selectedMode } = useTheme();
  const { customTheme, updateCustomTheme } = useGeneratorContext();

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
                  customTheme?.colors?.modes?.[selectedMode]?.backgroundColor
                }
                onChangeComplete={(color) =>
                  colorChangedHandler("backgroundColor", color)
                }
                classes={{
                  root: "size-24px",
                  headerColorIconOnly: "size-24px",
                  dropdownRootIconOnly: css({
                    width: 24,
                    height: 24,
                    [`& .${baseDropdownClasses.selection}`]: {
                      height: 24,
                    },
                    [`& .${baseDropdownClasses.header}`]: {
                      height: 24,
                      border: "none",
                      backgroundColor: "transparent",
                      "& svg": {
                        border: `1px solid ${colors?.secondary}`,
                      },
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
                            c as HvColor
                          ] || groupColors[c]}
                        </HvTypography>
                      </div>
                    }
                  >
                    <div>
                      <HvColorPicker
                        iconOnly
                        defaultValue={
                          customTheme?.colors?.modes?.[selectedMode]?.[
                            c as HvColor
                          ] || groupColors[c]
                        }
                        onChangeComplete={(color) =>
                          colorChangedHandler(c, color)
                        }
                        classes={{
                          root: "size-24px",
                          headerColorIconOnly: "size-24px",
                          dropdownRootIconOnly: css({
                            width: 24,
                            height: 24,
                            [`& .${baseDropdownClasses.selection}`]: {
                              height: 24,
                            },
                            [`& .${baseDropdownClasses.header}`]: {
                              height: 24,
                              border: "none",
                              backgroundColor: "transparent",
                              "& svg": {
                                border: `1px solid ${colors?.secondary}`,
                              },
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
