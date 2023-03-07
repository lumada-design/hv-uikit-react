import { useContext, useState } from "react";
import {
  createTheme,
  HvBox,
  HvButton,
  HvDropdown,
  HvInput,
  HvListValue,
  HvSnackbar,
} from "@hitachivantara/uikit-react-core";
import { GeneratorContext } from "generator/GeneratorContext";
import { styles } from "./FontFamily.styles";
import { Add } from "@hitachivantara/uikit-react-icons";
import { css } from "@emotion/css";
import { extractFontName } from "generator/utils";

const FontFamily = () => {
  const { customTheme, updateCustomTheme, updateChangedValues } =
    useContext(GeneratorContext);

  const [fontName, setFontName] = useState("");
  const [fontValues, setFontValues] = useState<HvListValue[]>([
    { label: "Open Sans" },
  ]);

  const [fontAdded, setFontAdded] = useState(false);
  const [fontAddedMsg, setFontAddedMsg] = useState("");

  const onDropdownClickHandler = (font) => {
    const newTheme = createTheme({
      ...customTheme,
      fontFamily: {
        body: font,
      },
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.(["fontFamily", "body"], font);
  };

  const onAddHandler = () => {
    const name = extractFontName(fontName);
    setFontAdded(true);
    setFontAddedMsg(`Font "${name}" added!`);

    setFontName("");
    setFontValues((prev) => [...prev, { label: name }]);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontName;
    document.head.appendChild(link);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setFontAdded(false);
  };

  return (
    <div className={styles.root}>
      <HvSnackbar
        open={fontAdded}
        variant={"success"}
        label={fontAddedMsg}
        onClose={handleClose}
        autoHideDuration={2000}
        offset={20}
      />
      <HvBox
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          marginBottom: 10,
        }}
      >
        <HvBox css={{ display: "flex", flexGrow: 1 }}>
          <HvInput
            value={fontName}
            onChange={(event, value) => setFontName(value)}
            label="Enter google font link"
            classes={{ root: css({ width: "100%" }) }}
          />
        </HvBox>
        <HvButton
          icon
          variant="secondaryGhost"
          onClick={onAddHandler}
          disabled={fontName === ""}
        >
          <Add />
        </HvButton>
      </HvBox>
      <HvDropdown
        label="Font Family"
        values={fontValues}
        onChange={(item) => onDropdownClickHandler(item.label)}
      />
    </div>
  );
};

export default FontFamily;
