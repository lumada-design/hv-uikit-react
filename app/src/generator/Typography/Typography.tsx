import {
  HvAccordion,
  HvBox,
  HvTypography,
  HvDropdown,
  HvListValue,
  useTheme,
  theme,
} from "@hitachivantara/uikit-react-core";
import { extractFontSizeUnit, getVarValue } from "generator/utils";
import { useContext, useEffect, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";
import debounce from "lodash/debounce";
import { css } from "@emotion/css";
import { FontSize } from "components/common";
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

  const [updatedSizes, setUpdatedSizes] = useState<
    Map<string, { value: number; unit: string }>
  >(new Map<string, { value: number; unit: string }>());

  useEffect(() => {
    const map = new Map<string, { value: number; unit: string }>();
    if (customTheme) {
      typographyToShow.forEach((t) => {
        if (customTheme.typography[t].fontSize) {
          let val;

          if (customTheme.typography[t].fontSize.includes("var")) {
            val = getVarValue(customTheme.typography[t].fontSize, rootId);
          } else {
            val = customTheme.typography[t].fontSize;
          }

          if (val)
            map.set(t, {
              value: parseFloat(val),
              unit: extractFontSizeUnit(val),
            });
        }
      });
      setUpdatedSizes(map);
    }
  }, [customTheme, rootId]);

  const sizeChangedHandler = (typographyName: string, value) => {
    const map = new Map<string, { value: number; unit: string }>(updatedSizes);
    map.set(typographyName, {
      value,
      unit: updatedSizes.get(typographyName)?.unit || "px",
    });
    setUpdatedSizes(map);
  };

  const setSizeHandler = (value: number, typographyName: string) => {
    const unit = updatedSizes.get(typographyName)?.unit || "px";
    const fixedValue = value.toFixed(unit === "em" || unit === "rem" ? 1 : 0);
    updateCustomTheme({
      ...customTheme,
      ...customTheme,
      typography: {
        ...customTheme.typography,
        [typographyName]: {
          ...customTheme.typography[typographyName],
          fontSize: `${fixedValue}${unit}`,
        },
      },
    });
  };

  const unitChangedHandler = (item: HvListValue, typographyName: string) => {
    const map = new Map<string, { value: number; unit: string }>(updatedSizes);

    const t = updatedSizes.get(typographyName);
    const unit = (item as HvListValue).label?.toString() || "px";

    let fontSize = 0;
    if (t) {
      fontSize = t.value;
      if ((unit === "em" || unit === "rem") && t.value > 10) {
        fontSize = 10;
      }
    }

    map.set(typographyName, { value: fontSize, unit });
    setUpdatedSizes(map);

    updateCustomTheme({
      ...customTheme,
      ...customTheme,
      typography: {
        ...customTheme.typography,
        [typographyName]: {
          ...customTheme.typography[typographyName],
          fontSize: `${fontSize}${unit}`,
        },
      },
    });
  };

  const getLineHeights = (typographyName: string) => {
    const lineHeights: HvListValue[] = [];

    if (customTheme) {
      Object.keys(customTheme.lineHeights).forEach((h) => {
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
      Object.keys(customTheme.fontWeights).forEach((w) => {
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
    updateCustomTheme({
      ...customTheme,
      typography: {
        ...customTheme.typography,
        [typographyName]: {
          ...customTheme.typography[typographyName],
          lineHeight: customTheme?.lineHeights[lineHeight],
        },
      },
    });

    const map = new Map<string, string>(updatedHeights);
    map.set(typographyName, lineHeight);
    setUpdatedHeights(map);
  };

  const fontWeightChangedHandler = (typographyName, fontWeight) => {
    updateCustomTheme({
      ...customTheme,
      typography: {
        ...customTheme.typography,
        [typographyName]: {
          ...customTheme.typography[typographyName],
          fontWeight: customTheme?.fontWeights[fontWeight],
        },
      },
    });

    const map = new Map<string, string>(updatedWeights);
    map.set(typographyName, fontWeight);
    setUpdatedWeights(map);
  };

  const colorChangedHandler = (typographyName, colorValue) => {
    updateCustomTheme({
      ...customTheme,
      typography: {
        ...customTheme.typography,
        [typographyName]: {
          ...customTheme.typography[typographyName],
          color: colorValue,
        },
      },
    });
  };

  const debouncedColorChangedHandler = debounce(colorChangedHandler, 250);

  return (
    <div className={styles.root}>
      {typographyToShow.map((t) => {
        const typography = customTheme?.typography[t];
        const color =
          (customTheme.typography[t].color.includes("#")
            ? customTheme.typography[t].color
            : getVarValue(customTheme.typography[t].color)) ||
          getVarValue(typography.color);

        const fontSize = updatedSizes.get(t)?.value;
        const fontUnit = updatedSizes.get(t)?.unit || "px";

        return (
          <HvAccordion
            key={t}
            label={t}
            className={styles.label}
            classes={{ label: css({ ...theme.typography[t], height: "auto" }) }}
          >
            <HvBox
              css={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: theme.space.md,
                paddingLeft: 40,
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
                    debouncedColorChangedHandler(t, e.target.value);
                  }}
                />
              </HvBox>
              <FontSize
                fontSize={fontSize}
                fontUnit={fontUnit}
                onChange={(val) => sizeChangedHandler(t, val)}
                onAfterChange={(val) => setSizeHandler(val, t)}
                onUnitChange={(val) => unitChangedHandler(val, t)}
              />
              <HvBox
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: theme.space.sm,
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
