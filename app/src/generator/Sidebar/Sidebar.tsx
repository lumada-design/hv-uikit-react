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
import {
  Download,
  Duplicate,
  Reset,
  Undo,
  Redo,
} from "@hitachivantara/uikit-react-icons";
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";
import { downloadTheme, themeDiff } from "generator/utils";

const Colors = lazy(() => import("generator/Colors"));
const FontSizes = lazy(() => import("generator/FontSizes"));
const FontFamily = lazy(() => import("generator/FontFamily"));
const Radii = lazy(() => import("generator/Radii"));
const Spacing = lazy(() => import("generator/Spacing"));
const Typography = lazy(() => import("generator/Typography"));
const Zindices = lazy(() => import("generator/Zindices"));
const Sizes = lazy(() => import("generator/Sizes"));

const Sidebar = () => {
  const {
    activeTheme,
    selectedTheme,
    selectedMode,
    colorModes,
    themes,
    changeTheme,
  } = useTheme();

  const { customTheme, updateCustomTheme, open, undo, redo, canUndo, canRedo } =
    useContext(GeneratorContext);
  const [themeName, setThemeName] = useState("customTheme");
  const [fullCode, setFullCode] = useState("");
  const [copied, setCopied] = useState(false);

  const [colorsOpen, setColorsOpen] = useState(false);
  const [fontsOpen, setFontsOpen] = useState(false);
  const [typographyOpen, setTypographyOpen] = useState(false);
  const [layoutOpen, setLayoutOpen] = useState(false);

  useEffect(() => {
    const newTheme = createTheme({
      name: "customTheme",
      base: selectedTheme as HvBaseTheme,
    });
    updateCustomTheme(newTheme);
  }, []);

  useEffect(() => {
    const temp: any = {};
    temp.name = themeName;
    temp.base = selectedTheme;
    const final = {
      ...temp,
      ...themeDiff(activeTheme as object, customTheme),
    };

    // the `replace` bit below is just a regex to remove the quotes from
    // the properties names, for displaying effect only.
    setFullCode(
      `import { createTheme } from "@hitachivantara/uikit-react-core";

const ${themeName} = createTheme(` +
        JSON.stringify(final, null, 2).replace(/\"([^(\")"]+)\":/g, "$1:") +
        `)
    
export default ${themeName};`
    );
  }, [customTheme]);

  const nameChangeHandler = (name) => {
    setThemeName(name);
  };

  useEffect(() => {
    const newTheme = createTheme({
      name: themeName,
      base: selectedTheme as HvBaseTheme,
    });
    updateCustomTheme(newTheme, false);
  }, [themeName, selectedTheme]);

  const debouncedNameChangeHandler = debounce(nameChangeHandler, 250);

  const onCopyHandler = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
  };

  const onDownloadHandler = () => {
    downloadTheme(`${themeName}.ts`, fullCode);
  };

  const onResetHandler = () => {
    const newTheme = createTheme({
      name: "customTheme",
      base: selectedTheme as HvBaseTheme,
    });
    updateCustomTheme(newTheme);
  };

  const onUndoHandler = () => {
    undo?.();
  };

  const onRedoHandler = () => {
    redo?.();
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
            <HvBox className={styles.codeEditorTools}>
              <HvBox css={{ display: "flex", alignItems: "center" }}>
                <HvTypography variant="label">{themeName}.ts</HvTypography>
                <HvTooltip title={<HvTypography>Download</HvTypography>}>
                  <HvButton
                    variant="secondaryGhost"
                    icon
                    onClick={onDownloadHandler}
                  >
                    <Download />
                  </HvButton>
                </HvTooltip>
              </HvBox>
              <HvBox css={{ display: "flex" }}>
                <HvBox>
                  {canUndo ? (
                    <HvTooltip title={<HvTypography>Undo</HvTypography>}>
                      <HvButton
                        variant="secondaryGhost"
                        icon
                        onClick={onUndoHandler}
                      >
                        <Undo />
                      </HvButton>
                    </HvTooltip>
                  ) : (
                    <HvButton variant="secondaryGhost" icon disabled={!canUndo}>
                      <Undo />
                    </HvButton>
                  )}
                </HvBox>
                <HvBox>
                  {canRedo ? (
                    <HvTooltip title={<HvTypography>Redo</HvTypography>}>
                      <HvButton
                        variant="secondaryGhost"
                        icon
                        onClick={onRedoHandler}
                      >
                        <Redo />
                      </HvButton>
                    </HvTooltip>
                  ) : (
                    <HvButton variant="secondaryGhost" icon disabled={!canRedo}>
                      <Redo />
                    </HvButton>
                  )}
                </HvBox>
                <HvBox>
                  <HvTooltip title={<HvTypography>Reset</HvTypography>}>
                    <HvButton
                      variant="secondaryGhost"
                      icon
                      onClick={onResetHandler}
                      disabled={!canUndo && !canRedo}
                    >
                      <Reset />
                    </HvButton>
                  </HvTooltip>
                </HvBox>
                <HvBox>
                  <HvTooltip
                    title={<HvTypography>Copy to Clipboard</HvTypography>}
                  >
                    <HvButton
                      variant="secondaryGhost"
                      icon
                      onClick={onCopyHandler}
                    >
                      <Duplicate />
                    </HvButton>
                  </HvTooltip>
                </HvBox>
              </HvBox>
            </HvBox>
            <HvCodeEditor
              options={{
                minimap: { enabled: false },
                readOnly: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0,
              }}
              language="typescript"
              value={fullCode}
              height={260}
              width="100%"
              className={styles.codeEditor}
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
