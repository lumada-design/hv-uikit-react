import { HvTypography, useTheme } from "@hitachivantara/uikit-react-core";
import { HvThemeTokens } from "@hitachivantara/uikit-styles";
import { useRef, useState } from "react";
import { useGeneratorContext } from "generator/GeneratorContext";
import { UnitSlider } from "components/common";

const Spacing = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useGeneratorContext();
  const [currValues, setCurrValues] = useState<Map<string, string | number>>(
    new Map<string, string | number>()
  );
  const currValuesRef = useRef<Map<string, string | number>>(currValues);

  const valueChangedHandler = (spacing: string, value: string) => {
    const map = new Map<string, string | number>(currValues);
    map.set(spacing, value);
    currValuesRef.current = map;
    setCurrValues(map);
  };

  const setValueHandler = (spacing: string) => {
    const value = currValuesRef.current.get(spacing);
    if (!value) return;

    const spacingValue = parseInt(
      spacing === "base"
        ? value.toString() || ""
        : currValues.get(spacing)?.toString() || "",
      10
    );

    updateCustomTheme({
      space: {
        [spacing]: `${spacingValue}px`,
      },
    });
  };

  return (
    <div className="flex flex-col w-full gap-xs mb-lg">
      <HvTypography variant="title4">Spacing</HvTypography>
      {activeTheme &&
        Object.keys(activeTheme.space).map((s) => {
          return (
            <div key={s} className="flex justify-between gap-xs">
              <UnitSlider
                defaultSize={parseInt(
                  currValues?.get(s)?.toString() ||
                    customTheme.space[
                      s as keyof HvThemeTokens["space"]
                    ].toString(),
                  10
                )}
                unit="px"
                hideUnits
                onAfterChange={() => setValueHandler(s)}
                onChange={(val) => valueChangedHandler(s, val.toString())}
                scaleProps={{ minMax: [0, 80] }}
                label={s}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Spacing;
