import { useContext, useEffect, useState } from "react";
import {
  useTheme,
  HvInput,
  createTheme,
  HvTypography,
  HvDropdown,
  HvBox,
  HvListValue,
} from "@hitachivantara/uikit-react-core";
import { GeneratorContext } from "generator/GeneratorContext";
import { styles } from "./FontSizes.styles";
import { css } from "@emotion/css";

const FontSizes = () => {
  const { activeTheme } = useTheme();
  const { customTheme, updateCustomTheme, updateChangedValues } =
    useContext(GeneratorContext);
  const [fontSizes, setFontSizes] = useState<HvListValue[]>([]);
  const [fontSize, setFontSize] = useState(""); // base, sm, ...
  const [fontValue, setFontValue] = useState<number>(0); // 14, 16, ...
  const [unit, setUnit] = useState("px"); // px, rem, ...
  const [currSizes, setCurrSizes] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  useEffect(() => {
    let sizes: HvListValue[] = [];
    if (activeTheme) {
      Object.keys(activeTheme.fontSizes).map((size) => {
        sizes.push({ label: size });
      });
    }
    setFontSizes(sizes);
  }, []);

  const onSizeChangedHandler = (size: string) => {
    const currSize = currSizes.get(size);
    setFontSize(size);
    if (currSize) {
      const value = parseInt(currSize);
      setUnit(currSize.replace(value.toString(), ""));
      setFontValue(value);
    } else {
      setUnit("px");
      setFontValue(parseInt(activeTheme?.fontSizes[size]));
    }
  };

  const onValueChangedHandler = (event, value) => {
    setFontValue(value);

    // check updated font sizes
    let currFontSizes = {};
    for (const [key, val] of currSizes.entries()) {
      currFontSizes[key] = val;
    }

    const newTheme = createTheme({
      ...customTheme,
      fontSizes: {
        ...currFontSizes,
        [fontSize]: `${value}${unit}`,
      },
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.(["fontSizes", fontSize], `${value}${unit}`);

    // update curr sizes
    let map = new Map<string, string>(currSizes);
    map.set(fontSize, `${value}${unit}`);
    setCurrSizes(map);
  };

  const onUnitChangedHandler = (selectedUnit) => {
    setUnit(selectedUnit);
    const newTheme = createTheme({
      ...customTheme,
      fontSizes: {
        [fontSize]: `${fontValue}${selectedUnit}`,
      },
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.(
      ["fontSizes", fontSize],
      `${fontValue}${selectedUnit}`
    );
    // update curr sizes
    let map = new Map<string, string>(currSizes);
    map.set(fontSize, `${fontValue}${selectedUnit}`);
    setCurrSizes(map);
  };

  return (
    <div className={styles.root}>
      <HvTypography variant="label">Font Sizes</HvTypography>
      <HvBox
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <HvDropdown
          classes={{ root: css({ width: 120 }) }}
          values={fontSizes}
          onChange={(item) => onSizeChangedHandler(item.label)}
        />
        <HvDropdown
          classes={{ root: css({ width: 120 }) }}
          values={[
            { label: "px", selected: unit === "px" },
            {
              label: "rem",
              selected: unit === "rem",
            },
            { label: "em", selected: unit === "em" },
            { label: "pt", selected: unit === "pt" },
          ]}
          onChange={(item) => onUnitChangedHandler(item.label)}
        />
        <HvInput
          value={fontValue?.toString()}
          classes={{ root: css({ width: 80 }) }}
          onChange={onValueChangedHandler}
        />
      </HvBox>
    </div>
  );
};

export default FontSizes;
