import { useContext, useEffect, useState } from "react";
import {
  theme,
  useTheme,
  createTheme,
  HvBox,
  HvDropdown,
  HvListValue,
} from "@hitachivantara/uikit-react-core";
import { GeneratorContext } from "generator/GeneratorContext";
import { css } from "@emotion/css";
import { FontSize } from "components/common";
import { extractFontSizeUnit } from "generator/utils";
import { styles } from "./FontSizes.styles";

const FontSizes = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useContext(GeneratorContext);
  const [fontSizes, setFontSizes] = useState<HvListValue[]>([]);
  const [fontSize, setFontSize] = useState(""); // base, sm, ...
  const [fontValue, setFontValue] = useState<number>(); // 14, 16, ...
  const [unit, setUnit] = useState("px"); // px, rem, ...
  const [currSizes, setCurrSizes] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  useEffect(() => {
    const sizes: HvListValue[] = [];
    if (activeTheme) {
      Object.keys(activeTheme.fontSizes).map((size) => {
        sizes.push({ label: size });
      });
    }
    setFontSizes(sizes);
  }, []);

  const onSizeChangedHandler = (size: string) => {
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
      setUnit(u);
    }
  };
  const onValueChangeHandler = (value) => {
    setFontValue(value);
  };

  const onValueSetHandler = (value) => {
    // check updated font sizes
    const currFontSizes = {};
    for (const [key, val] of currSizes.entries()) {
      currFontSizes[key] = val;
    }

    const fixedValue = value.toFixed(unit === "em" || unit === "rem" ? 1 : 0);

    const newTheme = createTheme({
      ...customTheme,
      fontSizes: {
        ...currFontSizes,
        [fontSize]: `${fixedValue}${unit}`,
      },
    });
    updateCustomTheme(newTheme);

    // update curr sizes
    const map = new Map<string, string>(currSizes);
    map.set(fontSize, `${fixedValue}${unit}`);
    setCurrSizes(map);
  };

  const onUnitChangedHandler = (selectedUnit: HvListValue) => {
    const parsedUnit = selectedUnit.label as string;

    setUnit(parsedUnit);

    if (
      (parsedUnit === "em" || parsedUnit === "rem") &&
      fontValue &&
      fontValue > 10
    ) {
      setFontValue(10);
    }

    const newTheme = createTheme({
      ...customTheme,
      fontSizes: {
        ...customTheme.fontSizes,
        [fontSize]: `${fontValue}${parsedUnit}`,
      },
    });
    updateCustomTheme(newTheme);
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
          onChange={(item) => onSizeChangedHandler(item?.label)}
        />
      </HvBox>
      <FontSize
        disabled={fontSize === ""}
        fontSize={fontValue}
        fontUnit={unit}
        onAfterChange={(val) => onValueSetHandler(val)}
        onChange={(val) => onValueChangeHandler(val)}
        onUnitChange={(val) => onUnitChangedHandler(val)}
      />
    </HvBox>
  );
};

export default FontSizes;
