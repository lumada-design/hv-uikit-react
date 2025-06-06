import { useState } from "react";
import {
  HvButton,
  HvInput,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { HvThemeTokens } from "@hitachivantara/uikit-styles";

import { useGeneratorContext } from "./GeneratorContext";

const Zindices = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useGeneratorContext();
  const [currValues, setCurrValues] = useState<Map<string, number>>(
    new Map<string, number>(),
  );

  const valueChangedHandler = (zIndex: string, value: string) => {
    const map = new Map<string, number>(currValues);
    map.set(zIndex, Number(value));
    setCurrValues(map);
  };

  const setValueHandler = (zIndex: string) => {
    const zIndexValue = currValues.get(zIndex) || 0;

    updateCustomTheme({
      zIndices: {
        [zIndex]: zIndexValue,
      },
    });
  };

  return (
    <div className="flex flex-col w-full gap-xs mb-lg">
      <HvTypography variant="title4">zIndices</HvTypography>
      {activeTheme &&
        Object.keys(activeTheme.zIndices).map((r) => {
          return (
            <div key={r} className="flex justify-between gap-xs">
              <div className="w-[60px]">
                <HvTypography variant="label">{r}</HvTypography>
              </div>
              <div className="w-[140px]">
                <HvInput
                  value={
                    currValues?.get(r)?.toString() ||
                    customTheme.zIndices[
                      r as keyof HvThemeTokens["zIndices"]
                    ].toString()
                  }
                  classes={{ root: "w-full" }}
                  onChange={(event, value) => valueChangedHandler(r, value)}
                />
              </div>
              <div>
                <HvButton
                  variant="secondarySubtle"
                  onClick={() => setValueHandler(r)}
                >
                  Set
                </HvButton>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Zindices;
