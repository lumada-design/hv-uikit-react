import {
  createTheme,
  HvAccordion,
  HvBaseTheme,
  HvBox,
  HvButton,
  HvDropdown,
  HvInput,
  HvListValue,
  HvLoading,
  HvSnackbar,
  HvTooltip,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";
import { styles } from "./Sidebar.styles";
import debounce from "lodash/debounce";
import { Duplicate, Reset } from "@hitachivantara/uikit-react-icons";
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";

const Colors = lazy(() => import("generator/Colors"));
const FontSizes = lazy(() => import("generator/FontSizes"));
const FontFamily = lazy(() => import("generator/FontFamily"));
const Radii = lazy(() => import("generator/Radii"));
const Spacing = lazy(() => import("generator/Spacing"));
const Typography = lazy(() => import("generator/Typography"));
const Zindices = lazy(() => import("generator/Zindices"));
const Sizes = lazy(() => import("generator/Sizes"));

const Sidebar = () => {
  const { selectedTheme, selectedMode, colorModes, themes, changeTheme } =
    useTheme();

  const { updateCustomTheme, changedValues, updateChangedValues, open } =
    useContext(GeneratorContext);
  const [themeName, setThemeName] = useState("customTheme");
  const [fullCode, setFullCode] = useState("");
  const [copied, setCopied] = useState(false);

  const [colorsOpen, setColorsOpen] = useState(false);
  const [fontsOpen, setFontsOpen] = useState(false);
  const [typographyOpen, setTypographyOpen] = useState(false);
  const [layoutOpen, setLayoutOpen] = useState(false);

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
            <HvTypography variant="title2">Theme Creator</HvTypography>
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
                onChange={(t) =>
                  changeTheme((t as HvListValue)?.value, selectedMode)
                }
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
                onChange={(mode) =>
                  changeTheme(selectedTheme, (mode as HvListValue)?.value)
                }
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
            <HvCodeEditor
              options={{
                minimap: { enabled: false },
              }}
              language="typescript"
              value={fullCode}
              height={260}
              width="100%"
            />
          </HvBox>
          <HvBox css={{ display: "flex", justifyContent: "center" }}>
            <HvTypography variant="title3">Theme Tools</HvTypography>
          </HvBox>
          <HvBox
            css={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <Suspense
              fallback={
                <div>
                  <HvLoading label="Loading..." />
                </div>
              }
            >
              <HvAccordion
                id="colors"
                label="colors"
                expanded={colorsOpen}
                onChange={() => setColorsOpen((prev) => !prev)}
                classes={{ label: styles.label }}
              >
                {colorsOpen && <Colors />}
              </HvAccordion>
            </Suspense>
            <Suspense
              fallback={
                <div>
                  <HvLoading label="Loading..." />
                </div>
              }
            >
              <HvAccordion
                id="typography"
                label="typography"
                expanded={typographyOpen}
                onChange={() => setTypographyOpen((prev) => !prev)}
                classes={{ label: styles.label }}
              >
                {typographyOpen && <Typography />}
              </HvAccordion>
            </Suspense>
            <Suspense
              fallback={
                <div>
                  <HvLoading label="Loading..." />
                </div>
              }
            >
              <HvAccordion
                id="fonts"
                label="fonts"
                expanded={fontsOpen}
                onChange={() => setFontsOpen((prev) => !prev)}
                classes={{ label: styles.label }}
              >
                {fontsOpen && (
                  <>
                    <FontFamily />
                    <FontSizes />
                  </>
                )}
              </HvAccordion>
            </Suspense>
            <Suspense
              fallback={
                <div>
                  <HvLoading label="Loading..." />
                </div>
              }
            >
              <HvAccordion
                id="sizes"
                label="layout"
                expanded={layoutOpen}
                onChange={() => setLayoutOpen((prev) => !prev)}
                classes={{ label: styles.label }}
              >
                {layoutOpen && (
                  <>
                    <Sizes />
                    <Radii />
                    <Spacing />
                    <Zindices />
                  </>
                )}
              </HvAccordion>
            </Suspense>
          </HvBox>
        </div>
      )}
    </>
  );
};

export default Sidebar;
