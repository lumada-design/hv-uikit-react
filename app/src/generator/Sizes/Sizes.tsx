import { styles } from "./Sizes.styles";
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

const Sizes = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme, updateChangedValues } =
    useContext(GeneratorContext);
  const [currValues, setCurrValues] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  useEffect(() => {
    let map = new Map<string, string>();
    if (activeTheme) {
      Object.keys(activeTheme.sizes).map((s) => {
        map.set(s, activeTheme.sizes[s]);
      });
    }
    setCurrValues(map);
  }, []);

  const valueChangedHandler = (size: string, value) => {
    let map = new Map<string, string>(currValues);
    map.set(size, value);
    setCurrValues(map);
  };

  const setValueHandler = (size: string) => {
    let currSize = {};
    for (const [key, val] of currValues.entries()) {
      currSize[key] = val;
    }
    const sizeValue = currValues.get(size) || 0;

    const newTheme = createTheme({
      ...customTheme,
      sizes: {
        ...currSize,
        [size]: sizeValue,
      },
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.(["sizes", size], sizeValue);
  };

  return (
    <div className={styles.root}>
      <HvTypography variant="title4">Sizes</HvTypography>
      {activeTheme &&
        Object.keys(activeTheme.sizes).map((r) => {
          return (
            <div key={r} className={styles.item}>
              <div className={styles.size}>
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

export default Sizes;
