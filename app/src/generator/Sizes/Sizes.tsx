import { styles } from "./Sizes.styles";
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

const Sizes = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useContext(GeneratorContext);
  const [currValues, setCurrValues] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  const valueChangedHandler = (size: string, value) => {
    let map = new Map<string, string>(currValues);
    map.set(size, value);
    setCurrValues(map);
  };

  const setValueHandler = (size: string) => {
    const sizeValue = currValues.get(size) || 0;

    const newTheme = createTheme({
      ...customTheme,
      sizes: {
        ...customTheme.sizes,
        [size]: sizeValue,
      },
    });
    updateCustomTheme(newTheme);
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
                  value={currValues?.get(r)?.toString() || customTheme.sizes[r]}
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
