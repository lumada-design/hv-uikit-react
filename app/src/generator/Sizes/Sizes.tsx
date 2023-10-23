import { useRef, useState } from "react";
import { HvTypography, useTheme } from "@hitachivantara/uikit-react-core";
import { HvThemeTokens } from "@hitachivantara/uikit-styles";

import { useGeneratorContext } from "~/generator/GeneratorContext";
import { UnitSlider } from "~/components/common/UnitSlider";

import { styles } from "./Sizes.styles";

const Sizes = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useGeneratorContext();
  const [currValues, setCurrValues] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const currValuesRef = useRef<Map<string, string>>(currValues);

  const valueChangedHandler = (size: string, value: string) => {
    const map = new Map<string, string>(currValues);
    map.set(size, value);
    currValuesRef.current = map;
    setCurrValues(map);
  };

  const setValueHandler = (size: string) => {
    const sizeValue = currValuesRef.current.get(size) || 0;

    updateCustomTheme({
      sizes: {
        [size]: `${sizeValue}px`,
      },
    });
  };

  return (
    <div className={styles.root}>
      <HvTypography variant="title4">Sizes</HvTypography>
      {activeTheme &&
        Object.keys(activeTheme.sizes).map((r) => {
          return (
            <div key={r} className={styles.item}>
              <UnitSlider
                defaultSize={parseInt(
                  currValues?.get(r)?.toString() ||
                    customTheme.sizes[r as keyof HvThemeTokens["sizes"]],
                  10
                )}
                unit="px"
                hideUnits
                onAfterChange={() => setValueHandler(r)}
                onChange={(val) => valueChangedHandler(r, val.toString())}
                label={r}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Sizes;
