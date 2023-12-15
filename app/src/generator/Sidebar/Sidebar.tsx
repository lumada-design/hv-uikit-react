import { lazy, Suspense, useState } from "react";
import {
  HvBaseTheme,
  HvDropdown,
  HvListValue,
  HvLoading,
  HvSnackbar,
  HvSnackbarProps,
  HvTab,
  HvTabs,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import {
  Bold,
  FontSize,
  PaintBucket,
  Template,
} from "@hitachivantara/uikit-react-icons";

import { useGeneratorContext } from "~/generator/GeneratorContext";
import CodeEditor from "~/generator/CodeEditor";

const Colors = lazy(() => import("~/generator/Colors"));
const FontSizes = lazy(() => import("~/generator/FontSizes"));
const FontFamily = lazy(() => import("~/generator/FontFamily"));
const Radii = lazy(() => import("~/generator/Radii"));
const Spacing = lazy(() => import("~/generator/Spacing"));
const Typography = lazy(() => import("~/generator/Typography"));
const Zindices = lazy(() => import("~/generator/Zindices"));
const Sizes = lazy(() => import("~/generator/Sizes"));

const Sidebar = () => {
  const { selectedTheme, selectedMode, colorModes, changeTheme, themes } =
    useTheme();

  const { customTheme, updateCustomTheme, open } = useGeneratorContext();

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
      {!open && <div className="hidden" />}
      {open && (
        <div
          className="flex flex-col gap-sm p-sm z-overlay h-screen fixed right-0 bg-atmo1 w-[390px] overflow-y-scroll"
          style={{ boxShadow: `-4px 0px 10px 1px rgba(125,125,125,0.12)` }}
        >
          <HvSnackbar
            open={copied}
            variant="success"
            label="Code copied to clipboard!"
            onClose={handleClose}
            autoHideDuration={2000}
            offset={20}
          />
          <div className="flex justify-center">
            <HvTypography variant="title2">Theme Creator</HvTypography>
          </div>
          <div className="flex items-center justify-between gap-sm">
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
          </div>
          <div>
            <CodeEditor themeName={customTheme.name} setCopied={setCopied} />
          </div>
          <div>
            <HvTabs
              value={tab}
              onChange={(e, val) => setTab(val)}
              classes={{ flexContainer: "justify-center" }}
              variant="scrollable"
            >
              <HvTab
                icon={<PaintBucket />}
                iconPosition="top"
                label="Colors"
                classes={{ root: "text-[12px]" }}
              />
              <HvTab
                icon={<FontSize />}
                iconPosition="top"
                label="Typography"
                classes={{ root: "text-[12px]" }}
              />
              <HvTab
                icon={<Bold />}
                iconPosition="top"
                label="Fonts"
                classes={{ root: "text-[12px]" }}
              />
              <HvTab
                icon={<Template />}
                iconPosition="top"
                label="Layout"
                classes={{ root: "text-[12px]" }}
              />
            </HvTabs>
          </div>
          <div className="p-sm pt-0 overflow-y-scroll">
            <Suspense fallback={<HvLoading label="Loading..." />}>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
