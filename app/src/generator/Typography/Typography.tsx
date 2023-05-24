import {
  HvAccordion,
  HvBox,
  createTheme,
  HvTypography,
  HvInput,
  HvDropdown,
  HvListValue,
  HvButton,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { getVarValue } from "generator/utils";
import { useContext, useEffect, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";
import debounce from "lodash/debounce";
import { css } from "@emotion/css";
import { styles } from "./Typography.styles";

const typographyToShow = [
  "display",
  "title1",
  "title2",
  "title3",
  "title4",
  "body",
  "label",
  "caption1",
  "caption2",
];

const Typography = () => {
  const { customTheme, updateCustomTheme } = useContext(GeneratorContext);
  const { rootId } = useTheme();

  const [updatedHeights, setUpdatedHeights] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const [updatedWeights, setUpdatedWeights] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const [updatedSizes, setUpdatedSizes] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  useEffect(() => {
    const map = new Map<string, string>();
    if (customTheme) {
      typographyToShow.map((t) => {
        if (customTheme.typography[t].fontSize) {
          const val = getVarValue(customTheme.typography[t].fontSize, rootId);
          if (val) map.set(t, val);
        }
      });
      setUpdatedSizes(map);
    }
  }, [customTheme]);

  const sizeChangedHandler = (typographyName: string, value) => {
    const map = new Map<string, string>(updatedSizes);
    map.set(typographyName, value);
    setUpdatedSizes(map);
  };

  const setSizeHandler = (typographyName: string) => {
    const currSize = {};
    for (const [key, val] of updatedSizes.entries()) {
      currSize[key] = val;
    }
    const sizeValue = updatedSizes.get(typographyName) || 0;

    const newTheme = createTheme({
      ...customTheme,
      ...customTheme,
      typography: {
        ...customTheme.typography,
        [typographyName]: {
          ...customTheme.typography[typographyName],
          fontSize: sizeValue,
        },
      },
    });
    updateCustomTheme(newTheme);
  };

  const getLineHeights = (typographyName: string) => {
    const lineHeights: HvListValue[] = [];

    if (customTheme) {
      Object.keys(customTheme.lineHeights).map((h) => {
        let selected = false;
        const updatedHeight = updatedHeights.get(typographyName);
        if (updatedHeight && updatedHeight === h) {
          selected = true;
        } else {
          const parsedHeight = customTheme?.typography[
            typographyName
          ].lineHeight
            ?.replace("var(--uikit-lineHeights-", "")
            ?.replace(")", "");
          if (parsedHeight === h) {
            selected = true;
          }
        }

        lineHeights.push({
          label: h,
          value: h,
          selected,
        });
      });
    }

    return lineHeights;
  };

  const getFontWeights = (typographyName: string) => {
    const fontWeights: HvListValue[] = [];

    if (customTheme) {
      Object.keys(customTheme.fontWeights).map((w) => {
        let selected = false;
        const updatedWeight = updatedWeights.get(typographyName);
        if (updatedWeight && updatedWeight === w) {
          selected = true;
        } else {
          const parsedWeight = customTheme?.typography[
            typographyName
          ].fontWeight
            .toString()
            ?.replace("var(--uikit-fontWeights-", "")
            ?.replace(")", "");
          if (parsedWeight === w) {
            selected = true;
          }
        }

        fontWeights.push({
          label: w,
          value: w,
          selected,
        });
      });
    }

    return fontWeights;
  };

  const lineHeightChangedHandler = (typographyName, lineHeight) => {
    const newTheme = createTheme({
      ...customTheme,
      typography: {
        ...customTheme.typography,
        [typographyName]: {
          ...customTheme.typography[typographyName],
          lineHeight: getVarValue(customTheme?.lineHeights[lineHeight]),
        },
      },
    });
    updateCustomTheme(newTheme);

    const map = new Map<string, string>(updatedHeights);
    map.set(typographyName, lineHeight);
    setUpdatedHeights(map);
  };

  const fontWeightChangedHandler = (typographyName, fontWeight) => {
    const newTheme = createTheme({
      ...customTheme,
      typography: {
        ...customTheme.typography,
        [typographyName]: {
          ...customTheme.typography[typographyName],
          fontWeight: getVarValue(customTheme?.fontWeights[fontWeight]),
        },
      },
    });
    updateCustomTheme(newTheme);

    const map = new Map<string, string>(updatedWeights);
    map.set(typographyName, fontWeight);
    setUpdatedWeights(map);
  };

  const colorChangedHandler = (typographyName, colorValue) => {
    const newTheme = createTheme({
      ...customTheme,
      typography: {
        ...customTheme.typography,
        [typographyName]: {
          ...customTheme.typography[typographyName],
          color: colorValue,
        },
      },
    });
    updateCustomTheme(newTheme);
  };

  const debouncedHandler = debounce(colorChangedHandler, 250);

  return (
    <div className={styles.root}>
      {typographyToShow.map((t) => {
        const typography = customTheme?.typography[t];
        const color =
          (customTheme.typography[t].color.includes("#")
            ? customTheme.typography[t].color
            : getVarValue(customTheme.typography[t].color)) ||
          getVarValue(typography.color);
        return (
          <HvAccordion key={t} label={t} className={styles.label}>
            <HvBox
              css={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <HvBox
                css={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <HvBox
                  css={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <HvTypography variant="label">Color</HvTypography>
                  <input
                    key={t}
                    type="color"
                    className={styles.color}
                    value={color}
                    onChange={(e) => {
                      debouncedHandler(t, e.target.value);
                    }}
                  />
                </HvBox>
                <HvBox
                  css={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <HvBox
                    css={{ display: "flex", gap: 10, alignItems: "center" }}
                  >
                    <HvTypography variant="label">Size</HvTypography>
                    <HvInput
                      classes={{ root: css({ width: 100, marginRight: 5 }) }}
                      value={
                        updatedSizes?.get(t)?.toString() ||
                        getVarValue(customTheme.typography[t].fontSize)
                      }
                      onChange={(event, value) => sizeChangedHandler(t, value)}
                    />
                  </HvBox>
                  <HvButton
                    variant="secondarySubtle"
                    classes={{ root: css({ minWidth: 50 }) }}
                    onClick={() => setSizeHandler(t)}
                  >
                    Set
                  </HvButton>
                </HvBox>
              </HvBox>

              <HvBox
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <HvDropdown
                  label="Line height"
                  values={getLineHeights(t)}
                  classes={{ root: css({ width: 130 }) }}
                  onChange={(item) =>
                    lineHeightChangedHandler(t, (item as HvListValue)?.label)
                  }
                />
                <HvDropdown
                  label="Font weight"
                  values={getFontWeights(t)}
                  classes={{ root: css({ width: 130 }) }}
                  onChange={(item) =>
                    fontWeightChangedHandler(t, (item as HvListValue)?.value)
                  }
                />
              </HvBox>
            </HvBox>
          </HvAccordion>
        );
      })}
    </div>
  );
};

export default Typography;
