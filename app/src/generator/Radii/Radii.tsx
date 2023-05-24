import { css } from "@emotion/css";
import {
  createTheme,
  HvButton,
  HvInput,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { useContext, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";
import { styles } from "./Radii.styles";

const Radii = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useContext(GeneratorContext);
  const [currValues, setCurrValues] = useState<Map<string, string | number>>(
    new Map<string, string | number>()
  );

  const valueChangedHandler = (spacing: string, value) => {
    const map = new Map<string, string | number>(currValues);
    map.set(spacing, value);
    setCurrValues(map);
  };

  const setValueHandler = (radii: string) => {
    const radiiValue = currValues.get(radii) || 0;

    const newTheme = createTheme({
      ...customTheme,
      radii: {
        ...customTheme.radii,
        [radii]: radii === "base" ? radiiValue : radiiValue,
      },
    });
    updateCustomTheme(newTheme);
  };

  return (
    <div className={styles.root}>
      <HvTypography variant="title4">Radii</HvTypography>
      {activeTheme &&
        Object.keys(activeTheme.radii).map((r) => {
          return (
            <div key={r} className={styles.item}>
              <div className={styles.radii}>
                <HvTypography variant="label">{r}</HvTypography>
              </div>
              <div className={styles.value}>
                <HvInput
                  value={currValues?.get(r)?.toString() || customTheme.radii[r]}
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
