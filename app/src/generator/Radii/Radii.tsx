import { styles } from "./Radii.styles";
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

const Radii = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme, updateChangedValues } =
    useContext(GeneratorContext);
  const [currValues, setCurrValues] = useState<Map<string, string | number>>(
    new Map<string, string | number>()
  );

  useEffect(() => {
    let map = new Map<string, string | number>();
    if (activeTheme) {
      Object.keys(activeTheme.radii).map((s) => {
        map.set(s, activeTheme.radii[s]);
      });
    }
    setCurrValues(map);
  }, []);

  const valueChangedHandler = (spacing: string, value) => {
    let map = new Map<string, string | number>(currValues);
    map.set(spacing, value);
    setCurrValues(map);
  };

  const setValueHandler = (radii: string) => {
    let currRadii = {};
    for (const [key, val] of currValues.entries()) {
      currRadii[key] = val;
    }
    const radiiValue = currValues.get(radii) || 0;

    const newTheme = createTheme({
      ...customTheme,
      radii: {
        ...currRadii,
        [radii]: radii === "base" ? radiiValue : radiiValue,
      },
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.(["radii", radii], radiiValue);
  };

  return (
    <div className={styles.root}>
      {activeTheme &&
        Object.keys(activeTheme.radii).map((r) => {
          return (
            <div key={r} className={styles.item}>
              <div className={styles.radii}>
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

export default Radii;
