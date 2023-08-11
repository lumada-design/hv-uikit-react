import { useEffect, useState } from "react";
import {
  theme,
  useTheme,
  HvBox,
  HvDropdown,
  HvListValue,
} from "@hitachivantara/uikit-react-core";
import { useGeneratorContext } from "generator/GeneratorContext";
import { css } from "@emotion/css";
import { ScaleProps, UnitSlider } from "components/common";
import { extractFontSizeUnit } from "generator/utils";
import { styles } from "./FontSizes.styles";

const FontSizes = () => {
  const { activeTheme } = useTheme();
  const { updateCustomTheme } = useGeneratorContext();
  const [fontSizes, setFontSizes] = useState<HvListValue[]>([]);
  const [fontSize, setFontSize] = useState(""); // base, sm, ...
  const [fontValue, setFontValue] = useState<number>(); // 14, 16, ...
  const [unit, setUnit] = useState("px"); // px, rem, ...
  const [currSizes, setCurrSizes] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const [scale, setScale] = useState<ScaleProps>({
    minMax: [0, 100],
    markDigits: 0,
  });

  useEffect(() => {
    const sizes: HvListValue[] = [];
    if (activeTheme) {
      Object.keys(activeTheme.fontSizes).forEach((size) => {
        sizes.push({ label: size });
      });
    }
    setFontSizes(sizes);
  }, [activeTheme]);

  const onSizeChangedHandler = (size?: string) => {
    if (size) {
      const currSize = currSizes.get(size);
      setFontSize(size);
      if (currSize) {
        const value = parseFloat(currSize);
        setUnit(currSize.replace(value.toString(), ""));
        setFontValue(value);
      } else {
        const f = activeTheme?.fontSizes[size];
        const u = extractFontSizeUnit(f);
        setFontValue(parseFloat(f));
        setUnit(u || "");
      }
    }
  };

  const onValueChangeHandler = (value: number) => {
    setFontValue(value);
  };

  const onValueSetHandler = (value: number) => {
    // check updated font sizes
    const fixedValue = value.toFixed(unit === "em" || unit === "rem" ? 1 : 0);

    updateCustomTheme({
      fontSizes: {
        [fontSize]: `${fixedValue}${unit}`,
      },
    });

    // update curr sizes
    const map = new Map<string, string>(currSizes);
    map.set(fontSize, `${fixedValue}${unit}`);
    setCurrSizes(map);
  };

  const onUnitChangedHandler = (selectedUnit: HvListValue) => {
    const parsedUnit = selectedUnit.label as string;

    setUnit(parsedUnit);

    if (parsedUnit === "em" || parsedUnit === "rem") {
      if (fontValue && fontValue > 5) {
        setFontValue(5);
      }
      setScale({
        minMax: [0, 5],
        markDigits: 1,
      });
    }

    updateCustomTheme({
      fontSizes: {
        [fontSize]: `${fontValue}${parsedUnit}`,
      },
    });
    // update curr sizes
    const map = new Map<string, string>(currSizes);
    map.set(fontSize, `${fontValue}${parsedUnit}`);
    setCurrSizes(map);
  };

  return (
    <HvBox className={styles.root}>
      <HvBox css={{ marginBottom: theme.space.sm }}>
        <HvDropdown
          label="Font Sizes"
          classes={{ root: css({ width: 120 }) }}
          values={fontSizes}
          onChange={(item) =>
            onSizeChangedHandler(
              (item as HvListValue)?.label as string | undefined
            )
          }
        />
      </HvBox>
      <UnitSlider
        disabled={fontSize === ""}
        defaultSize={fontValue}
        unit={unit}
        onAfterChange={(val) => onValueSetHandler(val)}
        onChange={(val) => onValueChangeHandler(val)}
        onUnitChange={(val) => onUnitChangedHandler(val)}
        scaleProps={scale}
        label="Font Size"
      />
    </HvBox>
  );
};

export default FontSizes;
