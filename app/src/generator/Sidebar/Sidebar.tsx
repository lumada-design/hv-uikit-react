import {
  createTheme,
  HvAccordion,
  HvBaseTheme,
  HvBox,
  HvDropdown,
  HvInput,
  HvListValue,
  HvLoading,
  HvSnackbar,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";
import { styles } from "./Sidebar.styles";
import debounce from "lodash/debounce";
import CodeEditor from "generator/CodeEditor";

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

  const { updateCustomTheme, open } = useContext(GeneratorContext);

  console.log(activeTheme);

  const [themeName, setThemeName] = useState("customTheme");
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
          <HvBox>
            <CodeEditor themeName={themeName} setCopied={setCopied} />
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
