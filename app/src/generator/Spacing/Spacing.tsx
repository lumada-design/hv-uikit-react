import { styles } from "./Spacing.styles";
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

const Spacing = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useContext(GeneratorContext);
  const [currValues, setCurrValues] = useState<Map<string, string | number>>(
    new Map<string, string | number>()
  );

  const valueChangedHandler = (spacing: string, value) => {
    let map = new Map<string, string | number>(currValues);
    map.set(spacing, value);
    setCurrValues(map);
  };

  const setValueHandler = (spacing: string) => {
    const spacingValue =
      spacing === "base"
        ? parseInt(currValues.get(spacing)?.toString() || "")
        : currValues.get(spacing) || 0;

    const newTheme = createTheme({
      ...customTheme,
      space: {
        ...customTheme.space,
        [spacing]:
          spacing === "base" ? parseInt(spacingValue.toString()) : spacingValue,
      },
    });
    updateCustomTheme(newTheme);
  };

  return (
    <div className={styles.root}>
      <HvTypography variant="title4">Spacing</HvTypography>
      {activeTheme &&
        Object.keys(activeTheme.space).map((s) => {
          return (
            <div key={s} className={styles.item}>
              <div className={styles.spacing}>
                <HvTypography variant="label">{s}</HvTypography>
              </div>
              <div className={styles.value}>
                <HvInput
                  value={currValues?.get(s)?.toString() || customTheme.space[s]}
                  classes={{ root: css({ width: "100%" }) }}
                  onChange={(event, value) => valueChangedHandler(s, value)}
                />
              </div>
              <div>
                <HvButton
                  variant="secondarySubtle"
                  onClick={() => setValueHandler(s)}
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

export default Spacing;
