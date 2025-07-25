import { SyntheticEvent, useState } from "react";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import {
  HvButton,
  HvDropdown,
  HvInput,
  HvListValue,
  HvSnackbar,
} from "@hitachivantara/uikit-react-core";
import { Add } from "@hitachivantara/uikit-react-icons";

import { useGeneratorContext } from "./GeneratorContext";
import { extractFontsNames } from "./utils";

const FontFamily = () => {
  const { updateCustomTheme } = useGeneratorContext();

  const [fontName, setFontName] = useState("");
  const [fontValues, setFontValues] = useState<HvListValue[]>([
    { label: "Open Sans" },
  ]);

  const [fontAdded, setFontAdded] = useState(false);
  const [fontAddedMsg, setFontAddedMsg] = useState("");

  const onDropdownClickHandler = (font?: string) => {
    if (font) {
      updateCustomTheme({
        fontFamily: {
          body: font,
        },
      });
    }
  };

  const onAddHandler = () => {
    if (fontName.includes("http")) {
      const names = extractFontsNames(fontName);

      names.forEach((name) => {
        setFontAddedMsg(`Fonts "${names.join(", ")}" added!`);
        setFontValues((prev) => [...prev, { label: name }]);

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = fontName;
        document.head.appendChild(link);
      });
    } else {
      setFontAddedMsg(`Fonts "${fontName}" added!`);
      setFontValues((prev) => [...prev, { label: fontName }]);
    }
    setFontName("");
    setFontAdded(true);
  };

  const handleClose = (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return;
    setFontAdded(false);
  };

  return (
    <div className="w-full flex flex-col pl-xs mb-md">
      <HvSnackbar
        open={fontAdded}
        variant="success"
        label={fontAddedMsg}
        onClose={handleClose}
        autoHideDuration={2000}
        offset={20}
      />
      <div className="flex flex-row items-end mb-xs">
        <div className="flex grow-1">
          <HvInput
            value={fontName}
            onChange={(event, value) => setFontName(value)}
            label="Font name or Google font link"
            classes={{ root: "w-full" }}
          />
        </div>
        <HvButton
          icon
          variant="secondaryGhost"
          onClick={onAddHandler}
          disabled={fontName === ""}
        >
          <Add />
        </HvButton>
      </div>
      <HvDropdown
        label="Font Family"
        values={fontValues}
        onChange={(item) =>
          onDropdownClickHandler(item?.label as string | undefined)
        }
      />
    </div>
  );
};

export default FontFamily;
