"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  HvButton,
  HvColorPicker,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { useGeneratorContext } from "../GeneratorContext";

export const ColorsConfig = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [localColorValues, setlocalColorValues] = useState<
    Record<string, string>
  >({});

  const { customTheme, updateCustomTheme, colorMode } = useGeneratorContext();

  const handleSave = useCallback(() => {
    updateCustomTheme({
      colors: {
        modes: {
          [colorMode]: {
            ...localColorValues,
          },
        },
      },
    });
    setOpen(false);
  }, [
    localColorValues,
    // customTheme.colors,
    updateCustomTheme,
    setOpen,
    colorMode,
  ]);

  return (
    <HvDialog
      open={open}
      onClose={() => setOpen((p) => !p)}
      maxWidth="xs"
      fullWidth
    >
      <HvDialogTitle>Radius Settings</HvDialogTitle>
      <HvDialogContent>
        <div className="gap-[var(--uikit-space-xxs)]">
          {colorTokens.map((c) => (
            <div
              key={c}
              className="flex items-center justify-between p-[var(--uikit-space-xs)] border-b border-border"
            >
              <HvTypography>{c}</HvTypography>
              <HvColorPicker
                value={
                  localColorValues[c] || customTheme.colors.modes[colorMode][c]
                }
                onChangeComplete={(value) => {
                  setlocalColorValues((prev) => ({
                    ...prev,
                    [c]: value,
                  }));
                }}
              />
            </div>
          ))}
        </div>
      </HvDialogContent>
      <HvDialogActions>
        <HvButton variant="secondarySubtle" onClick={() => setOpen(false)}>
          Cancel
        </HvButton>
        <HvButton onClick={handleSave}>Save</HvButton>
      </HvDialogActions>
    </HvDialog>
  );
};

const colorTokens = [
  "primary",
  "primaryDeep",
  "primaryStrong",
  "primarySubtle",
  "primaryDimmed",
  "positive",
  "positiveDeep",
  "positiveStrong",
  "positiveDimmed",
  "positiveSubtle",
  "positiveBorder",
  "warning",
  "warningDeep",
  "warningStrong",
  "warningDimmed",
  "warningSubtle",
  "warningBorder",
  "negative",
  "negativeDeep",
  "negativeStrong",
  "negativeDimmed",
  "negativeSubtle",
  "negativeBorder",
  "info",
  "infoDeep",
  "infoStrong",
  "infoDimmed",
  "infoSubtle",
  "infoBorder",
  "accent",
  "accentDeep",
  "accentStrong",
  "accentSubtle",
  "accentDimmed",
  "accentBorder",
  "text",
  "textSubtle",
  "textDisabled",
  "textDimmed",
  "textLight",
  "textDark",
  "border",
  "borderSubtle",
  "borderStrong",
  "borderDisabled",
  "bgPage",
  "bgContainer",
  "bgPageSecondary",
  "bgContainerSecondary",
  "bgDisabled",
];
