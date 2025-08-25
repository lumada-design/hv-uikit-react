"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvInput,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { useGeneratorContext } from "../GeneratorContext";

const spacingTokens = ["base", "xxs", "xs", "sm", "md", "lg", "xl"];

export const SpacingConfig = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [localSpacingValues, setLocalSpacingValues] = useState<
    Record<string, string>
  >({});

  const { customTheme, updateCustomTheme } = useGeneratorContext();

  const handleSave = useCallback(() => {
    updateCustomTheme({
      space: {
        ...localSpacingValues,
      },
    });
    setOpen(false);
  }, [localSpacingValues, updateCustomTheme, setOpen]);

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
          {spacingTokens.map((r) => (
            <div
              key={r}
              className="flex items-center justify-between p-[var(--uikit-space-xs)] border-b border-border"
            >
              <HvTypography>{r}</HvTypography>
              <HvInput
                className="w-140px"
                value={
                  localSpacingValues[r] ||
                  customTheme.space?.[r as keyof typeof customTheme.space] ||
                  ""
                }
                onChange={(event, value) => {
                  setLocalSpacingValues((prev) => ({
                    ...prev,
                    [r]: value,
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
