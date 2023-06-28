import {
  HvBaseTheme,
  HvBox,
  HvDropdown,
  HvListValue,
  HvLoading,
  HvSnackbar,
  HvSnackbarProps,
  HvTab,
  HvTabs,
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { lazy, Suspense, useContext, useState } from "react";
import { GeneratorContext } from "generator/GeneratorContext";
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
  const { selectedTheme, selectedMode, colorModes, changeTheme, themes } =
    useTheme();

  const { customTheme, updateCustomTheme, open } = useContext(GeneratorContext);

  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState(0);

  const handleClose: HvSnackbarProps["onClose"] = (event, reason) => {
    if (reason === "clickaway") return;
    setCopied(false);
  };

  const handleThemeChange = (base: HvBaseTheme, mode: string) => {
    updateCustomTheme({ base, name: customTheme.name }, { isBaseChange: true });
    changeTheme(base, mode);
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
          <HvBox className={styles.themeBase}>
            <HvTypography variant="label">Base:</HvTypography>
            <HvDropdown
              values={themes.map((name) => ({
                value: name,
                label: name,
                selected: name === selectedTheme,
              }))}
              onChange={(base) => {
                handleThemeChange((base as HvListValue)?.value, selectedMode);
              }}
            />
            <HvTypography variant="label">Mode:</HvTypography>
            <HvDropdown
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
          <HvBox>
            <CodeEditor themeName={customTheme.name} setCopied={setCopied} />
          </HvBox>
          <HvBox>
            <HvTabs
              value={tab}
              onChange={(e, val) => setTab(val)}
              classes={{ flexContainer: styles.themeTools }}
              variant="scrollable"
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
          </HvBox>
          <HvBox
            css={{
              padding: theme.space.sm,
              paddingTop: 0,
              overflowY: "scroll",
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
        </div>
      )}
    </>
  );
};

export default Sidebar;
