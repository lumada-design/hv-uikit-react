import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useDebounceCallback } from "usehooks-ts";
import {
  HvAccordion,
  HvDropdown,
  HvListValue,
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { HvThemeTokens, HvThemeTypography } from "@hitachivantara/uikit-styles";

import { ScaleProps, UnitSlider } from "../components/common/UnitSlider";
import { useGeneratorContext } from "./GeneratorContext";
import { extractFontSizeUnit } from "./utils";

export const getVarValue = (cssVar: string, rootElementId?: string) => {
  const root = document.getElementById(rootElementId || "hv-root");
  if (!root) return undefined;

  return getComputedStyle(root)
    .getPropertyValue(cssVar.replace("var(", "").replace(")", ""))
    .trim();
};

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
    new Map<string, string>(),
  );
  const [updatedWeights, setUpdatedWeights] = useState<Map<string, string>>(
    new Map<string, string>(),
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
              rootId,
            );
          } else {
            val = customTheme.typography[t].fontSize;
          }

          if (val)
            map.set(t, {
              value: typeof val === "number" ? val : Number.parseFloat(val),
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
    typographyName: keyof HvThemeTypography["typography"],
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
    typographyName: keyof HvThemeTypography["typography"],
  ) => {
    const map = new Map<string, { value: number; unit: string }>(updatedSizes);

    const t = updatedSizes.get(typographyName);
    const unit = item.label?.toString() || "px";

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
    typographyName: keyof HvThemeTypography["typography"],
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
    typographyName: keyof HvThemeTypography["typography"],
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
    lineHeight: keyof HvThemeTokens["lineHeights"],
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
    fontWeight: keyof HvThemeTokens["fontWeights"],
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
    colorValue: string,
  ) => {
    updateCustomTheme({
      typography: {
        [typographyName]: {
          color: colorValue,
        },
      },
    });
  };

  const debouncedColorChangedHandler = useDebounceCallback(
    colorChangedHandler,
    250,
  );

  return (
    <div className="flex flex-col w-full">
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
            className={css({ ...theme.typography.label })}
            classes={{
              label: css({
                ...theme.typography[t],
                height: "auto",
              }),
            }}
          >
            <div className="flex flex-col gap-xs mb-md pl-[40px]">
              <div className="flex items-center">
                <HvTypography variant="label">Color</HvTypography>
                <input
                  key={t}
                  type="color"
                  className="w-[20px] h-[25px] p-0 ml-[5px] bg-transparent"
                  value={color}
                  onChange={(e) => {
                    debouncedColorChangedHandler(t, e.target.value);
                  }}
                />
              </div>
              <UnitSlider
                defaultSize={fontSize}
                unit={fontUnit}
                onChange={(val) => sizeChangedHandler(t, val)}
                onAfterChange={(val) => setSizeHandler(val, t)}
                onUnitChange={(val) => unitChangedHandler(val, t)}
                label="Font Size"
                scaleProps={scale}
              />
              <div className="flex items-center justify-between mt-sm">
                <HvDropdown
                  label="Line height"
                  values={getLineHeights(t)}
                  classes={{ root: "w-[130px]" }}
                  onChange={(item) =>
                    lineHeightChangedHandler(
                      t,
                      item?.label as keyof HvThemeTokens["lineHeights"],
                    )
                  }
                />
                <HvDropdown
                  label="Font weight"
                  values={getFontWeights(t)}
                  classes={{ root: "w-[130px]" }}
                  onChange={(item) => fontWeightChangedHandler(t, item?.value)}
                />
              </div>
            </div>
          </HvAccordion>
        );
      })}
    </div>
  );
};

export default Typography;
