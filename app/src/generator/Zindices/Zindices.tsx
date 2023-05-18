import { styles } from "./Zindices.styles";
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

const Zindices = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useContext(GeneratorContext);
  const [currValues, setCurrValues] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  const valueChangedHandler = (zIndex: string, value) => {
    let map = new Map<string, number>(currValues);
    map.set(zIndex, parseInt(value));
    setCurrValues(map);
  };

  const setValueHandler = (zIndex: string) => {
    const zIndexValue = currValues.get(zIndex) || 0;

    const newTheme = createTheme({
      ...customTheme,
      zIndices: {
        ...customTheme.zIndices,
        [zIndex]: zIndexValue,
      },
    });
    updateCustomTheme(newTheme);
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
                    currValues?.get(r)?.toString() || customTheme.zIndices[r]
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
