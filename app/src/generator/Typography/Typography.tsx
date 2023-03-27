import {
  HvAccordion,
  HvBox,
  createTheme,
  HvTypography,
  HvInput,
  HvDropdown,
  HvListValue,
  HvButton,
} from "@hitachivantara/uikit-react-core";
import { styles } from "./Typography.styles";
import { getVarValue } from "generator/utils";
import { useContext, useEffect, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";
import debounce from "lodash/debounce";
import { css } from "@emotion/css";

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
  const { customTheme, updateCustomTheme, updateChangedValues } =
    useContext(GeneratorContext);
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
    let map = new Map<string, string>();
    if (customTheme) {
      typographyToShow.map((t) => {
        map.set(t, getVarValue(customTheme.typography[t].fontSize));
      });
      setUpdatedSizes(map);
    }
  }, [customTheme]);

  const valueChangedHandler = (typographyName: string, value) => {
    let map = new Map<string, string>(updatedSizes);
    map.set(typographyName, value);
    setUpdatedSizes(map);
  };

  const setValueHandler = (typographyName: string) => {
    let currSize = {};
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
    updateChangedValues?.(
      ["typography", typographyName, "fontSize"],
      sizeValue
    );
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
          selected: selected,
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
          selected: selected,
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
    updateChangedValues?.(
      ["typography", typographyName, "lineHeight"],
      getVarValue(customTheme?.lineHeights[lineHeight])
    );

    let map = new Map<string, string>(updatedHeights);
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
    updateChangedValues?.(
      ["typography", typographyName, "fontWeight"],
      getVarValue(customTheme?.fontWeights[fontWeight])
    );

    let map = new Map<string, string>(updatedWeights);
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
    updateChangedValues?.(["typography", typographyName, "color"], colorValue);
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
                paddingLeft: 30,
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
                      value={updatedSizes?.get(t)?.toString() || ""}
                      onChange={(event, value) => valueChangedHandler(t, value)}
                    />
                  </HvBox>
                  <HvButton
                    variant="secondarySubtle"
                    classes={{ root: css({ minWidth: 50 }) }}
                    onClick={() => setValueHandler(t)}
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
                  onChange={(item) => lineHeightChangedHandler(t, item.value)}
                />
                <HvDropdown
                  label="Font weight"
                  values={getFontWeights(t)}
                  classes={{ root: css({ width: 130 }) }}
                  onChange={(item) => fontWeightChangedHandler(t, item.value)}
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
