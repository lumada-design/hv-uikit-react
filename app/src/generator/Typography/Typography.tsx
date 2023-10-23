import { useEffect, useState } from "react";
import {
  HvAccordion,
  HvBox,
  HvTypography,
  HvDropdown,
  HvListValue,
  useTheme,
  theme,
  getVarValue,
} from "@hitachivantara/uikit-react-core";
import { HvThemeTokens, HvThemeTypography } from "@hitachivantara/uikit-styles";

import debounce from "lodash/debounce";

import { css } from "@emotion/css";

import { extractFontSizeUnit } from "~/generator/utils";
import { useGeneratorContext } from "~/generator/GeneratorContext";
import { ScaleProps, UnitSlider } from "~/components/common/UnitSlider";

import { styles } from "./Typography.styles";

const typographyToShow: (keyof HvThemeTypography["typography"])[] = [
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
  const { customTheme, updateCustomTheme } = useGeneratorContext();
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
  const [scale, setScale] = useState<ScaleProps>({
    minMax: [0, 100],
    markDigits: 0,
  });

  useEffect(() => {
    const map = new Map<string, { value: number; unit: string }>();
    if (customTheme) {
      typographyToShow.forEach((t) => {
        if (customTheme.typography[t].fontSize) {
          let val;

          if (
            typeof customTheme.typography[t].fontSize === "string" &&
            (customTheme.typography[t].fontSize as string).includes("var")
          ) {
            val = getVarValue(
              customTheme.typography[t].fontSize as string,
              rootId
            );
          } else {
            val = customTheme.typography[t].fontSize;
          }

          if (val)
            map.set(t, {
              value: typeof val === "number" ? val : parseFloat(val),
              unit: extractFontSizeUnit(val.toString()) || "",
            });
        }
      });
      setUpdatedSizes(map);
    }
  }, [customTheme, rootId]);

  const sizeChangedHandler = (typographyName: string, value: number) => {
    const map = new Map<string, { value: number; unit: string }>(updatedSizes);
    map.set(typographyName, {
      value,
      unit: updatedSizes.get(typographyName)?.unit || "px",
    });
    setUpdatedSizes(map);
  };

  const setSizeHandler = (
    value: number,
    typographyName: keyof HvThemeTypography["typography"]
  ) => {
    const unit = updatedSizes.get(typographyName)?.unit || "px";
    const fixedValue = value.toFixed(unit === "em" || unit === "rem" ? 1 : 0);
    updateCustomTheme({
      typography: {
        [typographyName]: {
          fontSize: `${fixedValue}${unit}`,
        },
      },
    });
  };

  const unitChangedHandler = (
    item: HvListValue,
    typographyName: keyof HvThemeTypography["typography"]
  ) => {
    const map = new Map<string, { value: number; unit: string }>(updatedSizes);

    const t = updatedSizes.get(typographyName);
    const unit = (item as HvListValue).label?.toString() || "px";

    let fontSize = 0;
    if (t) {
      fontSize = t.value;
      if (unit === "em" || unit === "rem") {
        if (fontSize > 5) {
          fontSize = 5;
        }
        setScale({
          minMax: [0, 5],
          markDigits: 1,
        });
      } else {
        setScale({
          minMax: [0, 100],
          markDigits: 0,
        });
      }
    }

    map.set(typographyName, { value: fontSize, unit });
    setUpdatedSizes(map);

    updateCustomTheme({
      typography: {
        [typographyName]: {
          fontSize: `${fontSize}${unit}`,
        },
      },
    });
  };

  const getLineHeights = (
    typographyName: keyof HvThemeTypography["typography"]
  ) => {
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
            ?.toString()
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

  const getFontWeights = (
    typographyName: keyof HvThemeTypography["typography"]
  ) => {
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
            ?.toString()
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

  const lineHeightChangedHandler = (
    typographyName: keyof HvThemeTypography["typography"],
    lineHeight: keyof HvThemeTokens["lineHeights"]
  ) => {
    updateCustomTheme({
      typography: {
        [typographyName]: {
          lineHeight: customTheme?.lineHeights[lineHeight],
        },
      },
    });

    const map = new Map<string, string>(updatedHeights);
    map.set(typographyName, lineHeight);
    setUpdatedHeights(map);
  };

  const fontWeightChangedHandler = (
    typographyName: keyof HvThemeTypography["typography"],
    fontWeight: keyof HvThemeTokens["fontWeights"]
  ) => {
    updateCustomTheme({
      typography: {
        [typographyName]: {
          fontWeight: customTheme?.fontWeights[fontWeight],
        },
      },
    });

    const map = new Map<string, string>(updatedWeights);
    map.set(typographyName, fontWeight);
    setUpdatedWeights(map);
  };

  const colorChangedHandler = (
    typographyName: keyof HvThemeTypography["typography"],
    colorValue: string
  ) => {
    updateCustomTheme({
      typography: {
        [typographyName]: {
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
          (customTheme.typography[t].color?.includes("#")
            ? customTheme.typography[t].color
            : getVarValue(customTheme.typography[t].color || "")) ||
          getVarValue(typography.color || "");

        const fontSize = updatedSizes.get(t)?.value;
        const fontUnit = updatedSizes.get(t)?.unit || "px";

        return (
          <HvAccordion
            key={t}
            label={t}
            className={styles.label}
            classes={{
              label: css({
                ...theme.typography[t],
                height: "auto",
              }),
            }}
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
              <UnitSlider
                defaultSize={fontSize}
                unit={fontUnit}
                onChange={(val) => sizeChangedHandler(t, val)}
                onAfterChange={(val) => setSizeHandler(val, t)}
                onUnitChange={(val) => unitChangedHandler(val, t)}
                label="Font Size"
                scaleProps={scale}
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
                    lineHeightChangedHandler(
                      t,
                      (item as HvListValue)
                        ?.label as keyof HvThemeTokens["lineHeights"]
                    )
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
