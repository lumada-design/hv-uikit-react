import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvInput,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { HvThemeTokens } from "@hitachivantara/uikit-styles";

import { useGeneratorContext } from "~/generator/GeneratorContext";

import { styles } from "./Zindices.styles";

const Zindices = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useGeneratorContext();
  const [currValues, setCurrValues] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  const valueChangedHandler = (zIndex: string, value: string) => {
    const map = new Map<string, number>(currValues);
    map.set(zIndex, parseInt(value, 10));
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
    <div className={styles.root}>
      <HvTypography variant="title4">zIndices</HvTypography>
      {activeTheme &&
        Object.keys(activeTheme.zIndices).map((r) => {
          return (
            <div key={r} className={styles.item}>
              <div className={styles.zIndices}>
                <HvTypography variant="label">{r}</HvTypography>
              </div>
              <div className={styles.value}>
                <HvInput
                  value={
                    currValues?.get(r)?.toString() ||
                    customTheme.zIndices[
                      r as keyof HvThemeTokens["zIndices"]
                    ].toString()
                  }
                  classes={{ root: css({ width: "100%" }) }}
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
