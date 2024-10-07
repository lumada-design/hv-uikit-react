import { useMemo, useState } from "react";
import {
  HvDropdown,
  HvListValue,
  useTheme,
} from "@hitachivantara/uikit-react-core";

import { ScaleProps, UnitSlider } from "~/components/common/UnitSlider";
import { useGeneratorContext } from "~/generator/GeneratorContext";
import { extractFontSizeUnit } from "~/generator/utils";

const FontSizes = () => {
  const { activeTheme } = useTheme();
  const { updateCustomTheme } = useGeneratorContext();
  const [fontSize, setFontSize] = useState(""); // base, sm, ...
  const [fontValue, setFontValue] = useState<number>(); // 14, 16, ...
  const [unit, setUnit] = useState("px"); // px, rem, ...
  const [currSizes, setCurrSizes] = useState<Map<string, string>>(
    new Map<string, string>(),
  );
  const [scale, setScale] = useState<ScaleProps>({
    minMax: [0, 100],
    markDigits: 0,
  });

  const fontSizes = useMemo(() => {
    if (!activeTheme) return [];

    return Object.keys(activeTheme.fontSizes).map((size) => ({
      label: size,
    }));
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
    <div className="w-full flex flex-col pl-xs">
      <div className="mb-sm">
        <HvDropdown
          label="Font Sizes"
          classes={{ root: "w-[120px]" }}
          values={fontSizes}
          onChange={(item) => onSizeChangedHandler(item?.label)}
        />
      </div>
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
    </div>
  );
};

export default FontSizes;
