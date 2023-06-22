import { css } from "@emotion/css";
import {
  HvButton,
  HvInput,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { HvThemeTokens } from "@hitachivantara/uikit-styles";
import { useContext, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";
import { styles } from "./Sizes.styles";

const Sizes = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useContext(GeneratorContext);
  const [currValues, setCurrValues] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  const valueChangedHandler = (size: string, value: string) => {
    const map = new Map<string, string>(currValues);
    map.set(size, value);
    setCurrValues(map);
  };

  const setValueHandler = (size: string) => {
    const sizeValue = currValues.get(size) || 0;

    updateCustomTheme({
      ...customTheme,
      sizes: {
        ...customTheme.sizes,
        [size]: sizeValue,
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
              <div className={styles.size}>
                <HvTypography variant="label">{r}</HvTypography>
              </div>
              <div className={styles.value}>
                <HvInput
                  value={
                    currValues?.get(r)?.toString() ||
                    customTheme.sizes[
                      r as keyof HvThemeTokens["sizes"]
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

export default Sizes;
