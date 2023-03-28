import { styles } from "./Zindices.styles";
import { css } from "@emotion/css";
import {
  createTheme,
  HvButton,
  HvInput,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { useContext, useEffect, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";

const Zindices = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme, updateChangedValues } =
    useContext(GeneratorContext);
  const [currValues, setCurrValues] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  useEffect(() => {
    let map = new Map<string, number>();
    if (activeTheme) {
      Object.keys(activeTheme.zIndices).map((s) => {
        map.set(s, activeTheme.zIndices[s]);
      });
    }
    setCurrValues(map);
  }, []);

  const valueChangedHandler = (zIndex: string, value) => {
    let map = new Map<string, number>(currValues);
    map.set(zIndex, parseInt(value));
    setCurrValues(map);
  };

  const setValueHandler = (zIndex: string) => {
    let currzIndices = {};
    for (const [key, val] of currValues.entries()) {
      currzIndices[key] = val;
    }
    const zIndexValue = currValues.get(zIndex) || 0;

    const newTheme = createTheme({
      ...customTheme,
      zIndices: {
        ...currzIndices,
        [zIndex]: zIndexValue,
      },
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.(["zIndices", zIndex], zIndexValue);
  };

  return (
    <div className={styles.root}>
      {activeTheme &&
        Object.keys(activeTheme.zIndices).map((r) => {
          return (
            <div key={r} className={styles.item}>
              <div className={styles.zIndices}>
                <HvTypography variant="label">{r}</HvTypography>
              </div>
              <div className={styles.value}>
                <HvInput
                  value={currValues?.get(r)?.toString() || ""}
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
