import {
  createTheme,
  HvBaseTheme,
  HvBox,
  HvDropdown,
  HvInput,
  HvListValue,
  HvLoading,
  HvSnackbar,
  HvTab,
  HvTabs,
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";
import debounce from "lodash/debounce";
import CodeEditor from "generator/CodeEditor";
import {
  Bold,
  FontSize,
  PaintBucket,
  Template,
} from "@hitachivantara/uikit-react-icons";
import { css } from "@emotion/css";
import { styles } from "./Sidebar.styles";

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

  const { updateCustomTheme, open } = useContext(GeneratorContext);

  const [themeName, setThemeName] = useState("customTheme");
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState(0);

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
      {!open && <div className={styles.closed} />}
      {open && (
        <div className={styles.root}>
          <HvSnackbar
            open={copied}
            variant="success"
            label="Code copied to clipboard!"
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
          <HvBox
            css={{
              overflowY: "scroll",
            }}
          >
            <HvTabs
              value={tab}
              onChange={(e, val) => setTab(val)}
              classes={{ flexContainer: styles.themeTools }}
            >
              <HvTab
                icon={<PaintBucket />}
                iconPosition="top"
                label="Colors"
                classes={{ root: css({ fontSize: 12 }) }}
              />
              <HvTab
                icon={<FontSize />}
                iconPosition="top"
                label="Typography"
                classes={{ root: css({ fontSize: 12 }) }}
              />
              <HvTab
                icon={<Bold />}
                iconPosition="top"
                label="Fonts"
                classes={{ root: css({ fontSize: 12 }) }}
              />
              <HvTab
                icon={<Template />}
                iconPosition="top"
                label="Layout"
                classes={{ root: css({ fontSize: 12 }) }}
              />
            </HvTabs>
            <HvBox
              css={{
                padding: theme.space.sm,
                paddingTop: theme.space.md,
              }}
            >
              <Suspense
                fallback={
                  <div>
                    <HvLoading label="Loading..." />
                  </div>
                }
              >
                {tab === 0 && <Colors />}
                {tab === 1 && <Typography />}
                {tab === 2 && (
                  <>
                    <FontFamily />
                    <FontSizes />
                  </>
                )}
                {tab === 3 && (
                  <>
                    <Sizes />
                    <Radii />
                    <Spacing />
                    <Zindices />
                  </>
                )}
              </Suspense>
            </HvBox>
          </HvBox>
        </div>
      )}
    </>
  );
};

export default Sidebar;
