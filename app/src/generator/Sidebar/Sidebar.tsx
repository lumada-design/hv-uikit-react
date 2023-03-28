import {
  createTheme,
  HvAccordion,
  HvBaseTheme,
  HvBox,
  HvButton,
  HvDropdown,
  HvInput,
  HvSnackbar,
  HvTooltip,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Colors } from "generator/Colors";
import { GeneratorContext } from "generator/GeneratorContext";
import { useContext, useEffect, useState } from "react";
import { styles } from "./Sidebar.styles";
import debounce from "lodash/debounce";
import { FontSizes } from "generator/FontSizes";
import { FontFamily } from "generator/FontFamily";
import { Duplicate, Reset } from "@hitachivantara/uikit-react-icons";
import { Radii } from "generator/Radii";
import { Spacing } from "generator/Spacing";
import { Typography } from "generator/Typography";
import { Zindices } from "generator/Zindices";

const Sidebar = () => {
  const { selectedTheme, selectedMode, colorModes, themes, changeTheme } =
    useTheme();

  const { updateCustomTheme, changedValues, updateChangedValues, open } =
    useContext(GeneratorContext);
  const [themeName, setThemeName] = useState("customTheme");
  const [fullCode, setFullCode] = useState("");
  const [copied, setCopied] = useState(false);

  // the `replace` bit below is just a regex to remove the quotes from
  // the properties names, for displaying effect only.
  useEffect(() => {
    setFullCode(
      `import { createTheme } from "@hitachivantara/uikit-react-core";

const ${themeName} = createTheme(` +
        JSON.stringify(changedValues, null, 2).replace(
          /\"([^(\")"]+)\":/g,
          "$1:"
        ) +
        `)
    
export default ${themeName};`
    );
  }, [changedValues]);

  useEffect(() => {
    updateChangedValues?.(["name"], themeName);
  }, [themeName]);

  useEffect(() => {
    const newTheme = createTheme({
      name: themeName,
      base: selectedTheme as HvBaseTheme,
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.(["base"], selectedTheme);
  }, [selectedTheme]);

  const nameChangeHandler = (name) => {
    const newTheme = createTheme({
      name: name,
      base: selectedTheme as HvBaseTheme,
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.(["name"], name);
    setThemeName(name);
  };

  const debouncedNameChangeHandler = debounce(nameChangeHandler, 250);

  const onCopyHandler = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
  };

  const onResetHandler = () => {
    const newTheme = createTheme({
      name: "customTheme",
      base: selectedTheme as HvBaseTheme,
    });
    updateCustomTheme(newTheme);
    updateChangedValues?.([], "", true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setCopied(false);
  };

  return (
    <>
      {!open && <div className={styles.closed}></div>}
      {open && (
        <div className={styles.root}>
          <HvSnackbar
            open={copied}
            variant={"success"}
            label={"Code copied to clipboard!"}
            onClose={handleClose}
            autoHideDuration={2000}
            offset={20}
          />
          <HvBox css={{ display: "flex", justifyContent: "center" }}>
            <HvTypography variant="title2">Theme Generator</HvTypography>
          </HvBox>
          <HvBox className={styles.themeName}>
            <HvTypography variant="label">Name: </HvTypography>
            <HvBox className={styles.themeNameInput}>
              <HvInput
                onChange={(event, value) => debouncedNameChangeHandler(value)}
                placeholder={themeName}
              />
            </HvBox>
          </HvBox>
          <HvBox className={styles.themeBase}>
            <HvBox>
              <HvTypography variant="label">Theme: </HvTypography>
              <HvDropdown
                css={{ width: 100 }}
                values={themes.map((name) => ({
                  value: name,
                  label: name,
                  selected: name === selectedTheme,
                }))}
                onChange={(t) => changeTheme(t.value, selectedMode)}
              />
            </HvBox>
            <HvBox>
              <HvTypography variant="label">Mode: </HvTypography>
              <HvDropdown
                css={{ width: 120 }}
                values={colorModes.map((name) => ({
                  value: name,
                  label: name,
                  selected: name === selectedMode,
                }))}
                onChange={(mode) => changeTheme(selectedTheme, mode.value)}
              />
            </HvBox>
          </HvBox>
          <HvBox css={{ position: "relative" }}>
            <HvBox css={{ position: "absolute", top: 10, right: 46 }}>
              <HvTooltip
                placement="bottom-end"
                title={<HvTypography>Reset</HvTypography>}
              >
                <HvButton
                  variant="secondarySubtle"
                  icon
                  onClick={onResetHandler}
                >
                  <Reset />
                </HvButton>
              </HvTooltip>
            </HvBox>
            <HvBox css={{ position: "absolute", top: 10, right: 10 }}>
              <HvTooltip
                placement="bottom-end"
                title={<HvTypography>Copy to Clipboard</HvTypography>}
              >
                <HvButton
                  variant="secondarySubtle"
                  icon
                  onClick={onCopyHandler}
                >
                  <Duplicate />
                </HvButton>
              </HvTooltip>
            </HvBox>
            <textarea
              readOnly
              className={styles.code}
              value={fullCode}
            ></textarea>
          </HvBox>
          <HvBox
            css={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <HvAccordion
              id="colors"
              label="colors"
              classes={{ label: styles.label }}
            >
              <Colors />
            </HvAccordion>
            <HvAccordion
              id="typography"
              label="typography"
              classes={{ label: styles.label }}
            >
              <Typography />
            </HvAccordion>
            <HvAccordion
              id="fonts"
              label="fonts"
              classes={{ label: styles.label }}
            >
              <FontFamily />
              <FontSizes />
            </HvAccordion>
            <HvAccordion
              id="radii"
              label="radii"
              classes={{ label: styles.label }}
            >
              <Radii />
            </HvAccordion>
            <HvAccordion
              id="spacing"
              label="spacing"
              classes={{ label: styles.label }}
            >
              <Spacing />
            </HvAccordion>
            <HvAccordion
              id="zindices"
              label="zindices"
              classes={{ label: styles.label }}
            >
              <Zindices />
            </HvAccordion>
          </HvBox>
        </div>
      )}
    </>
  );
};

export default Sidebar;
