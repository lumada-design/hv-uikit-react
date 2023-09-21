import {
  HvListValue,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { HvThemeTokens } from "@hitachivantara/uikit-styles";
import { useRef, useState } from "react";
import { useGeneratorContext } from "generator/GeneratorContext";
import { UnitSlider } from "components/common";
import { extractFontSizeUnit } from "generator/utils";

type Radius = keyof HvThemeTokens["radii"];

const Radii = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useGeneratorContext();
  const [currValues, setCurrValues] = useState<Map<Radius, string | number>>(
    new Map<Radius, string | number>()
  );
  const currValuesRef = useRef(currValues);

  const valueChangedHandler = (radii: Radius, value: string) => {
    const map = new Map<Radius, string | number>(currValues);

    const storedValue =
      currValuesRef.current.get(radii) ||
      customTheme.radii[radii as keyof HvThemeTokens["radii"]];

    const unit = extractFontSizeUnit(storedValue.toString());

    map.set(radii, `${value}${unit}`);
    currValuesRef.current = map;
    setCurrValues(map);
  };

  const setValueHandler = (radii: Radius) => {
    const value = currValuesRef.current.get(radii);
    if (!value) return;

    const radiiValue = parseInt(value.toString(), 10) || 0;

    const storedValue =
      currValuesRef.current.get(radii) ||
      customTheme.radii[radii as keyof HvThemeTokens["radii"]];

    const unit = extractFontSizeUnit(storedValue.toString());

    updateCustomTheme({
      radii: {
        [radii]: `${radiiValue}${unit}`,
      },
    });
  };

  const onUnitChangedHandler = (selectedUnit: HvListValue, radii: Radius) => {
    const unit = selectedUnit.label;
    const value = parseInt(
      currValuesRef.current.get(radii)?.toString() ||
        customTheme.radii[radii as keyof HvThemeTokens["radii"]].toString(),
      10
    );

    const map = new Map<Radius, string | number>(currValues);
    map.set(radii, `${value}${unit}`);
    currValuesRef.current = map;
    setCurrValues(map);

    updateCustomTheme({
      radii: {
        [radii]: `${value}${unit}`,
      },
    });
  };

  return (
    <div className="flex flex-col w-full gap-xs mb-lg">
      <HvTypography variant="title4">Radii</HvTypography>
      {activeTheme &&
        Object.keys(activeTheme.radii).map((radius: string) => {
          const r = radius as Radius;
          const v = currValues?.get(r)?.toString() || customTheme.radii[r];
          const u = extractFontSizeUnit(v);
          return (
            <div key={r} className="flex justify-between gap-xs">
              <UnitSlider
                defaultSize={parseInt(v, 10)}
                unit={u || "px"}
                unitsToShow={["px", "%"]}
                onAfterChange={() => setValueHandler(r)}
                onChange={(val) => valueChangedHandler(r, val.toString())}
                onUnitChange={(val) => onUnitChangedHandler(val, r)}
                scaleProps={{ minMax: [0, 50], markDigits: 0 }}
                label={r}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Radii;
