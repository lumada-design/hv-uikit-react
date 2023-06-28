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
import { styles } from "./Spacing.styles";

const Spacing = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme } = useContext(GeneratorContext);
  const [currValues, setCurrValues] = useState<Map<string, string | number>>(
    new Map<string, string | number>()
  );

  const valueChangedHandler = (spacing: string, value: string) => {
    const map = new Map<string, string | number>(currValues);
    map.set(spacing, value);
    setCurrValues(map);
  };

  const setValueHandler = (spacing: string) => {
    const spacingValue =
      spacing === "base"
        ? parseInt(currValues.get(spacing)?.toString() || "", 10)
        : currValues.get(spacing) || 0;

    updateCustomTheme({
      space: {
        [spacing]:
          spacing === "base"
            ? parseInt(spacingValue.toString(), 10)
            : spacingValue,
      },
    });
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
                  value={
                    currValues?.get(s)?.toString() ||
                    customTheme.space[
                      s as keyof HvThemeTokens["space"]
                    ].toString()
                  }
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
